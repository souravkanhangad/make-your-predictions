"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { FIFA_TEAMS, Team } from "@/lib/teams";

type TeamSelectProps = {
  label: string;
  name: string;
  selectedTeamId: string | null;
  disabledTeamId: string | null;
  onChange: (team: Team | null) => void;
};

export default function TeamSelect({ label, name, selectedTeamId, disabledTeamId, onChange }: TeamSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedTeam = FIFA_TEAMS.find(t => t.id === selectedTeamId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTeams = FIFA_TEAMS.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col" ref={containerRef}>
      <label className="block text-sm font-semibold text-slate-900 mb-2">{label}</label>
      <input type="hidden" name={name} value={selectedTeam?.name || ""} required />
      <input type="hidden" name={`${name}Flag`} value={selectedTeam?.flag || ""} required />
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all outline-none bg-white text-left ${
            isOpen ? "border-blue-600 ring-2 ring-blue-100" : "border-slate-200"
          }`}
        >
          {selectedTeam ? (
            <span className="flex items-center text-slate-900 font-medium">
              <span className="mr-3 text-xl">{selectedTeam.flag}</span>
              {selectedTeam.name}
            </span>
          ) : (
            <span className="text-slate-400">Select a team...</span>
          )}
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2 border-b border-slate-100 bg-slate-50 sticky top-0">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                  autoFocus
                />
              </div>
            </div>
            
            <ul className="max-h-60 overflow-y-auto p-1">
              {filteredTeams.length === 0 ? (
                <li className="px-4 py-3 text-sm text-slate-500 text-center">No teams found.</li>
              ) : (
                filteredTeams.map((team) => {
                  const isDisabled = team.id === disabledTeamId;
                  const isSelected = team.id === selectedTeamId;
                  
                  return (
                    <li key={team.id}>
                      <button
                        type="button"
                        disabled={isDisabled}
                        onClick={() => {
                          onChange(team);
                          setIsOpen(false);
                          setSearch("");
                        }}
                        className={`w-full flex items-center px-3 py-2.5 rounded-lg text-left transition-colors ${
                          isDisabled 
                            ? "opacity-40 cursor-not-allowed bg-slate-50" 
                            : isSelected
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="mr-3 text-xl">{team.flag}</span>
                        <span>{team.name}</span>
                        {isDisabled && <span className="ml-auto text-xs text-slate-400 font-medium bg-slate-200 px-2 py-0.5 rounded-full">Selected</span>}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
