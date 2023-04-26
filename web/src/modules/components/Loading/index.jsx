'use client'
import * as S from './styles'

const Loading = ({ size, ...rest }) => {
  return (
    <S.Loading size={size} centralize={!!rest.centralize}>
      <div>
        <span></span>
      </div>
    </S.Loading>
  )
}

export { Loading }
