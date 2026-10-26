import OrdersTable from '../../components/OrdersTable'
import PageHeader from '../../components/PageHeader'
import { useUser } from '../../context/ShopContext'

function AdminOrders() {
  const { orders } = useUser()

  return (
    <>
      <PageHeader title="Orders" subtitle="Sample orders and orders placed with the demo checkout." />

      <section aria-labelledby="orders-title" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 id="orders-title" className="font-semibold text-slate-900">
            All Orders ({orders.length})
          </h2>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
            Demo data
          </span>
        </div>
        <OrdersTable orders={orders} />
      </section>
    </>
  )
}

export default AdminOrders
