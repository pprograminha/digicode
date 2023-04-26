'use client'

import { parseResultToMessage } from '@/src/utils/parseResultToMessage'
import * as S from './styles'
import { GrPaint } from 'react-icons/gr'
export function Message({ result }) {
  return (
    <S.Message>
      <GrPaint size={20} />
      {parseResultToMessage(result)}
    </S.Message>
  )
}
