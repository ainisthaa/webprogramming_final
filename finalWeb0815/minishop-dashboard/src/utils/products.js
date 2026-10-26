export const API_URL = 'https://fakestoreapi.com/products'

export const BASE_CATEGORIES = ['Accessories', 'Display', 'Camera']

export function getDemoStock(id) {
  if (id % 7 === 0) return 0
  return ((id * 13) % 20) + 1
}

export function fromApi(item) {
  return {
    id: `api-${item.id}`,
    name: item.title,
    category: String(item.category || 'other'),
    price: Number(item.price) || 0,
    stock: getDemoStock(Number(item.id) || 0),
    description: item.description || '',
    image: item.image || '',
    rating: {
      rate: Number(item.rating?.rate) || 0,
      count: Number(item.rating?.count) || 0,
    },
    source: 'api',
  }
}

export function parseApiProducts(data) {
  const seen = new Set()
  return data
    .filter((item) => {
      if (!item || item.id == null || typeof item.title !== 'string' || seen.has(item.id)) {
        return false
      }
      seen.add(item.id)
      return true
    })
    .map(fromApi)
}

export function fromMock(item) {
  return {
    ...item,
    id: `mock-${item.id}`,
    description: '',
    image: '',
    rating: { rate: 0, count: 0 },
    source: 'mock',
  }
}

export function isValidProduct(product) {
  return (
    typeof product === 'object' &&
    product !== null &&
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    product.name.trim() !== '' &&
    typeof product.category === 'string' &&
    Number.isFinite(product.price) &&
    product.price >= 0 &&
    Number.isInteger(product.stock) &&
    product.stock >= 0
  )
}

export function normalizeSavedProduct(product) {
  return {
    ...product,
    description: typeof product.description === 'string' ? product.description : '',
    image: typeof product.image === 'string' ? product.image : '',
    rating: {
      rate: Number(product.rating?.rate) || 0,
      count: Number(product.rating?.count) || 0,
    },
    source: product.source === 'mock' ? 'mock' : 'local',
  }
}

export function getCategories(products) {
  return [...new Set([...BASE_CATEGORIES, ...products.map((product) => product.category)])]
}
