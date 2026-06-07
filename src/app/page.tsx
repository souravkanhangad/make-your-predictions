import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, Trophy, Share2, Users, Wand2, Gift } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-100 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
          Now available for everyone
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl">
          Create Prediction Contests in Seconds
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
          Create score prediction contests, share a link, collect predictions, and automatically pick winners. No coding required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/create"
            className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            Create Contest <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-full hover:border-slate-300 hover:bg-slate-50 transition-all w-full sm:w-auto"
          >
            View Demo Contest
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to run contests</h2>
            <p className="text-lg text-slate-600">A complete toolset designed for creators, brands, and sports fans.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Wand2 className="w-6 h-6 text-purple-600" />}
              title="Create instantly"
              description="Set up your contest in under 60 seconds with our intuitive builder."
              color="bg-purple-100"
            />
            <FeatureCard 
              icon={<Share2 className="w-6 h-6 text-blue-600" />}
              title="Share with QR codes"
              description="Generate custom QR codes and links to share across all your social platforms."
              color="bg-blue-100"
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-green-600" />}
              title="Collect predictions"
              description="A frictionless, mobile-optimized form that participants can complete in 15 seconds."
              color="bg-green-100"
            />
            <FeatureCard 
              icon={<Trophy className="w-6 h-6 text-amber-600" />}
              title="Find winners automatically"
              description="Our engine automatically calculates exact matches or closest predictions when you enter the final score."
              color="bg-amber-100"
            />
            <FeatureCard 
              icon={<Gift className="w-6 h-6 text-pink-600" />}
              title="Random prize selection"
              description="Have more exact matches than prizes? We handle transparent random selection automatically."
              color="bg-pink-100"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-600">From creation to winners in 5 simple steps.</p>
        </div>
        <div className="grid md:grid-cols-5 gap-6">
          <StepCard number="1" title="Create Contest" desc="Set the teams, prize, and deadline." />
          <StepCard number="2" title="Share Link" desc="Post the URL or QR code anywhere." />
          <StepCard number="3" title="Collect Predictions" desc="Watch entries roll in live." />
          <StepCard number="4" title="Enter Final Result" desc="Add the score when the game ends." />
          <StepCard number="5" title="Pick Winners" desc="We calculate the rest automatically." />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Make Your Prediction</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg">
        {number}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}
