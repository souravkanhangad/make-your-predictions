import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Make Your Prediction</span>
          </Link>
          <div className="flex items-center space-x-4">
            {session ? (
              <Link href="/dashboard" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                Dashboard
              </Link>
            ) : (
              <Link href="/auth/signin" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                Sign In
              </Link>
            )}
            <Link
              href={session ? "/create" : "/auth/signin"}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
            >
              Create Contest
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
