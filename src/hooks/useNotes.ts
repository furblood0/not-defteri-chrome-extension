import { useState, useEffect, useCallback } from 'react'
import type { Note } from '../types/note'
import { getNotes, saveNotes, generateId } from '../utils/storage'

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNotes().then((loaded) => {
      setNotes(loaded)
      setLoading(false)
    })
  }, [])

  const persist = useCallback(async (updated: Note[]) => {
    setNotes(updated)
    await saveNotes(updated)
  }, [])

  const addNote = useCallback(
    async (title: string, content: string) => {
      const now = new Date().toISOString()
      const note: Note = {
        id: generateId(),
        title: title.trim() || 'Başlıksız Not',
        content: content.trim(),
        pinned: false,
        createdAt: now,
        updatedAt: now,
      }
      await persist([note, ...notes])
      return note
    },
    [notes, persist],
  )

  const updateNote = useCallback(
    async (id: string, title: string, content: string) => {
      const updated = notes.map((n) =>
        n.id === id
          ? {
              ...n,
              title: title.trim() || 'Başlıksız Not',
              content: content.trim(),
              updatedAt: new Date().toISOString(),
            }
          : n,
      )
      await persist(updated)
    },
    [notes, persist],
  )

  const deleteNote = useCallback(
    async (id: string) => {
      await persist(notes.filter((n) => n.id !== id))
    },
    [notes, persist],
  )

  const togglePin = useCallback(
    async (id: string) => {
      const updated = notes.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n,
      )
      await persist(updated)
    },
    [notes, persist],
  )

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  return { notes: sortedNotes, loading, addNote, updateNote, deleteNote, togglePin }
}
