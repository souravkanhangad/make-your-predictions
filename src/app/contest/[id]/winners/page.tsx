import Navbar from "@/components/Navbar";
import { Award, CheckCircle2, ShieldCheck } from "lucide-react";
import AdSpace from "@/components/AdSpace";
import { notFound } from "next/navigation";

export default async function WinnersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Mock data for winners
  const contest = {
    id: id,
    title: "Champions League Final",
    team1: "Real Madrid",
    team2: "Dortmund",
    team1Flag: "🇪🇸",
    team2Flag: "🇩🇪",
    finalScore1: 2,
    finalScore2: 0,
    totalPredictions: 86,
    exactMatches: 5,
    winnerCount: 2,
  };

  const winners = [
    { id: 1, name: "Alex Johnson", prediction: "2 - 0", selectionMethod: "exact", randomDraw: true },
    { id: 2, name: "Sarah Williams", prediction: "2 - 0", selectionMethod: "exact", randomDraw: true },
  ];

  if (!contest) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 text-amber-600 mb-6">
            <Award className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Contest Winners</h1>
          <p className="text-xl text-slate-600">{contest.title}</p>
        </div>

        {/* Final Score Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8">
          <div className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Final Result</div>
          <div className="flex items-center justify-center gap-8">
            <div className="flex flex-col items-center flex-1">
              <span className="text-5xl mb-2">{contest.team1Flag}</span>
              <span className="font-bold text-slate-900 text-lg mb-1">{contest.team1}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-20 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-4xl font-black shadow-md">{contest.finalScore1}</div>
              <span className="text-2xl font-black text-slate-300">-</span>
              <div className="w-16 h-20 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-4xl font-black shadow-md">{contest.finalScore2}</div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-5xl mb-2">{contest.team2Flag}</span>
              <span className="font-bold text-slate-900 text-lg mb-1">{contest.team2}</span>
            </div>
          </div>
        </div>

        <AdSpace />

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
            <div className="text-3xl font-bold text-slate-900 mb-1">{contest.totalPredictions}</div>
            <div className="text-sm font-medium text-slate-500">Total Predictions</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
            <div className="text-3xl font-bold text-slate-900 mb-1">{contest.exactMatches}</div>
            <div className="text-sm font-medium text-slate-500">Exact Matches</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{contest.winnerCount}</div>
            <div className="text-sm font-medium text-slate-500">Prizes Awarded</div>
          </div>
        </div>

        {/* Winners List */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Official Winners</h2>
        <div className="space-y-4 mb-12">
          {winners.map((winner, index) => (
            <div key={winner.id} className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm flex items-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-400"></div>
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                #{index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">{winner.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    Predicted: {winner.prediction}
                  </span>
                  {winner.randomDraw && (
                    <span className="text-xs font-medium text-blue-600 flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-1" /> Randomly Selected
                    </span>
                  )}
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-green-50 text-green-600 rounded-full">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Notice */}
        <div className="bg-slate-100 p-6 rounded-2xl flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-slate-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Transparency Notice</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Winners were selected automatically by the Make Your Prediction platform. 
              {contest.exactMatches > contest.winnerCount 
                ? ` Because there were ${contest.exactMatches} exact matches for only ${contest.winnerCount} prizes, the winners were chosen via a cryptographically secure random draw among all exact matches.` 
                : " The winners were selected based on exact score matches."}
            </p>
          </div>
        </div>

        <AdSpace />
      </main>
    </div>
  );
}
