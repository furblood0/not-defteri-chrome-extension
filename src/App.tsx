import { useState, useCallback } from 'react'
import { useNotes } from './hooks/useNotes'
import { useTheme } from './context/ThemeContext'
import { NoteList } from './components/NoteList'
import { NoteEditor } from './components/NoteEditor'
import { ThemeToggle } from './components/ThemeToggle'
import { Toast } from './components/Toast'
import type { Note } from './types/note'

interface ToastState {
  id: number
  message: string
  type: 'success' | 'error'
}

type View = 'list' | 'editor'

export function App() {
  const { notes, loading, addNote, updateNote, deleteNote, togglePin } = useNotes()
  const { theme } = useTheme()
  const [view, setView] = useState<View>('list')
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ id: Date.now(), message, type })
  }, [])

  const handleNewNote = () => {
    setEditingNote(null)
    setView('editor')
  }

  const handleEdit = (note: Note) => {
    setEditingNote(note)
    setView('editor')
  }

  const handleSave = async (title: string, content: string) => {
    if (editingNote) {
      await updateNote(editingNote.id, title, content)
      showToast('Not güncellendi')
    } else {
      await addNote(title, content)
      showToast('Not kaydedildi')
    }
    setView('list')
  }

  const handleDelete = async (id: string) => {
    await deleteNote(id)
    showToast('Not silindi')
  }

  const handleTogglePin = async (id: string) => {
    const note = notes.find((n) => n.id === id)
    await togglePin(id)
    showToast(note?.pinned ? 'Sabitleme kaldırıldı' : 'Not sabitlendi')
  }

  const noteCount = notes.length

  return (
    <div className={`w-[400px] h-[580px] flex flex-col bg-gray-100 dark:bg-gray-900 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-brand-500 to-brand-700 shadow-md shrink-0">
        <div className="flex items-center gap-2">
          {view === 'editor' ? (
            <button
              onClick={() => setView('list')}
              className="p-1 rounded text-white/80 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : null}
          <div>
            <h1 className="text-white font-bold text-base leading-none">FastNote</h1>
            {view === 'list' && !loading && (
              <p className="text-white/70 text-[11px] mt-0.5">
                {noteCount === 0 ? 'Hiç not yok' : `${noteCount} not`}
              </p>
            )}
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* İçerik */}
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : view === 'list' ? (
          <NoteList
            notes={notes}
            query={query}
            onQueryChange={setQuery}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTogglePin={handleTogglePin}
            onNewNote={handleNewNote}
          />
        ) : (
          <NoteEditor
            note={editingNote}
            onSave={handleSave}
            onBack={() => setView('list')}
          />
        )}
      </div>

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  )
}
