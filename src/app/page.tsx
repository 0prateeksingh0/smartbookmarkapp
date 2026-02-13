'use client'

import { createClient } from '@/lib/supabase/client'
import { Bookmark, Github, Globe, Shield, Zap } from 'lucide-react'

export default function LandingPage() {
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
              <Bookmark className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">SmartBookmark</span>
          </div>
          <button
            onClick={handleLogin}
            className="px-5 py-2 rounded-full bg-white text-slate-950 font-medium hover:bg-slate-200 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span>Now with Real-time Sync</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Manage your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">bookmarks</span> with intelligence
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            A simple, fast, and secure way to keep track of your favorite places on the web.
            Real-time updates across all your devices.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20"
            >
              Sign in with Google
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto mt-32 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-yellow-400" />,
              title: "Real-time Sync",
              description: "Add a bookmark on one tab, see it appear instantly on another. No refresh needed."
            },
            {
              icon: <Shield className="w-6 h-6 text-green-400" />,
              title: "Private & Secure",
              description: "Your bookmarks are linked to your Google account and protected by Supabase RLS."
            },
            {
              icon: <Globe className="w-6 h-6 text-indigo-400" />,
              title: "Accessible Anywhere",
              description: "Access your saved links from any device, anywhere in the world."
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-indigo-500" />
            <span className="font-bold">SmartBookmark</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 SmartBookmark.
          </p>
        </div>
      </footer>
    </div>
  )
}
