import { shade, tint } from 'polished'
import styled from 'styled-components'
import css from 'styled-jsx/css'

export const Wall = styled.form`
  width: 7rem;
  height: 7rem;
  cursor: pointer;
  border-radius: 0.6rem;
  border: 4px solid #272b30;

  background-color: #1e2124;
  display: flex;
  align-items: left;
  flex-wrap: wrap;
  overflow: hidden;
  gap: 5px;
  &:hover {
    border-color: ${tint(0.1, '#272b30')};
  }
  &:active {
    border-color: ${tint(0.2, '#272b30')};
  }

  ${(props) =>
    props.isBlocked &&
    css`
      cursor: not-allowed;
    `}

  svg {
    margin-left: auto;
    color: #272b30;
  }
  span {
    display: block;

    height: 22px;
    border-radius: 3px;
    width: 47px;
    background-color: #cd5c5c;
    &:nth-child(4n + 1),
    &:nth-child(4n + 2) {
      transform: translateX(-50%);
    }
  }

  ${(props) =>
    props.currOff &&
    css`
      > span {
        background-color: #272b30;
      }
    `}
  ${(props) =>
    props.isCurrent &&
    css`
      border-color: ${shade(0.2, '#cd5c5c')};
      &:hover {
        border-color: ${shade(0.3, '#cd5c5c')};
      }
    `}
`
