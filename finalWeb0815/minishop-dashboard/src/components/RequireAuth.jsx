import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '../context/ShopContext'

function RequireAuth({ children }) {
  const { currentUser } = useUser()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default RequireAuth
