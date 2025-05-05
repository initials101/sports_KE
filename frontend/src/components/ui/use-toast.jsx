"use client"

// A simple toast implementation
import { useState, useEffect } from "react"

// Toast context to manage toasts
const toasts = []
let listeners = []

export function toast({ title, description, variant = "default", duration = 5000 }) {
  const id = Math.random().toString(36).substring(2, 9)
  const newToast = {
    id,
    title,
    description,
    variant,
    duration,
  }

  toasts.push(newToast)
  listeners.forEach((listener) => listener([...toasts]))

  // Auto remove toast after duration
  setTimeout(() => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.splice(index, 1)
      listeners.forEach((listener) => listener([...toasts]))
    }
  }, duration)

  return {
    id,
    dismiss: () => {
      const index = toasts.findIndex((t) => t.id === id)
      if (index !== -1) {
        toasts.splice(index, 1)
        listeners.forEach((listener) => listener([...toasts]))
      }
    },
  }
}

export function useToast() {
  const [currentToasts, setCurrentToasts] = useState(toasts)

  useEffect(() => {
    listeners.push(setCurrentToasts)
    return () => {
      listeners = listeners.filter((listener) => listener !== setCurrentToasts)
    }
  }, [])

  return {
    toast,
    toasts: currentToasts,
    dismiss: (id) => {
      const index = toasts.findIndex((t) => t.id === id)
      if (index !== -1) {
        toasts.splice(index, 1)
        listeners.forEach((listener) => listener([...toasts]))
      }
    },
  }
}
