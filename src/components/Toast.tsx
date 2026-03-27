import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onDismiss: () => void
}

export function Toast({ message, type, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const show = requestAnimationFrame(() => setVisible(true))
    const hide = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 300)
    }, 2500)
    return () => {
      cancelAnimationFrame(show)
      clearTimeout(hide)
    }
  }, [onDismiss])

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl text-white text-sm font-medium shadow-lg transition-all duration-300 z-50 whitespace-nowrap ${
        type === 'success'
          ? 'bg-emerald-500 dark:bg-emerald-600'
          : 'bg-red-500 dark:bg-red-600'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      {message}
    </div>
  )
}
