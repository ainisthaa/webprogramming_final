import PageHeader from '../../components/PageHeader'
import { useUser } from '../../context/ShopContext'

function AdminUsers() {
  const { users, orders, currentUser } = useUser()

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Mock accounts saved in this browser (localStorage). Passwords are not shown."
      />

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-xl text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">
                  Name
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Email
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Phone
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Orders
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-800">
                    {user.name}
                    {currentUser && currentUser.id === user.id && (
                      <span className="ml-2 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                        Signed in
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{user.email}</td>
                  <td className="px-5 py-3 text-slate-600">{user.phone || '-'}</td>
                  <td className="px-5 py-3 text-slate-600">
                    {orders.filter((order) => order.userId === user.id).length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default AdminUsers
