'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Trash2, ExternalLink, Globe } from 'lucide-react'

type Bookmark = {
    id: string
    url: string
    title: string
    created_at: string
}

export default function BookmarkList({ userId }: { userId: string }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)
    // const supabase = createClient() // Moved inside useEffect

    useEffect(() => {
        const supabase = createClient()

        // Fetch initial data
        const fetchBookmarks = async () => {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                if (error.message.includes('schema cache')) {
                    setTimeout(fetchBookmarks, 2000)
                } else {
                    console.error('Fetch error:', error)
                }
            } else {
                setBookmarks(data || [])
            }
            setLoading(false)
        }

        fetchBookmarks()

        // Real-time sync
        const channel = supabase
            .channel('db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    console.log('Update:', payload)
                    if (payload.eventType === 'INSERT') {
                        const newItem = payload.new as Bookmark
                        setBookmarks(prev => prev.some(b => b.id === newItem.id) ? prev : [newItem, ...prev])
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks(prev => prev.filter(b => b.id !== payload.old.id))
                    }
                }
            )
            .subscribe((status) => console.log('Sync status:', status))

        return () => {
            supabase.removeChannel(channel)
        }
    }, [userId])

    const handleDelete = async (id: string) => {
        // Re-create supabase client for this action as well, or pass it from context/prop if needed
        // For simplicity, creating it here for now.
        const supabase = createClient()
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .match({ id })

        if (error) {
            alert(error.message)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-slate-800 animate-pulse rounded-xl" />
                ))}
            </div>
        )
    }

    if (bookmarks.length === 0) {
        return (
            <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-slate-800 text-slate-500">
                <p className="text-lg">No bookmarks yet. Add your first one to get started!</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {bookmarks.map((bookmark) => (
                <div
                    key={bookmark.id}
                    className="group flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all"
                >
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-semibold text-slate-200 truncate">{bookmark.title}</h3>
                            <p className="text-sm text-slate-500 truncate">{bookmark.url}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                        <button
                            onClick={() => handleDelete(bookmark.id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
