export const demoUsers = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'demo1234',
    phone: '081-234-5678',
    bio: 'Frontend Developer | Lover of Technology and Design',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'demo1234',
    phone: '082-345-6789',
    bio: '',
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'demo1234',
    phone: '083-456-7890',
    bio: '',
  },
  {
    id: 'user-4',
    name: 'Sarah Lee',
    email: 'sarah@example.com',
    password: 'demo1234',
    phone: '084-567-8901',
    bio: '',
  },
  {
    id: 'user-5',
    name: 'David Kim',
    email: 'david@example.com',
    password: 'demo1234',
    phone: '085-678-9012',
    bio: '',
  },
]

export const demoOrders = [
  { id: 124, userId: 'user-1', customer: 'John Doe', date: '2026-10-24', items: 1, total: 109.95, status: 'Processing' },
  { id: 123, userId: 'user-2', customer: 'Jane Smith', date: '2026-10-22', items: 2, total: 79.99, status: 'Processing' },
  { id: 122, userId: 'user-3', customer: 'Mike Johnson', date: '2026-10-20', items: 1, total: 48, status: 'Shipped' },
  { id: 121, userId: 'user-4', customer: 'Sarah Lee', date: '2026-10-18', items: 3, total: 115, status: 'Pending' },
  { id: 120, userId: 'user-5', customer: 'David Kim', date: '2026-10-15', items: 2, total: 69.99, status: 'Delivered' },
  { id: 119, userId: 'user-1', customer: 'John Doe', date: '2026-10-10', items: 2, total: 79.99, status: 'Delivered' },
  { id: 118, userId: 'user-1', customer: 'John Doe', date: '2026-09-28', items: 1, total: 48, status: 'Delivered' },
]

export const weeklySales = {
  thisWeek: [
    { day: 'Mon', sales: 240 },
    { day: 'Tue', sales: 310 },
    { day: 'Wed', sales: 280 },
    { day: 'Thu', sales: 420 },
    { day: 'Fri', sales: 390 },
    { day: 'Sat', sales: 560 },
    { day: 'Sun', sales: 720 },
  ],
  lastWeek: [
    { day: 'Mon', sales: 310 },
    { day: 'Tue', sales: 260 },
    { day: 'Wed', sales: 350 },
    { day: 'Thu', sales: 300 },
    { day: 'Fri', sales: 450 },
    { day: 'Sat', sales: 410 },
    { day: 'Sun', sales: 520 },
  ],
}
