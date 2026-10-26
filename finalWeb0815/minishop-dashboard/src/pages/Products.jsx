import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import ApiStatus from '../components/ApiStatus'
import InventorySummary from '../components/InventorySummary'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import ProductForm from '../components/ProductForm'
import { useProducts } from '../context/ShopContext'
import { getCategories } from '../utils/products'
import { outlineButton } from '../utils/styles'

function Products() {
  const { products, loading, addProduct, deleteProduct } = useProducts()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')

  const categories = getCategories(products)
  if (category !== 'All' && !categories.includes(category)) {
    categories.push(category)
  }

  const filteredProducts = products.filter((product) => {
    const matchName = product.name.toLowerCase().includes(search.trim().toLowerCase())
    const matchCategory = category === 'All' || product.category === category
    return matchName && matchCategory
  })

  function handleSearchChange(event) {
    setSearch(event.target.value)
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value)
  }

  function clearFilters() {
    setSearch('')
    setCategory('All')
  }

  function handleAdd(data) {
    const newProduct = addProduct(data)
    clearFilters()
    return newProduct
  }

  function handleDelete(product) {
    if (window.confirm(`Delete "${product.name}" from the product list?`)) {
      deleteProduct(product.id)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 motion-safe:animate-fade-in sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">MiniShop Dashboard</h1>
        <p className="mt-1 text-slate-500">
          Browse, search and manage all products in the store. All prices are in USD.
        </p>
      </div>

      <section aria-label="Product summary" className="mb-8">
        <InventorySummary products={products} />
      </section>

      <section aria-label="Add product" className="mb-8">
        <ProductForm categories={categories} onAdd={handleAdd} />
      </section>

      <section aria-labelledby="product-list-title">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <h2 id="product-list-title" className="text-xl font-semibold text-slate-900">
            Product List
          </h2>
          {!loading && (
            <p className="text-sm text-slate-500">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          )}
        </div>

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <ProductFilters
            search={search}
            category={category}
            categories={categories}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onClear={clearFilters}
          />
        </div>

        <ApiStatus />

        {!loading &&
          (filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showStock onDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center">
              <SearchX className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
              {products.length === 0 ? (
                <>
                  <p className="mt-3 font-semibold text-slate-700">No products in the list</p>
                  <p className="mt-1 text-sm text-slate-500">Use the form above to add a new product.</p>
                </>
              ) : (
                <>
                  <p className="mt-3 font-semibold text-slate-700">No products found</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try another name or choose a different category.
                  </p>
                  <button type="button" onClick={clearFilters} className={`${outlineButton} mt-4`}>
                    Clear filters
                  </button>
                </>
              )}
            </div>
          ))}

        <p className="mt-6 text-xs text-slate-400">
          Note: the Fake Store API does not have a stock field, so stock numbers for API products are
          simulated (demo inventory).
        </p>
      </section>
    </div>
  )
}

export default Products
