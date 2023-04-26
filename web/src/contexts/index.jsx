import { QueryClientProvider } from 'react-query'
import { ToastProvider } from './ToastProvider'
import { queryClient } from '../services'

export const GlobalProvider = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </>
  )
}
