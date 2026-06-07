"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import TeamSelect from "./TeamSelect";
import { Team } from "@/lib/teams";

export default function CreateContestForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [team1, setTeam1] = useState<Team | null>(null);
  const [team2, setTeam2] = useState<Team | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      prize: formData.get("prize"),
      team1: formData.get("team1"),
      team1Flag: formData.get("team1Flag"),
      team2: formData.get("team2"),
      team2Flag: formData.get("team2Flag"),
      deadline: formData.get("deadline"),
      winnerCount: Number(formData.get("winners")),
    };

    try {
      const res = await fetch("/api/contests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      
      if (res.ok && result.contestId) {
        router.push(`/contest/${result.contestId}/share`);
      } else {
        alert(result.error || "Failed to create contest");
        setLoading(false);
      }
    } catch (err) {
      alert("An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-2">Contest Title</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          required 
          placeholder="e.g. Champions League Final"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder:text-slate-400"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
        <textarea 
          id="description" 
          name="description" 
          required 
          rows={3}
          placeholder="Predict the final score of the biggest game of the year!"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none placeholder:text-slate-400"
        />
      </div>

      <div>
        <label htmlFor="prize" className="block text-sm font-semibold text-slate-900 mb-2">Prize Description</label>
        <input 
          type="text" 
          id="prize" 
          name="prize" 
          required 
          placeholder="e.g. ₹5000 Cash Prize or No Prize"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamSelect
          label="Team A"
          name="team1"
          selectedTeamId={team1?.id || null}
          disabledTeamId={team2?.id || null}
          onChange={setTeam1}
        />

        <TeamSelect
          label="Team B"
          name="team2"
          selectedTeamId={team2?.id || null}
          disabledTeamId={team1?.id || null}
          onChange={setTeam2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="deadline" className="block text-sm font-semibold text-slate-900 mb-2">Prediction Deadline</label>
          <input 
            type="datetime-local" 
            id="deadline" 
            name="deadline" 
            required 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder:text-slate-400"
          />
        </div>

        <div>
          <label htmlFor="winners" className="block text-sm font-semibold text-slate-900 mb-2">Number of Winners</label>
          <input 
            type="number" 
            id="winners" 
            name="winners" 
            min="1" 
            max="100" 
            defaultValue="1"
            required 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="pt-4">
        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex justify-center items-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Contest...</>
          ) : (
            <>Create Contest <ArrowRight className="w-5 h-5 ml-2" /></>
          )}
        </button>
      </div>
    </form>
  );
}
