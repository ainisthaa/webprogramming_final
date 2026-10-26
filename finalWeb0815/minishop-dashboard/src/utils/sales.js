import { getToday } from './format'

export function addDays(date, days) {
  const result = new Date(`${date}T00:00:00Z`)
  result.setUTCDate(result.getUTCDate() + days)
  return result.toISOString().slice(0, 10)
}

function formatDay(date) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}

export function getLatestOrderDate(orders) {
  if (orders.length === 0) return getToday()
  return orders.reduce((latest, order) => (order.date > latest ? order.date : latest), orders[0].date)
}

export function getDailySales(orders, endDate) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(endDate, index - 6)
    const sales = orders
      .filter((order) => order.date === date)
      .reduce((sum, order) => sum + order.total, 0)
    return { date, day: formatDay(date), sales: Math.round(sales * 100) / 100 }
  })
}

export function getPeriodLabel(endDate) {
  return `${formatDay(addDays(endDate, -6))} - ${formatDay(endDate)}`
}
