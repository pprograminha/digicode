import React from 'react'
import * as S from './styles'
import { Toast } from './Toast'

const ToastContainer = ({ messages }) => {
  return (
    <S.ToastContainer>
      {messages.map((message) => (
        <Toast key={message.id} message={message} />
      ))}
    </S.ToastContainer>
  )
}

export { ToastContainer }
