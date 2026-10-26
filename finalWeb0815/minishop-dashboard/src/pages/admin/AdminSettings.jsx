import { useState } from 'react'
import { CircleCheck, Database, RefreshCw, RotateCcw } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useCart, useProducts, useUser } from '../../context/ShopContext'
import { API_URL } from '../../utils/products'
import { outlineButton } from '../../utils/styles'

function AdminSettings() {
  const { products, loading, error, retryFetch, resetProducts } = useProducts()
  const { clearCart } = useCart()
  const { resetUserData } = useUser()
  const [message, setMessage] = useState('')

  const apiCount = products.filter((product) => product.source === 'api').length

  let status = `Connected (${apiCount} API products in the list)`
  if (loading) status = 'Loading products...'
  else if (error) status = `Error: ${error}`

  function handleReset() {
    const ok = window.confirm(
      'Reset all demo data? Added and deleted products, cart, users and orders will go back to the default, and you will be logged out.',
    )
    if (ok) {
      resetProducts()
      clearCart()
      resetUserData()
      setMessage('Demo data has been reset.')
    }
  }

  return (
    <>
      <PageHeader title="Settings" subtitle="Manage the product data source and the demo data." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 font-semibold text-slate-900">
            <Database className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            Product API
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Endpoint</dt>
              <dd className="mt-1 font-mono break-all text-slate-800">{API_URL}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Status</dt>
              <dd className={`mt-1 font-medium ${error ? 'text-rose-600' : 'text-slate-800'}`}>{status}</dd>
            </div>
          </dl>
          <button type="button" onClick={retryFetch} disabled={loading} className={`${outlineButton} mt-5`}>
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Reload API data
          </button>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 font-semibold text-slate-900">
            <RotateCcw className="h-5 w-5 text-rose-600" aria-hidden="true" />
            Reset demo data
          </h2>
          <p className="mt-4 text-sm text-slate-600">
            Products you added or deleted, the cart, mock users and orders are saved in localStorage.
            Reset them to start the demo again from the beginning.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset demo data
          </button>
          <div role="status">
            {message && (
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-700">
                <CircleCheck className="h-4 w-4" aria-hidden="true" />
                {message}
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default AdminSettings
