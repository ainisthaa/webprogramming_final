import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Menu, Search, ShoppingBag, ShoppingCart, User, X } from 'lucide-react'
import { useCart, useUser } from '../context/ShopContext'
import { inputClass } from '../utils/styles'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
]

const iconButton =
  'relative inline-flex items-center gap-2 rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600'

function linkClass({ isActive }) {
  const base = 'block rounded-lg px-3 py-2 text-sm font-medium transition'
  return isActive
    ? `${base} bg-indigo-50 text-indigo-700`
    : `${base} text-slate-600 hover:bg-slate-100 hover:text-indigo-600`
}

function Header() {
  const { cartCount } = useCart()
  const { currentUser } = useUser()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSearch(event) {
    event.preventDefault()
    const term = search.trim()
    navigate(term ? `/products?search=${encodeURIComponent(term)}` : '/products')
    setMenuOpen(false)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  function renderSearch(id) {
    return (
      <form role="search" onSubmit={handleSearch} className="relative">
        <label htmlFor={id} className="sr-only">
          Search products
        </label>
        <Search
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          id={id}
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products..."
          className={`${inputClass} pl-9`}
        />
      </form>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={closeMenu} className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold text-slate-900">MiniShop</span>
        </Link>

        <nav aria-label="Main" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <div className="hidden w-56 lg:block xl:w-64">{renderSearch('header-search')}</div>

          <Link to="/admin" aria-label="Admin Dashboard" className={iconButton}>
            <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
            <span className="hidden text-sm font-medium xl:inline">Admin</span>
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
            aria-label={`Shopping cart, ${cartCount} items`}
            className={iconButton}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-semibold text-white"
              >
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to={currentUser ? '/profile' : '/login'}
            onClick={closeMenu}
            aria-label={currentUser ? `My profile (${currentUser.name})` : 'Sign in'}
            className={iconButton}
          >
            <User className="h-5 w-5" aria-hidden="true" />
            {currentUser && (
              <span className="hidden max-w-24 truncate text-sm font-medium xl:inline">
                {currentUser.name.split(' ')[0]}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`${iconButton} lg:hidden`}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white px-4 pt-3 pb-4 lg:hidden">
          {renderSearch('mobile-search')}
          <nav aria-label="Mobile" className="mt-3">
            <ul className="space-y-1">
              {[...links, { to: '/admin', label: 'Admin Dashboard' }].map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.to === '/'} onClick={closeMenu} className={linkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
