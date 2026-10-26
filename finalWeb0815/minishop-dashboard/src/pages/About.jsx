import { Link } from 'react-router-dom'
import { Code, Database, ShoppingBag } from 'lucide-react'

const techStack = [
  { name: 'React + Vite', detail: 'Components, props and hooks (useState, useEffect, useContext)' },
  { name: 'Tailwind CSS', detail: 'Utility classes for layout, colors and responsive design' },
  { name: 'React Router', detail: 'Client-side routing with Link and NavLink (no page reload)' },
  { name: 'Fetch API', detail: 'Loads products from fakestoreapi.com using async/await' },
  { name: 'Recharts', detail: 'Sales overview chart on the admin dashboard' },
  { name: 'localStorage', detail: 'Keeps cart, added products, users and orders after refresh' },
]

const pages = [
  { to: '/', name: 'Home', detail: 'Banner, featured products and categories' },
  { to: '/products', name: 'Products', detail: 'Summary, search, category filter, add and delete products' },
  { to: '/cart', name: 'Cart', detail: 'Change quantity, remove items and see the order summary' },
  { to: '/profile', name: 'Profile', detail: 'Edit profile information and see order history' },
  { to: '/admin', name: 'Admin Dashboard', detail: 'Stats, sales chart, recent orders and inventory' },
]

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 motion-safe:animate-fade-in sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <ShoppingBag className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">About MiniShop Dashboard</h1>
          <p className="text-slate-500">Web Programming final practical exam project</p>
        </div>
      </div>

      <p className="mt-6 leading-relaxed text-slate-600">
        MiniShop Dashboard is a small online shop built with React. Users can browse products, search
        and filter by category, add items to a shopping cart and edit a mock user profile. The admin
        dashboard shows inventory statistics, a sales chart and recent orders, and lets the admin add
        or delete products.
      </p>

      <section aria-labelledby="tech-title" className="mt-10">
        <h2 id="tech-title" className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <Code className="h-5 w-5 text-indigo-600" aria-hidden="true" />
          Technologies
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((item) => (
            <li
              key={item.name}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <p className="font-semibold text-slate-800">{item.name}</p>
              <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pages-title" className="mt-10">
        <h2 id="pages-title" className="text-xl font-semibold text-slate-900">
          Pages
        </h2>
        <ul className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm">
          {pages.map((page) => (
            <li key={page.to}>
              <Link
                to={page.to}
                className="flex flex-col gap-1 px-4 py-3 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium text-indigo-600">{page.name}</span>
                <span className="text-sm text-slate-500">{page.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="data-title" className="mt-10">
        <h2 id="data-title" className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <Database className="h-5 w-5 text-indigo-600" aria-hidden="true" />
          About the data
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
          <li>
            Products are loaded from{' '}
            <a
              href="https://fakestoreapi.com/products"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-600 hover:underline"
            >
              fakestoreapi.com/products
            </a>{' '}
            and combined with 5 mock products from the exam.
          </li>
          <li>If the API cannot be reached, an error message is shown and the mock products are used.</li>
          <li>The API has no stock field, so stock for API products is simulated (demo inventory).</li>
          <li>
            Login, users, orders and sales numbers are demo data saved in the browser (localStorage).
            There is no real backend or payment.
          </li>
        </ul>
      </section>
    </div>
  )
}

export default About
