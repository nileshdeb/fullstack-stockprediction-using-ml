import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import axiosInstance from '../axiosinstance'

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams()
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await axiosInstance.post('/accounts/password-reset-confirm/', {
        uid,
        token,
        new_password: newPassword
      })

      setSuccess(true)
      setMessage(response.data.message || 'Password reset successful. Redirecting to login...')

      window.setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password. The link may be invalid or expired.')
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
              <FontAwesomeIcon icon={faLock} className="text-lg text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Set New Password</h3>
            <p className="mt-1 text-sm text-slate-400">Choose a new password for your account</p>
          </div>

          {success ? (
            <div className="mt-6 rounded-lg border border-green-400/20 bg-green-400/10 px-4 py-6 text-center text-green-400">
              <FontAwesomeIcon icon={faCheck} className="mb-2 text-2xl" />
              <p className="font-semibold">Password Reset Complete</p>
              <p className="mt-2 text-sm text-slate-300">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-300">New Password</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute text-sm text-slate-500"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-11 pr-11 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                    style={{ paddingLeft: '44px' }}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute text-slate-500 transition-colors duration-300 hover:text-slate-300"
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-300">Confirm Password</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute text-sm text-slate-500"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-11 pr-11 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                    style={{ paddingLeft: '44px' }}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute text-slate-500 transition-colors duration-300 hover:text-slate-300"
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-400">
                  {error}
                </div>
              )}

              {message && (
                <div className="mb-4 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-300">
                  {message}
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
                    Resetting...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

export default ResetPasswordConfirm
