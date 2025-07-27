// app/(auth)/auth/email_confirm/page.tsx
import ConfirmPage from '@/app/components/molecules/confirm-page'
import { Suspense } from 'react'


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmPage />
    </Suspense>
  )
}
