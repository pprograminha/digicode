import styled from 'styled-components'
import css from 'styled-jsx/css'

export const Form = styled.form`
  padding: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border: 4px solid #272b30;
  background-color: #1e2124;
  border-radius: 0.5rem;
  max-width: 34rem;
  width: 100%;

  button {
    margin-top: 20px;
    width: 100%;
  }
`
export const InputGroup = styled.div`
  ${(props) =>
    props.row &&
    css`
      flex-wrap: wrap;
      flex: 1;
      justify-content: space-between;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      > div {
        flex-basis: 230px;
        @media screen and (max-width: 570px) {
          flex-basis: unset;
          width: 100%;
        }
      }
    `}
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  label {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  input {
    width: 100%;
    max-width: 1000px;
    padding: 1rem 2rem;
    border-radius: 0.2rem;
  }
`
export const Error = styled.div`
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  height: 15px;
  color: #cd5c5c;
  overflow: hidden;
  font-size: 0.8rem;
`
