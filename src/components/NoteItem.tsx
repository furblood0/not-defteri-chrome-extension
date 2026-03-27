import type { Note } from '../types/note'

interface NoteItemProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
  onTogglePin: (id: string) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function NoteItem({ note, onEdit, onDelete, onTogglePin }: NoteItemProps) {
  const preview = note.content.length > 90
    ? note.content.substring(0, 90) + '…'
    : note.content

  return (
    <div
      onClick={() => onEdit(note)}
      className={`group relative rounded-xl p-3.5 mb-2.5 cursor-pointer border-l-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${
        note.pinned
          ? 'bg-blue-50 dark:bg-blue-950/30 border-brand-500'
          : 'bg-white dark:bg-gray-800 border-brand-500/50 dark:border-brand-400/50'
      }`}
    >
      {/* Başlık + pin */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="font-semibold text-sm text-gray-800 dark:text-gray-100 leading-snug line-clamp-1">
          {note.title}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onTogglePin(note.id) }}
          title={note.pinned ? 'Sabitlemeyi kaldır' : 'Sabitle'}
          className={`shrink-0 p-0.5 rounded transition-colors ${
            note.pinned
              ? 'text-brand-500 dark:text-brand-400'
              : 'text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill={note.pinned ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      {/* Önizleme */}
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-2">
        {preview}
      </p>

      {/* Alt bilgi */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-gray-400 dark:text-gray-500">
          {formatDate(note.updatedAt)}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(note.id)
          }}
          title="Sil"
          className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
