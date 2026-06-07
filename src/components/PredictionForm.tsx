"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PredictionForm({ contest }: { contest: any }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const phoneCode = formData.get("phoneCode") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    const data = {
      contestId: contest.id,
      participantName: formData.get("fullName"),
      participantEmail: formData.get("email"),
      participantPhone: `${phoneCode}${phoneNumber}`,
      predictedScore1: formData.get("score1"),
      predictedScore2: formData.get("score2"),
    };

    try {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const result = await res.json();
        alert(result.error || "Failed to submit prediction");
      }
    } catch (err) {
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Your prediction has been recorded!</h2>
        <p className="text-lg text-slate-600 mb-8">Good luck! We will notify you if you win.</p>
        <button className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors inline-flex items-center">
          Share Contest
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Make Your Prediction</h2>
      
      {/* Score Input */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex flex-col items-center flex-1">
          <span className="text-3xl mb-2">{contest.team1Flag}</span>
          <span className="font-semibold text-slate-700 text-sm mb-3 text-center line-clamp-1">{contest.team1}</span>
          <input 
            type="number" 
            name="score1"
            required 
            min="0"
            max="99"
            className="w-20 h-24 text-center text-4xl font-bold rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
          />
        </div>
        
        <div className="text-2xl font-black text-slate-300">-</div>
        
        <div className="flex flex-col items-center flex-1">
          <span className="text-3xl mb-2">{contest.team2Flag}</span>
          <span className="font-semibold text-slate-700 text-sm mb-3 text-center line-clamp-1">{contest.team2}</span>
          <input 
            type="number" 
            name="score2"
            required 
            min="0"
            max="99"
            className="w-20 h-24 text-center text-4xl font-bold rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-0 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Participant Info */}
      <div className="space-y-5 mb-8">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
          <input 
            type="text" 
            name="fullName"
            required 
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email"
            required 
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">Mobile Number</label>
          <div className="flex gap-3">
            <select name="phoneCode" className="px-3 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-blue-600 outline-none min-w-[90px]">
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+91">+91 (IN)</option>
              <option value="+971">+971 (UAE)</option>
            </select>
            <input 
              type="tel" 
              name="phoneNumber"
              required 
              placeholder="555-0123"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="flex items-start mb-8">
        <div className="flex items-center h-5">
          <input 
            id="terms" 
            type="checkbox" 
            required 
            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-medium text-slate-700">
            I agree to the <Link href="/terms" className="text-blue-600 hover:underline">contest terms</Link> and conditions.
          </label>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex justify-center items-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Submitting...</>
        ) : (
          "Submit Prediction"
        )}
      </button>
    </form>
  );
}
