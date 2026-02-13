import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Bookmark, LogOut, User } from 'lucide-react'
import AddBookmarkForm from '@/components/dashboard/AddBookmarkForm'
import BookmarkList from '@/components/dashboard/BookmarkList'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/')
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* App Header */}
            <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-600 rounded">
                            <Bookmark className="w-5 h-5" />
                        </div>
                        <span className="font-bold">Dashboard</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-3 text-sm text-slate-400">
                            <div className="p-1.5 rounded-full bg-slate-800">
                                <User className="w-4 h-4" />
                            </div>
                            <span className="truncate max-w-[150px]">{user.email}</span>
                        </div>
                        <form action="/auth/signout" method="post">
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-sm font-medium transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Sidebar / Form Area */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="sticky top-28">
                            <AddBookmarkForm userId={user.id} />

                            <div className="mt-8 p-6 rounded-2xl bg-indigo-600/10 border border-indigo-500/20">
                                <h4 className="font-bold text-indigo-400 mb-2">Pro Tip</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Open this dashboard in multiple tabs to see the real-time synchronization in action!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bookmark List Area */}
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-2">My Bookmarks</h1>
                            <p className="text-slate-400">Manage and access your saved locations.</p>
                        </div>

                        <BookmarkList userId={user.id} />
                    </div>
                </div>
            </main>
        </div>
    )
}
