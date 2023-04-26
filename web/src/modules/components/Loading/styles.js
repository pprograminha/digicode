import styled, { keyframes } from 'styled-components'
import css from 'styled-jsx/css'

const spanAnimation = keyframes`
    0% {
        width: 0.2rem;
       
    }
    50% {
        width: 0.8rem;
        
    }
    100% {
        width: 0.2rem;
    }
`
const divAnimation = keyframes`
    from {
         transform: rotateZ(0deg);
       
    }
    to {
        transform: rotateZ(360deg);
    }
`
export const Loading = styled.div`
  ${(props) =>
    props.centralize &&
    css`
      width: ${(props) => props.size};
      height: ${(props) => props.size};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
    `}
  padding: 5px;
  > div {
    display: inline-block;
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    transform: scale(1.2);
    animation: ${divAnimation} infinite ease-in-out 500ms;
  }
  span {
    display: block;
    width: 0.2rem;
    background-color: #00ffff;
    height: 0.2rem;
    border-radius: 50rem;
    animation: ${spanAnimation} infinite ease-in-out 500ms;
  }
`
