import React, { createContext, useCallback, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { ToastContainer } from '../../modules/components/ToastContainer'

export const ToastContext = createContext({})

const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  const addToast = useCallback(({ type, title, description }) => {
    const id = uuid()

    const message = {
      id,
      type,
      title,
      description,
      new: true,
    }

    setMessages((toasts) => {
      if (toasts.length > 5) {
        return toasts
      }

      return [...toasts, message]
    })
  }, [])

  const removeToast = useCallback((id) => {
    setMessages((toasts) => toasts.filter((message) => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
        messages,
      }}
    >
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

export { ToastProvider }
