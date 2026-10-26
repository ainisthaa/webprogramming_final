import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Info, ShoppingBag } from 'lucide-react'
import { useUser } from '../context/ShopContext'
import { inputClass, labelClass, outlineButton, primaryButton } from '../utils/styles'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emptyForm = { name: '', email: '', password: '' }

function Login() {
  const { currentUser, login, loginDemo, register, logout } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const redirectTo = location.state?.from || '/profile'
  const isRegister = mode === 'register'

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setError('')
  }

  function switchMode(newMode) {
    setMode(newMode)
    setForm(emptyForm)
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const email = form.email.trim()

    if (isRegister && form.name.trim() === '') {
      setError('Please enter your full name.')
      return
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    const result = isRegister ? register({ ...form, email }) : login(email, form.password)
    if (result) {
      setError(result)
      return
    }
    navigate(redirectTo, { replace: true })
  }

  function handleDemoLogin() {
    const result = loginDemo()
    if (result) {
      setError(result)
      return
    }
    navigate(redirectTo, { replace: true })
  }

  if (currentUser) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center motion-safe:animate-fade-in">
        <h1 className="text-2xl font-bold text-slate-900">You are signed in</h1>
        <p className="mt-2 text-slate-500">
          Signed in as {currentUser.name} ({currentUser.email}).
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/profile" className={primaryButton}>
            Go to Profile
          </Link>
          <button type="button" onClick={logout} className={outlineButton}>
            Log Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 motion-safe:animate-fade-in">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            {isRegister ? 'Create an account' : 'Sign in to MiniShop'}
          </h1>
          {location.state?.from && (
            <p className="mt-2 text-sm text-slate-500">Please sign in to continue.</p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 rounded-lg bg-slate-100 p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => switchMode('login')}
            aria-pressed={!isRegister}
            className={`rounded-md py-2 transition ${
              isRegister ? 'text-slate-500 hover:text-slate-700' : 'bg-white text-indigo-700 shadow-sm'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
            aria-pressed={isRegister}
            className={`rounded-md py-2 transition ${
              isRegister ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {isRegister && (
            <div>
              <label htmlFor="login-name" className={labelClass}>
                Full Name
              </label>
              <input
                id="login-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          )}
          <div>
            <label htmlFor="login-email" className={labelClass}>
              Email Address
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="login-password" className={labelClass}>
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              value={form.password}
              onChange={handleChange}
              className={inputClass}
            />
            {isRegister && <p className="mt-1 text-xs text-slate-500">At least 6 characters.</p>}
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          )}

          <button type="submit" className={`${primaryButton} w-full py-2.5`}>
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-900">
          <p className="flex items-center gap-2 font-semibold">
            <Info className="h-4 w-4" aria-hidden="true" />
            Demo account
          </p>
          <p className="mt-1">Email: john@example.com / Password: demo1234</p>
          <button type="button" onClick={handleDemoLogin} className={`${outlineButton} mt-3 w-full`}>
            Continue with demo account
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Demo only: accounts are saved in this browser (localStorage). Do not use a real password.
        </p>
      </div>
    </div>
  )
}

export default Login
