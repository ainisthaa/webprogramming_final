import { LoaderCircle, RefreshCw, TriangleAlert } from 'lucide-react'
import { useProducts } from '../context/ShopContext'

function ApiStatus() {
  const { loading, error, retryFetch } = useProducts()

  if (loading) {
    return (
      <div
        role="status"
        className="mb-6 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-12 text-slate-500"
      >
        <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
        Loading products...
      </div>
    )
  }

  if (error) {
    return (
      <div
        role="alert"
        className="mb-6 flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex gap-2">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            <span className="font-semibold">Could not load products from the API</span> ({error}).
            Showing mock products instead.
          </p>
        </div>
        <button
          type="button"
          onClick={retryFetch}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2 font-semibold text-white transition hover:bg-rose-700"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Retry API
        </button>
      </div>
    )
  }

  return null
}

export default ApiStatus
