import styled, { css } from 'styled-components'

const toastStyles = {
  info: css`
    color: #e0db7b;
    border-color: #e0db7b;
    > button svg {
      stroke: #e0db7b;
    }
  `,
  success: css`
    color: #80e07b;
    border-color: #80e07b;
    > button svg {
      stroke: #80e07b;
    }
  `,
  error: css`
    color: #cd5c5c;
    border-color: #cd5c5c;
    > button svg {
      stroke: #cd5c5c;
    }
  `,
}

export const Toast = styled.div`
  position: relative;

  font-weight: bold;
  max-width: 25rem;
  width: 100%;
  margin: 0.625rem 0;
  border: 0.125rem solid transparent;
  background-color: #16171a;
  cursor: pointer;
  padding: 0.625rem 3.75rem 0.625rem 1.25rem;
  border-radius: 0.625rem;

  backdrop-filter: blur(0.625rem);

  ${(props) => toastStyles[props.type || 'info']}

  > p {
    font-size: 0.8rem;
  }
  > button {
    background-color: transparent;
    position: absolute;
    top: 0.625rem;
    right: 1.25rem;
  }
`
export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.312rem;
  > strong {
    font-weight: bold;
  }
  > svg {
    flex-shrink: 0;
    margin-right: 0.625rem;
  }
`
