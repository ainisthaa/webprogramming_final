import { useEffect, useState } from 'react'
import { loadData, saveData } from '../utils/storage'
import { CartContext } from './ShopContext'

const CART_KEY = 'minishop_cart'

function isValidCartItem(item) {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.category === 'string' &&
    Number.isFinite(item.price) &&
    Number.isInteger(item.stock) &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0 &&
    item.quantity <= item.stock
  )
}

function loadCart() {
  return loadData(CART_KEY, [], (data) => Array.isArray(data) && data.every(isValidCartItem))
}

function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart)

  useEffect(() => {
    saveData(CART_KEY, cart)
  }, [cart])

  function addToCart(product, quantity = 1) {
    if (product.stock <= 0) return

    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item,
        )
      }

      const newItem = {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        stock: product.stock,
        quantity: Math.min(quantity, product.stock),
      }
      return [...current, newItem]
    })
  }

  function updateQuantity(id, quantity) {
    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.stock) } : item,
      ),
    )
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  function getQuantity(id) {
    const item = cart.find((cartItem) => cartItem.id === id)
    return item ? item.quantity : 0
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const value = {
    cart,
    cartCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
