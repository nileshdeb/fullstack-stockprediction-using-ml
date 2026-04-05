import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegistration = async (e) => {
    e.preventDefault()
    setLoading(true)

    const userData = { username, email, password }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
      console.log('response.data==>', response.data)
      console.log('Registration successful')
      setErrors({})
      setSuccess(true)
    } catch (error) {
      setErrors(error.response.data)
      console.error('Registration error: ', error.response.data)
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
              <FontAwesomeIcon icon={faUser} className="text-lg text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Create Account</h3>
            <p className="mt-1 text-sm text-slate-400">Join the Stock Prediction Portal</p>
          </div>

          <form onSubmit={handleRegistration}>
            <div className="mb-5">
              <label className="mt-7 mb-2 block text-sm font-medium text-slate-300">Username</label>
              <div className="relative" style={{ position: 'relative' }}>
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute text-sm text-slate-500"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="text"
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-11 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                  style={{ paddingLeft: '44px' }}
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {errors.username && <p className="mt-1 text-xs text-red-400">{errors.username}</p>}
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
              <div className="relative" style={{ position: 'relative' }}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute text-sm text-slate-500"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="email"
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-11 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                  style={{ paddingLeft: '44px' }}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
              <div className="relative" style={{ position: 'relative' }}>
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute text-sm text-slate-500"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-11 pr-11 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                  style={{ paddingLeft: '44px' }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute text-slate-500 transition-colors duration-300 hover:text-slate-300"
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
            </div>

            {success && (
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-400">
                Registration Successful! You can now{' '}
                <Link to="/login" className="font-medium underline underline-offset-2">
                  sign in
                </Link>
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
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Register
