"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Award } from "lucide-react";

export default function EnterResultForm({ contest }: { contest: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      finalScore1: Number(formData.get("score1")),
      finalScore2: Number(formData.get("score2")),
    };

    try {
      const res = await fetch(`/api/contests/${contest.id}/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push(`/contest/${contest.id}/winners`);
      } else {
        const result = await res.json();
        alert(result.error || "Failed to process results");
        setLoading(false);
      }
    } catch (err) {
      alert("An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-6 mb-10">
        <div className="flex flex-col items-center flex-1">
          <span className="text-4xl mb-3">{contest.team1Flag}</span>
          <span className="font-bold text-slate-900 text-lg mb-4 text-center">{contest.team1}</span>
          <input 
            type="number" 
            name="score1"
            required 
            min="0"
            max="99"
            className="w-24 h-28 text-center text-5xl font-black rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
          />
        </div>
        
        <div className="text-3xl font-black text-slate-300">-</div>
        
        <div className="flex flex-col items-center flex-1">
          <span className="text-4xl mb-3">{contest.team2Flag}</span>
          <span className="font-bold text-slate-900 text-lg mb-4 text-center">{contest.team2}</span>
          <input 
            type="number" 
            name="score2"
            required 
            min="0"
            max="99"
            className="w-24 h-28 text-center text-5xl font-black rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex justify-center items-center px-8 py-4 text-lg font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Calculating Winners...</>
        ) : (
          <><Award className="w-6 h-6 mr-2" /> Submit Final Score</>
        )}
      </button>
    </form>
  );
}
