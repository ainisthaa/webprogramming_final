import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, ShoppingCart } from 'lucide-react'
import ApiStatus from '../components/ApiStatus'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'
import QuantityControl from '../components/QuantityControl'
import RatingStars from '../components/RatingStars'
import { useCart, useProducts } from '../context/ShopContext'
import { formatCategory, formatPrice } from '../utils/format'
import { labelClass, outlineButton, primaryButton } from '../utils/styles'

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'reviews', label: 'Reviews' },
]

const sourceLabels = {
  api: 'Fake Store API',
  mock: 'Mock data (exam)',
  local: 'Added by user',
}

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, loading } = useProducts()
  const { addToCart, getQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [message, setMessage] = useState('')

  const product = products.find((item) => item.id === id)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ApiStatus />
        {!loading && (
          <div className="mx-auto max-w-md py-12 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
            <p className="mt-2 text-slate-500">This product does not exist or has been deleted.</p>
            <Link to="/products" className={`${primaryButton} mt-6`}>
              Back to Products
            </Link>
          </div>
        )}
      </div>
    )
  }

  const inCart = getQuantity(product.id)
  const available = product.stock - inCart
  const selected = Math.min(quantity, Math.max(available, 1))
  const description = product.description || 'No description available for this product.'
  const related = [
    ...products.filter((item) => item.id !== product.id && item.category === product.category),
    ...products.filter((item) => item.id !== product.id && item.category !== product.category),
  ].slice(0, 4)

  const specifications = [
    ['Product ID', product.id],
    ['Category', formatCategory(product.category)],
    ['Price', formatPrice(product.price)],
    ['Stock', product.source === 'api' ? `${product.stock} (simulated)` : product.stock],
    ['Data source', sourceLabels[product.source]],
  ]

  let addLabel = 'Add to Cart'
  if (product.stock === 0) addLabel = 'Out of Stock'
  else if (available <= 0) addLabel = 'Max in Cart'

  function handleAddToCart() {
    addToCart(product, selected)
    setMessage(`Added ${selected} × ${product.name} to your cart.`)
    setQuantity(1)
  }

  function handleBuyNow() {
    if (available > 0) {
      addToCart(product, selected)
    }
    navigate('/cart')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 motion-safe:animate-fade-in sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
          <li>
            <Link to="/" className="transition hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link to="/products" className="transition hover:text-indigo-600">
              Products
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li aria-current="page" className="max-w-64 truncate font-medium text-slate-700 sm:max-w-md">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex h-80 items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 sm:h-112">
          <ProductImage product={product} className="h-full w-full" iconClass="h-28 w-28" />
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
            {formatCategory(product.category)}
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{product.name}</h1>
          <div className="mt-3">
            <RatingStars rating={product.rating} large />
          </div>
          <p className="mt-4 text-3xl font-bold text-indigo-600">{formatPrice(product.price)}</p>
          <p className="mt-4 line-clamp-4 leading-relaxed text-slate-600">{description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-100 p-4 text-sm">
            <div>
              <dt className="text-slate-500">Category</dt>
              <dd className="mt-1 font-medium text-slate-800">{formatCategory(product.category)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Availability</dt>
              <dd
                className={`mt-1 font-medium ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}
              >
                {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <p className={labelClass}>Quantity</p>
            <QuantityControl
              value={selected}
              max={Math.max(available, 1)}
              onChange={setQuantity}
              disabled={available <= 0}
            />
            {inCart > 0 && (
              <p className="mt-2 text-xs text-slate-500">
                You already have {inCart} of this item in your cart.
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={available <= 0}
              className={`${primaryButton} py-3`}
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              {addLabel}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className={`${outlineButton} py-3`}
            >
              Buy Now
            </button>
          </div>

          {message && (
            <p role="status" className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}{' '}
              <Link to="/cart" className="font-semibold underline">
                View cart
              </Link>
            </p>
          )}
        </div>
      </div>

      <section className="mt-12 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div role="tablist" aria-label="Product information" className="flex gap-6 border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="pt-5 text-sm leading-relaxed text-slate-600"
        >
          {activeTab === 'description' && <p>{description}</p>}

          {activeTab === 'specifications' && (
            <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {specifications.map(([term, value]) => (
                <div key={term} className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">{term}</dt>
                  <dd className="text-right font-medium text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {activeTab === 'reviews' &&
            (product.rating.count > 0 ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-5xl font-bold text-slate-900">{product.rating.rate.toFixed(1)}</p>
                <div>
                  <RatingStars rating={product.rating} large />
                  <p className="mt-1">
                    Average score from {product.rating.count} reviews on the Fake Store API. The API
                    does not include review comments.
                  </p>
                </div>
              </div>
            ) : (
              <p>No reviews yet for this product.</p>
            ))}
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-12">
          <h2 id="related-title" className="mb-6 text-xl font-bold text-slate-900">
            You may also like
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetail
