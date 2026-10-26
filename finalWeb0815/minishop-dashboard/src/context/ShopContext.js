import { createContext, useContext } from 'react'

export const ProductContext = createContext(null)
export const CartContext = createContext(null)
export const UserContext = createContext(null)

export function useProducts() {
  return useContext(ProductContext)
}

export function useCart() {
  return useContext(CartContext)
}

export function useUser() {
  return useContext(UserContext)
}
