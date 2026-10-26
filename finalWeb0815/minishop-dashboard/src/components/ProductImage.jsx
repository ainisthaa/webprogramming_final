import { createElement, useState } from 'react'
import { getProductIcon } from '../utils/categoryStyles'

function ProductImage({ product, className = '', iconClass = 'h-12 w-12' }) {
  const [hasError, setHasError] = useState(false)

  if (!product.image || hasError) {
    return (
      <div
        role="img"
        aria-label={product.name}
        className={`flex items-center justify-center text-slate-400 ${className}`}
      >
        {createElement(getProductIcon(product), { className: iconClass, 'aria-hidden': 'true' })}
      </div>
    )
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`object-contain mix-blend-multiply ${className}`}
    />
  )
}

export default ProductImage
