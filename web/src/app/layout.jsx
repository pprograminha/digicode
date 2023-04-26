'use client'

import { GlobalStyle } from '../styles/global'
import { GlobalProvider } from '../contexts'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <title>Digital Republic</title>
      <link rel="shortcut icon" href="/next.svg" type="image/png" />
      <GlobalStyle />

      <body>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  )
}
