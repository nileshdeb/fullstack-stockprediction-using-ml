import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheck, faEnvelope, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import axiosInstance from '../axiosinstance'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRequestReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await axiosInstance.post('/accounts/password-reset/', { email })
      setSuccess(true)
      setMessage(
        response.data.message ||
          'If an account with that email exists, a password reset link has been sent.'
      )
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center py-16 sm:py-20">
      <div className="flex w-full justify-center px-4">
        <div className="w-full max-w-lg min-w-[480px] rounded-xl border border-white/10 bg-white/5 p-12">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
              <FontAwesomeIcon icon={faEnvelope} className="text-lg text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Reset Password</h3>
            <p className="mt-1 text-sm text-slate-400">Enter your email to receive a reset link</p>
          </div>

          {success ? (
            <div className="mt-6 text-center">
              <div className="mb-4 rounded-lg border border-green-400/20 bg-green-400/10 px-4 py-6 text-green-400">
                <FontAwesomeIcon icon={faCheck} className="mb-2 text-2xl" />
                <p className="font-semibold">Email Sent!</p>
                <p className="mt-2 text-sm text-slate-300">{message}</p>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleRequestReset} className="mt-6">
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {message && !success && (
                <div className="mb-4 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-300">
                  {message}
                </div>
              )}

              {error && (
                <div className="mb-4 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mb-4 h-11 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Sending...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <p className="text-center text-sm text-slate-400">
                Remember your password?{' '}
                <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

export default ResetPassword
