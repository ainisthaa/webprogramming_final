import { startTransition, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CircleCheck, ClipboardList, LogOut, ShoppingCart, User } from 'lucide-react'
import OrdersTable from '../components/OrdersTable'
import { useUser } from '../context/ShopContext'
import { errorClass, inputClass, labelClass, primaryButton } from '../utils/styles'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+\-\s()]{9,20}$/
const BIO_LIMIT = 160

const menuLink =
  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900'

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

function validate(form) {
  const errors = {}
  if (form.name.trim() === '') {
    errors.name = 'Full name is required.'
  }
  if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (form.phone.trim() !== '' && !PHONE_PATTERN.test(form.phone.trim())) {
    errors.phone = 'Please enter a valid phone number (e.g. 081-234-5678).'
  }
  return errors
}

function Profile() {
  const { currentUser, orders, updateProfile, logout } = useUser()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone || '',
    bio: currentUser.bio || '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const myOrders = orders.filter((order) => order.userId === currentUser.id)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validate(form)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const data = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      bio: form.bio.trim(),
    }
    const result = updateProfile(data)
    if (result) {
      setErrors({ email: result })
      return
    }

    setForm(data)
    setMessage('Profile saved successfully.')
  }

  function handleLogout() {
    startTransition(() => {
      logout()
      navigate('/')
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 motion-safe:animate-fade-in sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[16rem_1fr]">
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <div className="flex flex-col items-center text-center">
            <div
              aria-hidden="true"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600"
            >
              {getInitials(currentUser.name)}
            </div>
            <p className="mt-3 font-semibold text-slate-900">{currentUser.name}</p>
            <p className="text-sm break-all text-slate-500">{currentUser.email}</p>
          </div>

          <nav aria-label="Account" className="mt-6">
            <ul className="space-y-1 text-sm font-medium">
              <li>
                <a
                  href="#profile-info"
                  className="flex items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700"
                >
                  <User className="h-4 w-4" aria-hidden="true" />
                  Profile
                </a>
              </li>
              <li>
                <a href="#orders" className={menuLink}>
                  <ClipboardList className="h-4 w-4" aria-hidden="true" />
                  Orders
                </a>
              </li>
              <li>
                <Link to="/cart" className={menuLink}>
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  My Cart
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-rose-600 transition hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 space-y-6">
          <section
            id="profile-info"
            aria-labelledby="profile-title"
            className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 id="profile-title" className="text-lg font-semibold text-slate-900">
              Profile Information
            </h2>
            <p className="text-sm text-slate-500">
              Update your personal details. Changes are saved in this browser.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="profile-name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="profile-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'profile-name-error' : undefined}
                  className={inputClass}
                />
                {errors.name && (
                  <p id="profile-name-error" className={errorClass}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="profile-email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="profile-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'profile-email-error' : undefined}
                  className={inputClass}
                />
                {errors.email && (
                  <p id="profile-email-error" className={errorClass}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="profile-phone" className={labelClass}>
                  Phone Number
                </label>
                <input
                  id="profile-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="081-234-5678"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'profile-phone-error' : undefined}
                  className={inputClass}
                />
                {errors.phone && (
                  <p id="profile-phone-error" className={errorClass}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="profile-bio" className={labelClass}>
                  Bio
                </label>
                <textarea
                  id="profile-bio"
                  name="bio"
                  rows={3}
                  maxLength={BIO_LIMIT}
                  value={form.bio}
                  onChange={handleChange}
                  aria-describedby="profile-bio-count"
                  className={inputClass}
                />
                <p id="profile-bio-count" className="mt-1 text-right text-xs text-slate-400">
                  {form.bio.length}/{BIO_LIMIT}
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <div role="status">
                  {message && (
                    <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                      <CircleCheck className="h-4 w-4" aria-hidden="true" />
                      {message}
                    </p>
                  )}
                </div>
                <button type="submit" className={primaryButton}>
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          <section
            id="orders"
            aria-labelledby="orders-title"
            className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 id="orders-title" className="text-lg font-semibold text-slate-900">
                Recent Orders
              </h2>
              <span className="text-xs text-slate-400">Demo order history</span>
            </div>
            <OrdersTable orders={myOrders} showCustomer={false} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Profile
