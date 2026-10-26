import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import ScrollToTop from './components/ScrollToTop'
import CartProvider from './context/CartProvider'
import ProductProvider from './context/ProductProvider'
import UserProvider from './context/UserProvider'
import About from './pages/About'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import Profile from './pages/Profile'

function ProductsPage() {
  const location = useLocation()
  return <Products key={location.search} />
}

function ProductDetailPage() {
  const { id } = useParams()
  return <ProductDetail key={id} />
}

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <UserProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </UserProvider>
      </ProductProvider>
    </CartProvider>
  )
}

export default App
