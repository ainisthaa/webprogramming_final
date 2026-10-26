import { Link } from 'react-router-dom'
import { Trash } from 'lucide-react'
import InventorySummary from '../../components/InventorySummary'
import PageHeader from '../../components/PageHeader'
import ProductForm from '../../components/ProductForm'
import ProductImage from '../../components/ProductImage'
import { useProducts } from '../../context/ShopContext'
import { formatCategory, formatPrice } from '../../utils/format'
import { getCategories } from '../../utils/products'

const sourceLabels = { api: 'API', mock: 'Mock', local: 'Added' }

function AdminProducts() {
  const { products, loading, addProduct, deleteProduct } = useProducts()

  function handleDelete(product) {
    if (window.confirm(`Delete "${product.name}" from the product list?`)) {
      deleteProduct(product.id)
    }
  }

  return (
    <>
      <PageHeader title="Products" subtitle="Add or delete products. The summary updates right away." />

      <InventorySummary products={products} />

      <div className="mt-6">
        <ProductForm categories={getCategories(products)} onAdd={addProduct} />
      </div>

      <section
        aria-labelledby="inventory-table-title"
        className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 p-5">
          <h2 id="inventory-table-title" className="font-semibold text-slate-900">
            All Products ({products.length})
          </h2>
          {loading && <span className="text-sm text-slate-500">Loading products...</span>}
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full min-w-2xl text-left text-sm">
            <thead className="border-y border-slate-200 bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">
                  Product
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Category
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Price
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Stock
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Status
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Source
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 rounded-lg bg-slate-50 p-1">
                        <ProductImage product={product} className="h-10 w-10" iconClass="h-5 w-5" />
                      </span>
                      <Link
                        to={`/products/${product.id}`}
                        className="line-clamp-2 max-w-xs font-medium text-slate-800 transition hover:text-indigo-600"
                      >
                        {product.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{formatCategory(product.category)}</td>
                  <td className="px-5 py-3 font-medium text-slate-800">{formatPrice(product.price)}</td>
                  <td className="px-5 py-3 text-slate-600">{product.stock}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${
                        product.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-500">{sourceLabels[product.source]}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      aria-label={`Delete ${product.name}`}
                      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      <Trash className="h-4 w-4" aria-hidden="true" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <p className="p-5 text-center text-sm text-slate-500">No products in the list.</p>
        )}
      </section>
    </>
  )
}

export default AdminProducts
