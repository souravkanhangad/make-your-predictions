import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Plus, Trophy, Activity, CheckCircle2, BarChart2, Share2, Eye, Edit, Award } from "lucide-react";
import { getDb } from "@/lib/db";
import { contests, predictions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function Dashboard() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const db = getDb();
  
  // Fetch user's contests
  const userContests = await db.select()
    .from(contests)
    .where(eq(contests.userId, session.user.id))
    .orderBy(desc(contests.createdAt));

  // Placeholder stats for now
  const stats = {
    totalContests: userContests.length,
    totalPredictions: 0, // Would need a join or separate query
    activeContests: userContests.filter(c => c.status === 'open').length,
    completedContests: userContests.filter(c => c.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {session.user.name?.split(' ')[0]}</h1>
            <p className="text-slate-500 mt-1">Here is what is happening with your contests.</p>
          </div>
          <Link
            href="/create"
            className="inline-flex items-center px-5 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Contest
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <StatCard icon={<Trophy className="w-5 h-5 text-blue-600" />} title="Total Contests" value={stats.totalContests} />
          <StatCard icon={<BarChart2 className="w-5 h-5 text-purple-600" />} title="Predictions" value={stats.totalPredictions} />
          <StatCard icon={<Activity className="w-5 h-5 text-green-600" />} title="Active" value={stats.activeContests} />
          <StatCard icon={<CheckCircle2 className="w-5 h-5 text-slate-600" />} title="Completed" value={stats.completedContests} />
        </div>

        {/* Contests List */}
        <h2 className="text-xl font-bold text-slate-900 mb-6">Your Contests</h2>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <ul className="divide-y divide-slate-100">
            {userContests.length === 0 ? (
              <li className="p-10 text-center text-slate-500">
                You have not created any contests yet.
              </li>
            ) : (
              userContests.map((contest) => (
                <li key={contest.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{contest.title}</h3>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          contest.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {contest.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 font-medium mb-1">
                        <span>{contest.team1Flag} {contest.team1}</span>
                        <span className="text-slate-400 text-sm">vs</span>
                        <span>{contest.team2Flag} {contest.team2}</span>
                      </div>
                      <div className="text-sm text-slate-500 flex items-center gap-4 mt-2">
                        <span>{0} predictions</span>
                        <span>•</span>
                        <span>Deadline: {contest.deadline.toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <ActionLink href={`/contest/${contest.id}`} icon={<Eye className="w-4 h-4 mr-2" />} text="View" />
                      <ActionLink href={`/contest/${contest.id}/share`} icon={<Share2 className="w-4 h-4 mr-2" />} text="Share" />
                      {contest.status === 'open' ? (
                        <ActionLink href={`/contest/${contest.id}/edit`} icon={<Edit className="w-4 h-4 mr-2" />} text="Edit" />
                      ) : (
                        <ActionLink href={`/contest/${contest.id}/winners`} icon={<Award className="w-4 h-4 mr-2 text-amber-600" />} text="Winners" />
                      )}
                      {contest.status === 'open' && (
                        <Link 
                          href={`/contest/${contest.id}/result`}
                          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                        >
                          Enter Result
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: number }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
          {icon}
        </div>
        <h3 className="text-slate-500 font-medium text-sm">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ActionLink({ href, icon, text }: { href: string, icon: React.ReactNode, text: string }) {
  return (
    <Link 
      href={href}
      className="inline-flex items-center px-4 py-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors"
    >
      {icon}
      {text}
    </Link>
  );
}
