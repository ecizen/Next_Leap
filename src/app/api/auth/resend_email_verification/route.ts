import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // 1. Dapatkan user berdasarkan email dengan Admin API
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?email=${encodeURIComponent(email)}`, {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    })

    if (!userRes.ok) {
      const err = await userRes.json()
      return NextResponse.json({ error: err.message || 'Failed to get user' }, { status: 500 })
    }

    const users = await userRes.json()

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userId = users[0].id

    // 2. Kirim ulang email verifikasi
    const resendRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}/send_verification_email`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    })

    if (!resendRes.ok) {
      const err = await resendRes.json()
      return NextResponse.json({ error: err.message || 'Failed to resend verification email' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Verification email resent' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}
