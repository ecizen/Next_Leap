import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (!token_hash || !type) {
    redirectTo.pathname = '/auth/email_confirm'
    return NextResponse.redirect(redirectTo)
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (error) {
      console.error('OTP verification error:', error)
      throw error
    }

    redirectTo.searchParams.delete('next')
    return NextResponse.redirect(redirectTo)
  } catch (error) {
    console.error('Verification failed:', error)
    redirectTo.pathname = '/auth/email_confirm'
    return NextResponse.redirect(redirectTo)
  }
}