import {
  Camera,
  Gem,
  Headphones,
  Keyboard,
  Laptop,
  Monitor,
  Mouse,
  Package,
  Shirt,
  ShoppingBag,
  Usb,
  Webcam,
} from 'lucide-react'

const styles = {
  electronics: { icon: Laptop, color: 'bg-blue-50 text-blue-600' },
  jewelery: { icon: Gem, color: 'bg-orange-50 text-orange-500' },
  "men's clothing": { icon: Shirt, color: 'bg-sky-50 text-sky-600' },
  "women's clothing": { icon: ShoppingBag, color: 'bg-pink-50 text-pink-500' },
  accessories: { icon: Headphones, color: 'bg-emerald-50 text-emerald-600' },
  display: { icon: Monitor, color: 'bg-violet-50 text-violet-600' },
  camera: { icon: Camera, color: 'bg-amber-50 text-amber-600' },
}

const defaultStyle = { icon: Package, color: 'bg-slate-100 text-slate-600' }

const nameIcons = [
  ['mouse', Mouse],
  ['keyboard', Keyboard],
  ['monitor', Monitor],
  ['usb', Usb],
  ['webcam', Webcam],
]

export function getCategoryStyle(category) {
  return styles[category.toLowerCase()] || defaultStyle
}

export function getProductIcon(product) {
  const name = product.name.toLowerCase()
  const match = nameIcons.find(([keyword]) => name.includes(keyword))
  return match ? match[1] : getCategoryStyle(product.category).icon
}
