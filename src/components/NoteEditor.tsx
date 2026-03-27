import { useState, useEffect, useRef } from 'react'
import type { Note } from '../types/note'

interface NoteEditorProps {
  note: Note | null
  onSave: (title: string, content: string) => void
  onBack: () => void
}

export function NoteEditor({ note, onSave, onBack }: NoteEditorProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const contentRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setTitle(note?.title ?? '')
    setContent(note?.content ?? '')
    setError('')
    contentRef.current?.focus()
  }, [note])

  const handleSave = () => {
    if (!content.trim()) {
      setError('Not içeriği boş bırakılamaz.')
      return
    }
    onSave(title, content)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSave()
    }
  }

  const isEditing = note !== null

  return (
    <div className="flex flex-col h-full" onKeyDown={handleKeyDown}>
      {/* Editör başlığı */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-3 border-b border-gray-100 dark:border-gray-700">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="flex-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
          {isEditing ? 'Notu Düzenle' : 'Yeni Not'}
        </h2>
        <button
          onClick={handleSave}
          className="px-4 py-1.5 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-brand-500 to-brand-700 hover:opacity-90 transition-opacity active:scale-95"
        >
          Kaydet
        </button>
      </div>

      {/* Form alanları */}
      <div className="flex flex-col flex-1 gap-3 px-4 pt-3 pb-4 overflow-hidden">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              contentRef.current?.focus()
            }
          }}
          placeholder="Başlık (isteğe bağlı)"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 transition-colors"
        />
        <div className="flex flex-col flex-1 min-h-0">
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => { setContent(e.target.value); setError('') }}
            placeholder="Notunu buraya yaz..."
            className={`flex-1 w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm leading-relaxed resize-none focus:outline-none transition-colors ${
              error
                ? 'border-red-400 dark:border-red-500 focus:border-red-500'
                : 'border-gray-200 dark:border-gray-600 focus:border-brand-500 dark:focus:border-brand-400'
            }`}
          />
          {error && (
            <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>
          )}
        </div>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 text-right">
          Ctrl+S ile kaydet
        </p>
      </div>
    </div>
  )
}
