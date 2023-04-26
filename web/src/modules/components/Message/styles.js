import { tint } from 'polished'
import styled from 'styled-components'

export const Message = styled.form`
  padding: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border: 4px solid #272b30;
  background-color: #1e2124;
  color: ${tint(0.3, '#16171a')};
  border-radius: 0.5rem;
  max-width: 32rem;
  line-height: 24px;
  width: 100%;
  > svg {
    margin-right: 7px;
  }
  > svg path {
    stroke: #cd5c5c;
  }
`
