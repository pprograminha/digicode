import styled from 'styled-components'
import { tint } from 'polished'

export const Button = styled.button`
  border-radius: 0.2rem;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  transition: ease-in 100ms;
  transition-property: background-color color;
  > svg path {
    stroke: #8b8b8b;
    transition: ease-in 100ms;
    transition-property: stroke;
  }
  &:hover {
    background-color: ${tint(0.1, '#16171a')};
    color: #00ffff;

    > svg path {
      stroke: #00ffff;
    }
  }
  &:active {
    background-color: ${tint(0.2, '#16171a')};
  }
`
