import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/cart', label: 'Cart' },
]

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-semibold">MiniShop</span>
        </Link>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-slate-400">&copy; {year} MiniShop. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
