import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CircleCheck, ShoppingCart, Trash } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'
import QuantityControl from '../components/QuantityControl'
import { useCart, useProducts, useUser } from '../context/ShopContext'
import { formatCategory, formatOrderId, formatPrice } from '../utils/format'
import { outlineButton, primaryButton } from '../utils/styles'

const SHIPPING_FEE = 0

function Cart() {
  const { cart, cartCount, subtotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const { products } = useProducts()
  const { currentUser, placeOrder } = useUser()
  const [order, setOrder] = useState(null)

  const total = subtotal + SHIPPING_FEE
  const suggestions = products.filter(
    (product) => product.stock > 0 && !cart.some((item) => item.id === product.id),
  )
  const recommended = [
    ...suggestions.filter((product) => product.image),
    ...suggestions.filter((product) => !product.image),
  ].slice(0, 4)

  function handleCheckout() {
    const newOrder = placeOrder(cart, total)
    clearCart()
    setOrder(newOrder)
  }

  function handleClearCart() {
    if (window.confirm('Remove all items from your cart?')) {
      clearCart()
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 motion-safe:animate-fade-in sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
      <p className="mt-1 text-slate-500">
        {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
      </p>

      {order && (
        <div role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
          <p className="flex items-center gap-2 font-semibold">
            <CircleCheck className="h-5 w-5" aria-hidden="true" />
            Order {formatOrderId(order.id)} placed successfully!
          </p>
          <p className="mt-1 text-sm">
            Total {formatPrice(order.total)}. This is a demo checkout, so no real payment was made.
            {!currentUser && ' (Guest order: sign in before checkout to save orders in your profile.)'}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
            {currentUser && (
              <Link to="/profile" className="underline">
                View order history
              </Link>
            )}
            <Link to="/products" className="underline">
              Continue shopping
            </Link>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        !order && (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold text-slate-800">Your cart is empty</p>
            <p className="mt-1 text-sm text-slate-500">Browse products and add something you like.</p>
            <Link to="/products" className={`${primaryButton} mt-6`}>
              Start Shopping
            </Link>
          </div>
        )
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="hidden gap-4 border-b border-slate-200 px-6 py-3 text-xs font-medium tracking-wide text-slate-500 uppercase sm:flex">
                <span className="flex-1">Product</span>
                <span className="w-32 text-center">Quantity</span>
                <span className="w-24 text-right">Total</span>
                <span className="w-9">
                  <span className="sr-only">Remove</span>
                </span>
              </div>

              <ul className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <li key={item.id} className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <Link
                        to={`/products/${item.id}`}
                        tabIndex={-1}
                        aria-hidden="true"
                        className="shrink-0 rounded-lg bg-slate-50 p-2"
                      >
                        <ProductImage product={item} className="h-16 w-16" iconClass="h-8 w-8" />
                      </Link>
                      <div className="min-w-0">
                        <Link
                          to={`/products/${item.id}`}
                          className="line-clamp-2 font-semibold text-slate-800 transition hover:text-indigo-600"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-slate-500">{formatCategory(item.category)}</p>
                        <p className="mt-1 text-sm text-slate-600">{formatPrice(item.price)} each</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="sm:flex sm:w-32 sm:justify-center">
                        <QuantityControl
                          value={item.quantity}
                          max={item.stock}
                          onChange={(quantity) => updateQuantity(item.id, quantity)}
                          label={`Quantity for ${item.name}`}
                        />
                      </div>
                      <p className="w-24 text-right font-semibold text-slate-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="rounded-lg p-2 text-rose-500 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <Link to="/products" className={outlineButton}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Continue Shopping
              </Link>
              <button
                type="button"
                onClick={handleClearCart}
                className="text-sm font-semibold text-rose-600 transition hover:text-rose-700"
              >
                Clear cart
              </button>
            </div>
          </div>

          <aside
            aria-labelledby="summary-title"
            className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24"
          >
            <h2 id="summary-title" className="text-lg font-semibold text-slate-900">
              Order Summary
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">
                  Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </dt>
                <dd className="font-medium text-slate-800">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Shipping</dt>
                <dd className="font-medium text-slate-800">{formatPrice(SHIPPING_FEE)}</dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-slate-400">Free shipping on every order (demo store).</p>
            <button type="button" onClick={handleCheckout} className={`${primaryButton} mt-6 w-full py-3`}>
              Proceed to Checkout
            </button>
            <p className="mt-3 text-center text-xs text-slate-400">
              Demo checkout only. No payment is processed.
            </p>
          </aside>
        </div>
      )}

      {recommended.length > 0 && (
        <section aria-labelledby="recommended-title" className="mt-12">
          <h2 id="recommended-title" className="mb-6 text-xl font-bold text-slate-900">
            You might also like
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Cart
