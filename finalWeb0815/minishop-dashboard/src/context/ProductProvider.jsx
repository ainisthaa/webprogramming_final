import { useEffect, useMemo, useState } from 'react'
import mockProducts from '../data/mockProducts'
import { loadData, saveData } from '../utils/storage'
import {
  API_URL,
  fromMock,
  isValidProduct,
  normalizeSavedProduct,
  parseApiProducts,
} from '../utils/products'
import { ProductContext, useCart } from './ShopContext'

const PRODUCTS_KEY = 'minishop_products'
const DELETED_KEY = 'minishop_deleted_ids'
const STOCK_KEY = 'minishop_api_stock'

const initialProducts = mockProducts.map(fromMock)

function loadLocalProducts() {
  const saved = loadData(
    PRODUCTS_KEY,
    null,
    (data) => Array.isArray(data) && data.every(isValidProduct),
  )
  return saved ? saved.map(normalizeSavedProduct) : initialProducts
}

function loadDeletedIds() {
  return loadData(
    DELETED_KEY,
    [],
    (data) => Array.isArray(data) && data.every((id) => typeof id === 'string'),
  )
}

function loadApiStock() {
  return loadData(
    STOCK_KEY,
    {},
    (data) =>
      typeof data === 'object' &&
      data !== null &&
      !Array.isArray(data) &&
      Object.values(data).every((stock) => Number.isInteger(stock) && stock >= 0),
  )
}

function ProductProvider({ children }) {
  const { removeFromCart } = useCart()
  const [localProducts, setLocalProducts] = useState(loadLocalProducts)
  const [apiProducts, setApiProducts] = useState([])
  const [deletedIds, setDeletedIds] = useState(loadDeletedIds)
  const [apiStock, setApiStock] = useState(loadApiStock)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let ignore = false

    async function fetchProducts() {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`)
        }

        const data = await response.json()
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('API returned no products')
        }

        const items = parseApiProducts(data)
        if (items.length === 0) {
          throw new Error('API returned invalid product data')
        }

        if (!ignore) setApiProducts(items)
      } catch (err) {
        if (!ignore) {
          setApiProducts([])
          setError(err.message || 'Unknown error')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchProducts()

    return () => {
      ignore = true
    }
  }, [reloadCount])

  useEffect(() => {
    saveData(PRODUCTS_KEY, localProducts)
  }, [localProducts])

  useEffect(() => {
    saveData(DELETED_KEY, deletedIds)
  }, [deletedIds])

  useEffect(() => {
    saveData(STOCK_KEY, apiStock)
  }, [apiStock])

  const products = useMemo(() => {
    const visibleApiProducts = apiProducts
      .filter((product) => !deletedIds.includes(product.id))
      .map((product) =>
        product.id in apiStock ? { ...product, stock: apiStock[product.id] } : product,
      )
    return [...localProducts, ...visibleApiProducts]
  }, [localProducts, apiProducts, deletedIds, apiStock])

  function retryFetch() {
    setLoading(true)
    setError('')
    setReloadCount((count) => count + 1)
  }

  function addProduct(data) {
    const newProduct = {
      id: `local-${Date.now()}`,
      name: data.name,
      category: data.category,
      price: data.price,
      stock: data.stock,
      description: '',
      image: '',
      rating: { rate: 0, count: 0 },
      source: 'local',
    }
    setLocalProducts((current) => [newProduct, ...current])
    return newProduct
  }

  function deleteProduct(id) {
    if (id.startsWith('api-')) {
      setDeletedIds((current) => (current.includes(id) ? current : [...current, id]))
    } else {
      setLocalProducts((current) => current.filter((product) => product.id !== id))
    }
    removeFromCart(id)
  }

  function reduceStock(items) {
    const newStock = {}
    items.forEach((item) => {
      const product = products.find((p) => p.id === item.id)
      const currentStock = product ? product.stock : item.stock
      newStock[item.id] = Math.max(currentStock - item.quantity, 0)
    })

    setLocalProducts((current) =>
      current.map((product) =>
        product.id in newStock ? { ...product, stock: newStock[product.id] } : product,
      ),
    )

    const apiChanges = {}
    Object.keys(newStock).forEach((id) => {
      if (id.startsWith('api-')) apiChanges[id] = newStock[id]
    })
    setApiStock((current) => ({ ...current, ...apiChanges }))
  }

  function resetProducts() {
    setLocalProducts(initialProducts)
    setDeletedIds([])
    setApiStock({})
  }

  const value = {
    products,
    loading,
    error,
    retryFetch,
    addProduct,
    deleteProduct,
    reduceStock,
    resetProducts,
  }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export default ProductProvider
