import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { HomePage } from './pages/Home'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid min-h-dvh place-items-center">
        <HomePage />
      </div>
    </QueryClientProvider>
  )
}
