import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <header className="border-b border-white/10 bg-[#0a0e27]">
      <div className="flex w-full items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-[22px] font-bold text-transparent sm:text-2xl"
        >
          Stock Prediction Portal
        </Link>

        <div className="ml-auto flex items-center" style={{ gap: '16px' }}>
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-lg border border-cyan-400/30 px-4 py-2 text-[15px] font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-400/10"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-400/30 px-4 py-2 text-[15px] font-medium text-red-400 transition-all duration-300 hover:bg-red-400/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-white/20 px-4 py-2 text-[15px] font-medium text-white/80 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="mr-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-[15px] font-semibold text-white transition-all duration-300 hover:shadow-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
