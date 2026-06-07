import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { contests, predictions, winners } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { calculateWinners } from "@/lib/winnerEngine";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { finalScore1, finalScore2 } = body;

    if (finalScore1 === undefined || finalScore2 === undefined) {
      return NextResponse.json({ error: "Missing scores" }, { status: 400 });
    }

    const db = getDb();
    
    // 1. Verify contest exists and belongs to user
    const contestResult = await db.select().from(contests).where(eq(contests.id, id));
    if (contestResult.length === 0 || contestResult[0].userId !== session.user.id) {
      return NextResponse.json({ error: "Contest not found or unauthorized" }, { status: 404 });
    }

    const contest = contestResult[0];
    if (contest.status !== "open") {
      return NextResponse.json({ error: "Contest already completed" }, { status: 400 });
    }

    // 2. Fetch all predictions for this contest
    const contestPredictions = await db.select().from(predictions).where(eq(predictions.contestId, id));

    // 3. Calculate winners using the engine
    const selectedWinners = calculateWinners(contestPredictions, finalScore1, finalScore2, contest.winnerCount);

    // 4. Save winners and update contest status
    // Using a transaction-like approach or sequential updates
    await db.update(contests)
      .set({ 
        status: "completed", 
        finalScore1: finalScore1, 
        finalScore2: finalScore2 
      })
      .where(eq(contests.id, id));

    for (const w of selectedWinners) {
      await db.insert(winners).values({
        id: crypto.randomUUID(),
        contestId: id,
        predictionId: w.prediction.id,
        isExactMatch: w.isExactMatch,
        isRandomlySelected: w.isRandomlySelected,
        penaltyScore: w.penaltyScore,
      });
    }

    return NextResponse.json({ success: true, winnersCount: selectedWinners.length }, { status: 200 });
  } catch (error) {
    console.error("Failed to process results", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
