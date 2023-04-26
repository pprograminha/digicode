import React, { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { useToast } from '../../../../hooks/useToast'
import * as S from './styles'

const icons = {
  info: <FiInfo size={20} />,
  success: <FiCheckCircle size={20} />,
  error: <FiAlertCircle size={20} />,
}

const Toast = ({ message, style }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 6000)

    return () => {
      clearTimeout(timer)
    }
  }, [message.id, removeToast])

  return (
    <S.Toast
      type={message.type}
      onClick={() => removeToast(message.id)}
      style={style}
    >
      <S.Title>
        {icons[message.type || 'info']}
        <strong>{message.title}</strong>
      </S.Title>
      {message.description && <p>{message.description}</p>}
      <button type="button">
        <FiXCircle size={20} />
      </button>
    </S.Toast>
  )
}

export { Toast }
