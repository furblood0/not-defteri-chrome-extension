import { useMemo } from 'react'
import type { Note } from '../types/note'
import { NoteItem } from './NoteItem'
import { SearchBar } from './SearchBar'

interface NoteListProps {
  notes: Note[]
  query: string
  onQueryChange: (q: string) => void
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
  onTogglePin: (id: string) => void
  onNewNote: () => void
}

export function NoteList({
  notes,
  query,
  onQueryChange,
  onEdit,
  onDelete,
  onTogglePin,
  onNewNote,
}: NoteListProps) {
  const filtered = useMemo(() => {
    if (!query.trim()) return notes
    const q = query.toLowerCase()
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q),
    )
  }, [notes, query])

  const pinned = filtered.filter((n) => n.pinned)
  const regular = filtered.filter((n) => !n.pinned)

  return (
    <div className="flex flex-col h-full">
      <SearchBar query={query} onChange={onQueryChange} />

      <div className="flex-1 overflow-y-auto px-3 pt-2 pb-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 text-gray-400 dark:text-gray-500">
            {query ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm font-medium">Sonuç bulunamadı</p>
                <p className="text-xs mt-1">"{query}" için not yok</p>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm font-medium">Henüz not yok</p>
                <p className="text-xs mt-1">İlk notunu oluşturmak için + butonuna tıkla</p>
              </>
            )}
          </div>
        ) : (
          <>
            {pinned.length > 0 && (
              <div className="mb-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-0.5">
                  Sabitlenmiş
                </p>
                {pinned.map((note) => (
                  <NoteItem
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onTogglePin={onTogglePin}
                  />
                ))}
              </div>
            )}
            {regular.length > 0 && (
              <div>
                {pinned.length > 0 && (
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-0.5">
                    Notlar
                  </p>
                )}
                {regular.map((note) => (
                  <NoteItem
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onTogglePin={onTogglePin}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="px-3 pt-2 pb-3 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0">
        <button
          onClick={onNewNote}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-700 shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          + Yeni Not
        </button>
      </div>
    </div>
  )
}
