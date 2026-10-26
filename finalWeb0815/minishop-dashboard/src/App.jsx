import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import CartProvider from './context/CartProvider'
import ProductProvider from './context/ProductProvider'
import UserProvider from './context/UserProvider'
import About from './pages/About'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Products from './pages/Products'

function ProductsPage() {
  const location = useLocation()
  return <Products key={location.search} />
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
