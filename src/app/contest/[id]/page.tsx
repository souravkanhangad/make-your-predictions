import Navbar from "@/components/Navbar";
import PredictionForm from "@/components/PredictionForm";
import CountdownTimer from "@/components/CountdownTimer";
import AdSpace from "@/components/AdSpace";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { contests } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function PublicContestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const db = getDb();
  const contestResult = await db.select().from(contests).where(eq(contests.id, id));

  if (contestResult.length === 0) {
    notFound();
  }

  const contest = contestResult[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Contest Header Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="bg-slate-900 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1508344928928-747626ea5692?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-amber-500 text-amber-950 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Win {contest.prize}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{contest.title}</h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-lg">{contest.description}</p>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col items-center justify-center">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Matchup</div>
              <div className="flex items-center justify-center gap-6 md:gap-12 w-full max-w-2xl">
                <div className="flex flex-col items-center text-center flex-1">
                  <span className="text-6xl mb-4 filter drop-shadow-md">{contest.team1Flag}</span>
                  <h2 className="text-2xl font-bold text-slate-900">{contest.team1}</h2>
                </div>
                <div className="text-3xl font-black text-slate-300 italic">VS</div>
                <div className="flex flex-col items-center text-center flex-1">
                  <span className="text-6xl mb-4 filter drop-shadow-md">{contest.team2Flag}</span>
                  <h2 className="text-2xl font-bold text-slate-900">{contest.team2}</h2>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Time Remaining</div>
              <CountdownTimer deadline={contest.deadline.toISOString()} />
            </div>
          </div>
        </div>

        {/* Top Ad Space */}
        <AdSpace />

        {/* Prediction Form */}
        <div id="predict-form">
          <PredictionForm contest={contest} />
        </div>

        {/* Bottom Ad Space */}
        <AdSpace />
      </main>
    </div>
  );
}
