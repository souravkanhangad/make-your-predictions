import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import CreateContestForm from "@/components/CreateContestForm";

export default async function CreateContestPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Create a New Contest</h1>
          <p className="text-slate-500 mt-2">Fill in the details below to generate your unique contest link.</p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
          <CreateContestForm />
        </div>
      </main>
    </div>
  );
}
