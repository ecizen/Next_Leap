'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { checkUserVerified, resendVerificationEmail } from './action'

export default function ConfirmPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  // useEffect(() => {
  //   const checkVerification = async () => {
  //     try {
  //       const isVerified = await checkUserVerified()
  //       if (isVerified) {
  //         router.push('/')
  //       }
  //     } catch (err) {
  //       console.error('Verification check error:', err)
  //     }
  //   }

  //   checkVerification()
  //   const interval = setInterval(checkVerification, 5000)
  //   return () => clearInterval(interval)
  // }, [router])

  const handleResend = async () => {
    setIsLoading(true)
    setError('')
    setMessage('')
    
    try {
      const { error } = await resendVerificationEmail(email)
      if (error) {
        setError(error.message || 'Failed to resend verification email')
      } else {
        setMessage('Verification email has been resent successfully')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Resend error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-4 text-center">
      <h2 className="text-xl font-semibold">Verify Your Email</h2>
      <p className="text-sm mt-2 text-gray-600">
        We've sent a verification email to <strong>{email}</strong>.
        <br />
        Please click the verification link in your email.
      </p>

      <Button 
        onClick={handleResend} 
        disabled={isLoading} 
        className="mt-6 w-full"
      >
        {isLoading ? 'Sending...' : 'Resend Verification Email'}
      </Button>

      {message && (
        <p className="text-sm text-green-600 mt-2">{message}</p>
      )}
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}

      <p className="text-xs text-gray-500 mt-4">
        Didn't receive the email? Check your spam folder or try resending.
      </p>
    </div>
  )
}