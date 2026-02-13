'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Loader2 } from 'lucide-react'

export default function AddBookmarkForm({ userId }: { userId: string }) {
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase
            .from('bookmarks')
            .insert([
                {
                    url,
                    title: title || url,
                    user_id: userId
                }
            ])

        if (error) {
            alert(error.message)
        } else {
            setUrl('')
            setTitle('')
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-500" />
                Add New Bookmark
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">URL</label>
                    <input
                        type="url"
                        required
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Title (Optional)</label>
                    <input
                        type="text"
                        placeholder="Website Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold transition-all flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                    {loading ? 'Adding...' : 'Add Bookmark'}
                </button>
            </div>
        </form>
    )
}
