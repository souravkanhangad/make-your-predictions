export default function AdSpace({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full bg-slate-100 border border-slate-200 border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 p-6 my-8 overflow-hidden relative ${className}`}>
      <span className="text-xs uppercase tracking-widest font-semibold mb-2 opacity-50">Advertisement</span>
      {/* Placeholder for actual Ad script (e.g., Google AdSense) */}
      <div className="w-full max-w-[728px] h-[90px] bg-slate-200 rounded-lg flex items-center justify-center">
        <span className="text-sm font-medium">Your Ad Here (728x90)</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-2xl"></div>
    </div>
  );
}
