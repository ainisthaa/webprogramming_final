import { Boxes, DollarSign, PackageX } from 'lucide-react'
import { formatPrice } from '../utils/format'
import StatCard from './StatCard'

function InventorySummary({ products }) {
  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)
  const outOfStock = products.filter((product) => product.stock === 0).length

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        label="Total Products"
        value={totalProducts}
        note="All products in the system"
        icon={Boxes}
      />
      <StatCard
        label="Total Inventory Value"
        value={formatPrice(totalValue)}
        note="Sum of price × stock (USD)"
        icon={DollarSign}
        tone="emerald"
      />
      <StatCard
        label="Out of Stock"
        value={outOfStock}
        note="Products with stock = 0"
        icon={PackageX}
        tone="rose"
      />
    </div>
  )
}

export default InventorySummary
