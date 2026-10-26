import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ShoppingCart, Trash } from 'lucide-react'
import { useCart } from '../context/ShopContext'
import { formatCategory, formatPrice } from '../utils/format'
import { primaryButton } from '../utils/styles'
import ProductImage from './ProductImage'
import RatingStars from './RatingStars'

function ProductCard({ product, showStock = false, onDelete }) {
  const { addToCart, getQuantity } = useCart()
  const [added, setAdded] = useState(false)

  const inStock = product.stock > 0
  const maxInCart = inStock && getQuantity(product.id) >= product.stock

  function handleAddToCart() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  let buttonText = 'Add to Cart'
  if (!inStock) buttonText = 'Out of Stock'
  else if (maxInCart) buttonText = 'Max in Cart'
  else if (added) buttonText = 'Added!'

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/products/${product.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block h-48 bg-slate-50 p-4"
      >
        <ProductImage
          product={product}
          className="h-full w-full transition duration-300 group-hover:scale-105"
        />
        {product.source === 'local' && (
          <span className="absolute top-3 left-3 rounded-full bg-violet-600 px-2 py-0.5 text-xs font-semibold text-white">
            New
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
          {formatCategory(product.category)}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-slate-800">
          <Link to={`/products/${product.id}`} className="transition hover:text-indigo-600">
            {product.name}
          </Link>
        </h3>
        <div className="mt-1">
          <RatingStars rating={product.rating} />
        </div>
        <p className="mt-2 text-lg font-bold text-indigo-600">{formatPrice(product.price)}</p>

        {showStock && (
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-slate-500">
              Stock: <span className="font-semibold text-slate-700">{product.stock}</span>
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}
            >
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-4">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock || maxInCart}
            className={`${primaryButton} flex-1`}
          >
            {added && !maxInCart ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            )}
            {buttonText}
          </button>
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(product)}
              aria-label={`Delete ${product.name}`}
              className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
            >
              <Trash className="h-4 w-4" aria-hidden="true" />
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
