import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatPrice } from '../utils/format'

function SalesChart({ data }) {
  const summary = data.map((item) => `${item.day} ${formatPrice(item.sales)}`).join(', ')

  return (
    <figure>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip formatter={(value) => [formatPrice(value), 'Sales']} cursor={{ fill: '#eef2ff' }} />
            <Bar dataKey="sales" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="sr-only">Daily sales: {summary}</figcaption>
    </figure>
  )
}

export default SalesChart
