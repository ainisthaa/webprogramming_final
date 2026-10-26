import { Search } from 'lucide-react'
import { formatCategory } from '../utils/format'
import { inputClass, labelClass, outlineButton } from '../utils/styles'

function ProductFilters({ search, category, categories, onSearchChange, onCategoryChange, onClear }) {
  const hasFilter = search !== '' || category !== 'All'

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_14rem_auto] sm:items-end">
      <div>
        <label htmlFor="product-search" className={labelClass}>
          Search by name
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="product-search"
            type="search"
            value={search}
            onChange={onSearchChange}
            placeholder="Type a product name..."
            className={`${inputClass} pl-9`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="category-filter" className={labelClass}>
          Category
        </label>
        <select
          id="category-filter"
          value={category}
          onChange={onCategoryChange}
          className={inputClass}
        >
          <option value="All">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {formatCategory(item)}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={onClear} disabled={!hasFilter} className={outlineButton}>
        Clear filters
      </button>
    </div>
  )
}

export default ProductFilters
