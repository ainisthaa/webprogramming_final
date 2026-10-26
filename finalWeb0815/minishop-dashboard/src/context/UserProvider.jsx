import { useEffect, useState } from 'react'
import { demoOrders, demoUsers } from '../data/demoData'
import { getToday } from '../utils/format'
import { loadData, saveData } from '../utils/storage'
import { UserContext } from './ShopContext'

const USERS_KEY = 'minishop_users'
const SESSION_KEY = 'minishop_session'
const ORDERS_KEY = 'minishop_orders'
const DEMO_USER_ID = 'user-1'

function isUserList(data) {
  return (
    Array.isArray(data) &&
    data.every(
      (user) =>
        user &&
        typeof user.id === 'string' &&
        typeof user.name === 'string' &&
        typeof user.email === 'string' &&
        typeof user.password === 'string',
    )
  )
}

function isOrderList(data) {
  return (
    Array.isArray(data) &&
    data.every(
      (order) =>
        order &&
        Number.isInteger(order.id) &&
        Number.isFinite(order.total) &&
        typeof order.customer === 'string' &&
        typeof order.status === 'string',
    )
  )
}

function UserProvider({ children }) {
  const [users, setUsers] = useState(() => loadData(USERS_KEY, demoUsers, isUserList))
  const [orders, setOrders] = useState(() => loadData(ORDERS_KEY, demoOrders, isOrderList))
  const [currentUserId, setCurrentUserId] = useState(() =>
    loadData(SESSION_KEY, null, (id) => id === null || typeof id === 'string'),
  )

  useEffect(() => {
    saveData(USERS_KEY, users)
  }, [users])

  useEffect(() => {
    saveData(ORDERS_KEY, orders)
  }, [orders])

  useEffect(() => {
    saveData(SESSION_KEY, currentUserId)
  }, [currentUserId])

  const currentUser = users.find((user) => user.id === currentUserId) || null

  function findByEmail(email) {
    return users.find((user) => user.email.toLowerCase() === email.trim().toLowerCase())
  }

  function login(email, password) {
    const user = findByEmail(email)
    if (!user || user.password !== password) {
      return 'Email or password is incorrect.'
    }
    setCurrentUserId(user.id)
    return ''
  }

  function loginDemo() {
    if (!users.some((user) => user.id === DEMO_USER_ID)) {
      return 'Demo account not found. Reset demo data in Admin > Settings.'
    }
    setCurrentUserId(DEMO_USER_ID)
    return ''
  }

  function register({ name, email, password }) {
    if (findByEmail(email)) {
      return 'This email is already registered.'
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      password,
      phone: '',
      bio: '',
    }
    setUsers((current) => [...current, newUser])
    setCurrentUserId(newUser.id)
    return ''
  }

  function logout() {
    setCurrentUserId(null)
  }

  function updateProfile(data) {
    const owner = findByEmail(data.email)
    if (owner && owner.id !== currentUserId) {
      return 'This email is already used by another account.'
    }
    setUsers((current) =>
      current.map((user) => (user.id === currentUserId ? { ...user, ...data } : user)),
    )
    return ''
  }

  function placeOrder(items, total) {
    const nextId = orders.reduce((max, order) => Math.max(max, order.id), 0) + 1
    const order = {
      id: nextId,
      userId: currentUser ? currentUser.id : null,
      customer: currentUser ? currentUser.name : 'Guest',
      date: getToday(),
      items: items.reduce((sum, item) => sum + item.quantity, 0),
      total,
      status: 'Processing',
    }
    setOrders((current) => [order, ...current])
    return order
  }

  function resetUserData() {
    setUsers(demoUsers)
    setOrders(demoOrders)
    setCurrentUserId(null)
  }

  const value = {
    users,
    orders,
    currentUser,
    login,
    loginDemo,
    register,
    logout,
    updateProfile,
    placeOrder,
    resetUserData,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
