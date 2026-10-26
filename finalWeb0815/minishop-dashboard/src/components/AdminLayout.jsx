import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  ArrowLeft,
  ClipboardList,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Tags,
  Users,
} from 'lucide-react'

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/categories', label: 'Categories', icon: Tags },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

function adminLinkClass({ isActive }) {
  const base = 'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition'
  return isActive
    ? `${base} bg-indigo-600 text-white`
    : `${base} text-slate-300 hover:bg-slate-800 hover:text-white`
}

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="bg-slate-900 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-60 lg:flex-col">
        <div className="flex h-16 items-center justify-between px-5">
          <Link to="/admin" className="flex items-center gap-2 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold">MiniShop</span>
          </Link>
          <Link to="/" className="text-sm text-slate-400 transition hover:text-white lg:hidden">
            Back to shop
          </Link>
        </div>

        <nav aria-label="Admin" className="px-3 pb-3 lg:flex-1 lg:py-4">
          <ul className="flex gap-1 overflow-x-auto lg:flex-col">
            {adminLinks.map((link) => (
              <li key={link.to} className="shrink-0">
                <NavLink to={link.to} end={link.end} className={adminLinkClass}>
                  <link.icon className="h-4 w-4" aria-hidden="true" />
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden border-t border-slate-800 p-4 lg:block">
          <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to shop
          </Link>
        </div>
      </aside>

      <main className="lg:pl-60">
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
