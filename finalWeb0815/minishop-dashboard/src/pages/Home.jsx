import { Link } from 'react-router-dom'
import { ArrowRight, Backpack, Headphones, Watch } from 'lucide-react'
import ApiStatus from '../components/ApiStatus'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'
import { useProducts } from '../context/ShopContext'
import { getCategoryStyle } from '../utils/categoryStyles'
import { formatCategory } from '../utils/format'

const heroIcons = [Backpack, Headphones, Watch]

function getFeaturedProducts(products) {
  const featured = []
  const usedCategories = []

  products.forEach((product) => {
    if (product.image && !usedCategories.includes(product.category)) {
      usedCategories.push(product.category)
      featured.push(product)
    }
  })

  const others = products.filter((product) => !featured.includes(product))
  return [...featured, ...others].slice(0, 4)
}

function Home() {
  const { products, loading } = useProducts()
  const featured = getFeaturedProducts(products)
  const heroProducts = products.filter((product) => product.image).slice(0, 3)
  const categories = [...new Set(products.map((product) => product.category))]

  return (
    <div className="motion-safe:animate-fade-in">
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-700 via-indigo-600 to-violet-500 px-6 py-12 text-white shadow-lg sm:px-12 lg:py-16">
          <div
            className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold tracking-widest text-indigo-200 uppercase">
                MiniShop Dashboard
              </p>
              <h1 className="mt-3 text-4xl leading-tight font-bold sm:text-5xl">Welcome to MiniShop</h1>
              <p className="mt-4 max-w-md text-lg text-indigo-100">
                Discover the best products with great prices and fast delivery.
              </p>
              <Link
                to="/products"
                className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-md transition hover:bg-indigo-50"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>

            <div className="hidden items-end justify-center gap-4 sm:flex">
              {heroProducts.length === 3
                ? heroProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`h-40 w-32 rounded-2xl bg-white p-3 shadow-xl transition duration-300 hover:-translate-y-2 lg:h-48 lg:w-40 ${
                        index === 1 ? 'mb-8' : ''
                      }`}
                    >
                      <ProductImage product={product} className="h-full w-full" />
                    </div>
                  ))
                : heroIcons.map((Icon, index) => (
                    <div
                      key={index}
                      className={`flex h-40 w-32 items-center justify-center rounded-2xl bg-white/15 shadow-xl backdrop-blur lg:h-48 lg:w-40 ${
                        index === 1 ? 'mb-8' : ''
                      }`}
                    >
                      <Icon className="h-14 w-14 text-white" aria-hidden="true" />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-title" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 id="featured-title" className="text-2xl font-bold text-slate-900">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            View All
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <ApiStatus />

        {!loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="categories-title" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 id="categories-title" className="mb-6 text-2xl font-bold text-slate-900">
          Shop by Category
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {categories.map((category) => {
            const { icon: Icon, color } = getCategoryStyle(category)
            const count = products.filter((product) => product.category === category).length

            return (
              <li key={category}>
                <Link
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className={`flex h-full flex-col items-center gap-2 rounded-xl border border-transparent px-3 py-5 text-center transition duration-200 hover:-translate-y-1 hover:border-slate-200 hover:shadow-md ${color}`}
                >
                  <Icon className="h-8 w-8" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-700">{formatCategory(category)}</span>
                  <span className="text-xs text-slate-500">
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export default Home
