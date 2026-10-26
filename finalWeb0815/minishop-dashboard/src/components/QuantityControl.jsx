import { Minus, Plus } from 'lucide-react'

const buttonClass =
  'p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent'

function QuantityControl({ value, max, onChange, label = 'Quantity', disabled = false }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-lg border border-slate-300 bg-white"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= 1}
        aria-label="Decrease quantity"
        className={`${buttonClass} rounded-l-lg`}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span aria-live="polite" className="w-10 text-center text-sm font-semibold text-slate-800">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        className={`${buttonClass} rounded-r-lg`}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export default QuantityControl
