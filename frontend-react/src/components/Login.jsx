import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import { Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const userData = { username, password }
    console.log('userData==>', userData)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      console.log('Login successful')
      setIsLoggedIn(true)
      navigate('/dashboard')
    } catch (error) {
      console.error('Invalid credentials')
      setError('Invalid credentials')
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
            <h3 className="text-2xl font-bold text-white">Welcome Back</h3>
            <p className="mt-1 text-sm text-slate-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin}>
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
                  type="password"
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-11 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                  style={{ paddingLeft: '44px' }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

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
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-cyan-400 hover:text-cyan-300">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login
