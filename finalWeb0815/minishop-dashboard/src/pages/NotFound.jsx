import { Link } from 'react-router-dom'
import { primaryButton } from '../utils/styles'

function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center motion-safe:animate-fade-in">
      <p className="text-6xl font-bold text-indigo-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-500">The page you are looking for does not exist.</p>
      <Link to="/" className={`${primaryButton} mt-6`}>
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
