import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import { useProducts } from '../../context/ShopContext'
import { getCategoryStyle } from '../../utils/categoryStyles'
import { formatCategory, formatPrice } from '../../utils/format'
import { getCategories } from '../../utils/products'

function AdminCategories() {
  const { products } = useProducts()

  const rows = getCategories(products).map((category) => {
    const items = products.filter((product) => product.category === category)
    return {
      category,
      count: items.length,
      outOfStock: items.filter((product) => product.stock === 0).length,
      value: items.reduce((sum, product) => sum + product.price * product.stock, 0),
    }
  })

  return (
    <>
      <PageHeader title="Categories" subtitle="Number of products and inventory value in each category." />

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-xl text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">
                  Category
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Products
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Out of Stock
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Inventory Value
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  <span className="sr-only">Link</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => {
                const style = getCategoryStyle(row.category)
                return (
                  <tr key={row.category} className="transition hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className={`rounded-lg p-2 ${style.color}`}>
                          <style.icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="font-medium text-slate-800">{formatCategory(row.category)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{row.count}</td>
                    <td className="px-5 py-3 text-slate-600">{row.outOfStock}</td>
                    <td className="px-5 py-3 font-medium text-slate-800">{formatPrice(row.value)}</td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        to={`/products?category=${encodeURIComponent(row.category)}`}
                        className="text-sm font-semibold whitespace-nowrap text-indigo-600 transition hover:text-indigo-700"
                      >
                        View products
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default AdminCategories
