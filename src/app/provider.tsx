// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(new QueryClient())
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
