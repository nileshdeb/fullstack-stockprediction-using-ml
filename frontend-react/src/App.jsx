import './index.css'
import './assets/css/style.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Register from './components/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/Login'
import ResetPassword from './components/ResetPassword'
import ResetPasswordConfirm from './components/ResetPasswordConfirm'

import AuthProvider from './AuthProvider'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#0a0e27] text-slate-100">
          <Header />
          <div className="flex flex-1 flex-col">
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/register' element={<PublicRoute><Register/></PublicRoute>} />
              <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
              <Route path='/reset-password' element={<PublicRoute><ResetPassword /></PublicRoute>} />
              <Route
                path='/reset-password-confirm/:uid/:token'
                element={<PublicRoute><ResetPasswordConfirm /></PublicRoute>}
              />
              <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
