import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        appearance: none;
        border: 0;
        outline: 0;
        
    }
    button {
        cursor: pointer;
        color: #00FFFF;
    }
    input, button {
        padding: 0.25rem;
        color: #8B8B8B;
        background-color: #272b30;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        color: #8B8B8B;
        box-shadow: 0 0 0 30px #272b30 inset !important;
    }
    input:-webkit-autofill {
        -webkit-text-fill-color: #8B8B8B !important;
    }
    html, body {
        font-family: sans-serif;
        font-weight: bold;
        color: #00FFFF;
        background-color: #16171a;
        min-width: 17.5rem;
        min-height: 100vh;
    }
`
