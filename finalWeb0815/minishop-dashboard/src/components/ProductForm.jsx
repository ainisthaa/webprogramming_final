import { useId, useState } from 'react'
import { CircleCheck, PackagePlus, Plus } from 'lucide-react'
import { formatCategory } from '../utils/format'
import { errorClass, inputClass, labelClass, primaryButton } from '../utils/styles'

const emptyForm = { name: '', category: '', price: '', stock: '' }

function validate(form) {
  const errors = {}
  const price = Number(form.price)
  const stock = Number(form.stock)

  if (form.name.trim() === '') {
    errors.name = 'Product name is required.'
  }
  if (form.category === '') {
    errors.category = 'Please choose a category.'
  }
  if (form.price.trim() === '' || !Number.isFinite(price) || price < 0) {
    errors.price = 'Price must be a number (0 or more).'
  }
  if (form.stock.trim() === '' || !Number.isInteger(stock) || stock < 0) {
    errors.stock = 'Stock must be a whole number (0 or more).'
  }

  return errors
}

function ProductForm({ categories, onAdd }) {
  const id = useId()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validate(form)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const product = onAdd({
      name: form.name.trim(),
      category: form.category,
      price: Math.round(Number(form.price) * 100) / 100,
      stock: Number(form.stock),
    })

    setForm(emptyForm)
    setErrors({})
    setMessage(`"${product.name}" has been added to the product list.`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
          <PackagePlus className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Add New Product</h2>
          <p className="text-sm text-slate-500">The new product will show up in the list right away.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Product Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            maxLength={80}
            placeholder="e.g. Gaming Headset"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            className={inputClass}
          />
          {errors.name && (
            <p id={`${id}-name-error`} className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-category`} className={labelClass}>
            Category
          </label>
          <select
            id={`${id}-category`}
            name="category"
            value={form.category}
            onChange={handleChange}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? `${id}-category-error` : undefined}
            className={inputClass}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {formatCategory(category)}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id={`${id}-category-error`} className={errorClass}>
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-price`} className={labelClass}>
            Price (USD)
          </label>
          <input
            id={`${id}-price`}
            name="price"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={form.price}
            onChange={handleChange}
            placeholder="0.00"
            aria-invalid={Boolean(errors.price)}
            aria-describedby={errors.price ? `${id}-price-error` : undefined}
            className={inputClass}
          />
          {errors.price && (
            <p id={`${id}-price-error`} className={errorClass}>
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-stock`} className={labelClass}>
            Stock
          </label>
          <input
            id={`${id}-stock`}
            name="stock"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            value={form.stock}
            onChange={handleChange}
            placeholder="0"
            aria-invalid={Boolean(errors.stock)}
            aria-describedby={errors.stock ? `${id}-stock-error` : undefined}
            className={inputClass}
          />
          {errors.stock && (
            <p id={`${id}-stock-error`} className={errorClass}>
              {errors.stock}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="status">
          {message && (
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
              <CircleCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              {message}
            </p>
          )}
        </div>
        <button type="submit" className={primaryButton}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Product
        </button>
      </div>
    </form>
  )
}

export default ProductForm
