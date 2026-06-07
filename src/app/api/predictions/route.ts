import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { predictions } from "@/db/schema";
import { z } from "zod";

const createPredictionSchema = z.object({
  contestId: z.string(),
  participantName: z.string().min(2),
  participantEmail: z.string().email(),
  participantPhone: z.string().min(5),
  predictedScore1: z.coerce.number().int().min(0),
  predictedScore2: z.coerce.number().int().min(0),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = createPredictionSchema.parse(body);

    const db = getDb();
    
    await db.insert(predictions).values({
      id: crypto.randomUUID(),
      contestId: validatedData.contestId,
      participantName: validatedData.participantName,
      participantEmail: validatedData.participantEmail,
      participantPhone: validatedData.participantPhone,
      predictedScore1: validatedData.predictedScore1,
      predictedScore2: validatedData.predictedScore2,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.issues }, { status: 400 });
    }
    console.error("Failed to submit prediction", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
