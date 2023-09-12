import { useCallback, useState } from "react"

export function useDialog() {
  const [show, setShow] = useState(false)

  const open = useCallback(() => {
    setShow(true)
  }, [])

  const close = useCallback(() => {
    setShow(false)
  }, [])


  const toggle= useCallback(() => {
    setShow(previous => !previous)
  }, [])

  return {
    show,
    open,
    close,
    toggle
  }
}