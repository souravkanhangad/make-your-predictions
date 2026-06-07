import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { contests } from "@/db/schema";
import { z } from "zod";

const createContestSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  prize: z.string().min(2),
  team1: z.string().min(2),
  team2: z.string().min(2),
  team1Flag: z.string().min(1),
  team2Flag: z.string().min(1),
  deadline: z.coerce.date(),
  winnerCount: z.coerce.number().int().min(1).max(100),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = createContestSchema.parse(body);

    const db = getDb();
    
    const newContestId = crypto.randomUUID();

    await db.insert(contests).values({
      id: newContestId,
      userId: session.user.id,
      title: validatedData.title,
      description: validatedData.description,
      prize: validatedData.prize,
      team1: validatedData.team1,
      team2: validatedData.team2,
      team1Flag: validatedData.team1Flag,
      team2Flag: validatedData.team2Flag,
      deadline: validatedData.deadline,
      winnerCount: validatedData.winnerCount,
      status: "open",
    });

    return NextResponse.json({ success: true, contestId: newContestId }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.issues }, { status: 400 });
    }
    console.error("Failed to create contest", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
