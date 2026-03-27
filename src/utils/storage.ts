import type { Note } from '../types/note'

const NOTES_KEY = 'notes'
const THEME_KEY = 'theme'

export async function getNotes(): Promise<Note[]> {
  return new Promise((resolve) => {
    chrome.storage.sync.get([NOTES_KEY], (result) => {
      const raw = (result[NOTES_KEY] as Note[] | undefined) ?? []
      // Eski notlara pinned alanı ekle (geriye dönük uyumluluk)
      const notes = raw.map((n) => ({ ...n, pinned: n.pinned ?? false }))
      resolve(notes)
    })
  })
}

export async function saveNotes(notes: Note[]): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [NOTES_KEY]: notes }, resolve)
  })
}

export async function getTheme(): Promise<'light' | 'dark'> {
  return new Promise((resolve) => {
    chrome.storage.local.get([THEME_KEY], (result) => {
      resolve((result[THEME_KEY] as 'light' | 'dark' | undefined) ?? 'light')
    })
  })
}

export async function saveTheme(theme: 'light' | 'dark'): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [THEME_KEY]: theme }, resolve)
  })
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
