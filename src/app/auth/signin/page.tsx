import { signIn } from "@/lib/auth";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import Navbar from "@/components/Navbar";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
            <span className="text-white font-bold text-3xl">P</span>
          </div>
          
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500 mb-8">Sign in to create and manage your prediction contests.</p>
          
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-700 font-semibold shadow-sm"
            >
              <GoogleIcon className="w-6 h-6" />
              Continue with Google
            </button>
          </form>

          <p className="mt-8 text-xs text-slate-400 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
}
