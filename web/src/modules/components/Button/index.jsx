import { Loading } from '../Loading'
import * as S from './styles'

export function Button({ isLoading, children, ...rest }) {
  return (
    <S.Button {...rest}>
      {isLoading ? <Loading size={'1rem'} /> : children}
    </S.Button>
  )
}
