import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import EnterResultForm from "@/components/EnterResultForm";

export default async function EnterResultPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const { id } = await params;
  
  const contest = {
    id: id,
    title: "Champions League Final",
    team1: "Real Madrid",
    team2: "Dortmund",
    team1Flag: "🇪🇸",
    team2Flag: "🇩🇪",
    status: "open",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Enter Final Result</h1>
          <p className="text-slate-500 mt-2">Enter the actual score to automatically calculate the winners for "{contest.title}".</p>
          <div className="inline-flex items-center mt-4 px-3 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-full border border-amber-200">
            Warning: This action is permanent and will lock the contest.
          </div>
        </div>

        <EnterResultForm contest={contest} />
      </main>
    </div>
  );
}
