import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardList, TrendingUp, Users } from 'lucide-react'
import InventorySummary from '../../components/InventorySummary'
import OrdersTable from '../../components/OrdersTable'
import PageHeader from '../../components/PageHeader'
import ProductImage from '../../components/ProductImage'
import StatCard from '../../components/StatCard'
import { useProducts, useUser } from '../../context/ShopContext'
import { formatPrice } from '../../utils/format'
import { addDays, getDailySales, getLatestOrderDate, getPeriodLabel } from '../../utils/sales'

const SalesChart = lazy(() => import('../../components/SalesChart'))

const today = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const linkClass =
  'group inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700'

function AdminDashboard() {
  const { products, loading, error } = useProducts()
  const { orders, users } = useUser()
  const [period, setPeriod] = useState('last7')

  const revenue = orders.reduce((sum, order) => sum + order.total, 0)
  const latestDate = getLatestOrderDate(orders)
  const endDate = period === 'last7' ? latestDate : addDays(latestDate, -7)
  const dailySales = getDailySales(orders, endDate)
  const periodTotal = dailySales.reduce((sum, item) => sum + item.sales, 0)
  const topProducts = products
    .filter((product) => product.rating.count > 0)
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4)

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of MiniShop products and store activity">
        <p className="text-sm text-slate-500">Today, {today}</p>
      </PageHeader>

      <section aria-labelledby="inventory-title" className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 id="inventory-title" className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Inventory
          </h2>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
            Live from product data
          </span>
          {loading && <span className="text-xs text-slate-500">Loading products...</span>}
          {error && <span className="text-xs text-rose-600">API unavailable, using mock products</span>}
        </div>
        <InventorySummary products={products} />
      </section>

      <section aria-labelledby="activity-title" className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 id="activity-title" className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Store Activity
          </h2>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
            Demo data
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Orders"
            value={orders.length}
            note="Sample orders + demo checkouts"
            icon={ClipboardList}
            tone="sky"
          />
          <StatCard
            label="Total Revenue"
            value={formatPrice(revenue)}
            note="Sum of all order totals"
            icon={TrendingUp}
            tone="violet"
          />
          <StatCard
            label="Total Users"
            value={users.length}
            note="Mock accounts in localStorage"
            icon={Users}
            tone="amber"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <section
          aria-labelledby="sales-title"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-3"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 id="sales-title" className="font-semibold text-slate-900">
                Sales Overview
              </h2>
              <p className="text-xs text-slate-500">
                Daily order totals, {getPeriodLabel(endDate)}
              </p>
            </div>
            <label>
              <span className="sr-only">Choose period</span>
              <select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              >
                <option value="last7">Last 7 Days</option>
                <option value="previous7">Previous 7 Days</option>
              </select>
            </label>
          </div>
          <p className="mb-2 text-sm text-slate-600">
            Total in this period:{' '}
            <span className="font-semibold text-slate-900">{formatPrice(periodTotal)}</span>
          </p>
          <Suspense
            fallback={
              <div className="flex h-64 items-center justify-center text-sm text-slate-500">
                Loading chart...
              </div>
            }
          >
            <SalesChart data={dailySales} />
          </Suspense>
        </section>

        <section
          aria-labelledby="recent-title"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 id="recent-title" className="font-semibold text-slate-900">
              Recent Orders
            </h2>
            <Link to="/admin/orders" className={linkClass}>
              View All
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <OrdersTable orders={orders.slice(0, 5)} compact />
        </section>
      </div>

      <section
        aria-labelledby="top-title"
        className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 id="top-title" className="font-semibold text-slate-900">
            Top Rated Products
          </h2>
          <Link to="/admin/products" className={linkClass}>
            Manage products
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {topProducts.length === 0 ? (
          <p className="text-sm text-slate-500">No ratings yet. Ratings come from the Fake Store API.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {topProducts.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-slate-50"
                >
                  <span className="shrink-0 rounded-lg bg-slate-50 p-1.5">
                    <ProductImage product={product} className="h-12 w-12" iconClass="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-slate-800">{product.name}</span>
                    <span className="block text-sm font-semibold text-indigo-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="block text-xs text-slate-500">
                      ★ {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default AdminDashboard
