
import { createClient } from '@/utils/supabase/server'

export async function resendVerificationEmail(email: string) {
  const supabase = await createClient()
  
  try {
    // Gunakan getSession() bukan getUser() karena user belum verified
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session) {
      return { error: { message: 'Session not found. Please try signing up again.' } }
    }

    // Verifikasi email cocok dengan yang di session
    const sessionEmail = session.user.email
    if (sessionEmail !== email) {
      return { error: { message: 'Email does not match your signup session' } }
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: sessionEmail,
    })

    if (error) {
      console.error('Resend error:', error)
      return { 
        error: { 
          message: error.message || 'Failed to resend. Please try again later.' 
        } 
      }
    }

    return { error: null }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { error: { message: 'System error. Please contact support.' } }
  }
}

export async function checkUserVerified() {
  const supabase = await createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Check verification error:', error)
      return false
    }
    
    return user?.email_confirmed_at != null
  } catch (err) {
    console.error('Unexpected error:', err)
    return false
  }
}