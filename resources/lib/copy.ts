"use client"
import { type MouseEventHandler, useCallback, useEffect, useRef, useState } from "react"

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function useCopyButton(onCopy: () => void): [checked: boolean, onClick: MouseEventHandler] {
  const [checked, setChecked] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const callbackRef = useRef(onCopy)
  callbackRef.current = onCopy

  const onClick: MouseEventHandler = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      setChecked(false)
    }, 1500)
    callbackRef.current()
    setChecked(true)
  }, [])

  // Avoid updates after being unmounted
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  return [checked, onClick]
}
