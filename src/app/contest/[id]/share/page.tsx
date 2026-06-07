import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import ShareContestClient from "@/components/ShareContestClient";
import { getDb } from "@/lib/db";
import { contests } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function ShareContestPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const { id } = await params;
  
  const db = getDb();
  const contestResult = await db.select().from(contests).where(eq(contests.id, id));
  
  if (contestResult.length === 0 || contestResult[0].userId !== session.user.id) {
    redirect("/dashboard");
  }

  const contestTitle = contestResult[0].title;
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Contest Created Successfully!</h1>
          <p className="text-slate-500 mt-2">Share your contest with friends, followers, or your community.</p>
        </div>

        <ShareContestClient contestId={id} contestTitle={contestTitle} />
      </main>
    </div>
  );
}
