import { formatDate, formatOrderId, formatPrice } from '../utils/format'

const statusStyles = {
  Delivered: 'bg-emerald-50 text-emerald-700',
  Processing: 'bg-amber-50 text-amber-700',
  Shipped: 'bg-sky-50 text-sky-700',
  Pending: 'bg-orange-50 text-orange-700',
}

function OrdersTable({ orders, showCustomer = true, compact = false }) {
  if (orders.length === 0) {
    return <p className="py-6 text-center text-sm text-slate-500">No orders yet.</p>
  }

  return (
    <div className="relative overflow-x-auto">
      <table className={`w-full text-left text-sm ${compact ? 'min-w-xs' : 'min-w-md'}`}>
        <thead>
          <tr className="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase">
            <th scope="col" className="py-2 pr-4 font-medium">
              Order
            </th>
            {showCustomer && (
              <th scope="col" className="py-2 pr-4 font-medium">
                Customer
              </th>
            )}
            {!compact && (
              <th scope="col" className="py-2 pr-4 font-medium">
                Date
              </th>
            )}
            {!compact && (
              <th scope="col" className="py-2 pr-4 font-medium">
                Items
              </th>
            )}
            <th scope="col" className="py-2 pr-4 font-medium">
              Total
            </th>
            <th scope="col" className="py-2 font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((order) => (
            <tr key={order.id} className="transition hover:bg-slate-50">
              <td className="py-3 pr-4 font-medium text-indigo-600">{formatOrderId(order.id)}</td>
              {showCustomer && <td className="py-3 pr-4 text-slate-700">{order.customer}</td>}
              {!compact && <td className="py-3 pr-4 text-slate-500">{formatDate(order.date)}</td>}
              {!compact && <td className="py-3 pr-4 text-slate-500">{order.items}</td>}
              <td className="py-3 pr-4 font-medium text-slate-800">{formatPrice(order.total)}</td>
              <td className="py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    statusStyles[order.status] || 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersTable
