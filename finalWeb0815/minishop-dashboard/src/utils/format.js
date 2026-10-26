const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function formatPrice(value) {
  return currency.format(value)
}

export function formatCategory(category) {
  return category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatOrderId(id) {
  return `#${String(id).padStart(6, '0')}`
}

export function getToday() {
  return new Date().toLocaleDateString('en-CA')
}
