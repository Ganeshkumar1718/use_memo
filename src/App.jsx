import { useState, useMemo } from "react"

const App = () => {
  const [search, setSearch] = useState("")
  const [productTheme, setProductTheme] = useState("light")
  const [cartTheme, setCartTheme] = useState("light")
  const [studentTheme, setStudentTheme] = useState("light")

  const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Mobile" },
    { id: 3, name: "Keyboard" },
    { id: 4, name: "Mouse" },
    { id: 5, name: "Monitor" },
    { id: 6, name: "Headphone" }
  ]

  const cart = [
    { id: 1, name: "Laptop", price: 50000, quantity: 1 },
    { id: 2, name: "Mouse", price: 1000, quantity: 2 },
    { id: 3, name: "Keyboard", price: 1500, quantity: 1 }
  ]

  const students = [
    { id: 1, name: "Rahul", placed: true },
    { id: 2, name: "Ganesh", placed: false },
    { id: 3, name: "Kumar", placed: true },
    { id: 4, name: "Arun", placed: false },
    { id: 5, name: "Vijay", placed: true }
  ]

  const filteredProducts = useMemo(() => {
    console.log("Filtering Products")
    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const total = useMemo(() => {
    console.log("Calculating Cart Total")
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cart])

  const totalStudents = useMemo(() => {
    console.log("Calculating Total Students")
    return students.length
  }, [students])

  const placedStudents = useMemo(() => {
    console.log("Calculating Placed Students")
    return students.filter(student => student.placed).length
  }, [students])

  const unplacedStudents = useMemo(() => {
    console.log("Calculating Unplaced Students")
    return students.filter(student => !student.placed).length
  }, [students])

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className={`rounded-3xl border p-6 shadow-sm transition-colors ${productTheme === "light" ? "bg-white text-slate-900 border-slate-200" : "bg-slate-900 text-slate-100 border-slate-700"}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Task 1 - Product Search</h2>
              <p className="mt-1 text-sm text-slate-500">Search products and memoize the filtered result.</p>
            </div>
            <button className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500" onClick={() => setProductTheme(productTheme === "light" ? "dark" : "light")}>Change Theme</button>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              type="text"
              placeholder="Search Product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">{filteredProducts.length} items found</span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(product => (
              <div key={product.id} className="rounded-2xl bg-slate-50 p-4 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-800 dark:text-slate-100">
                <h3 className="text-lg font-medium">{product.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className={`rounded-3xl border p-6 shadow-sm transition-colors ${cartTheme === "light" ? "bg-white text-slate-900 border-slate-200" : "bg-slate-900 text-slate-100 border-slate-700"}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Task 2 - Shopping Cart</h2>
              <p className="mt-1 text-sm text-slate-500">Cart total is memoized by dependency on the cart array.</p>
            </div>
            <button className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500" onClick={() => setCartTheme(cartTheme === "light" ? "dark" : "light")}>Change Theme</button>
          </div>

          <div className="mt-6 space-y-3">
            {cart.map(item => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">₹{item.price} × {item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-sky-50 p-4 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100">
            <h2 className="text-xl font-semibold">Total: ₹{total}</h2>
          </div>
        </section>

        <section className={`rounded-3xl border p-6 shadow-sm transition-colors ${studentTheme === "light" ? "bg-white text-slate-900 border-slate-200" : "bg-slate-900 text-slate-100 border-slate-700"}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Task 3 - Student Dashboard</h2>
              <p className="mt-1 text-sm text-slate-500">Student counts are memoized using stable arrays.</p>
            </div>
            <button className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500" onClick={() => setStudentTheme(studentTheme === "light" ? "dark" : "light")}>Change Theme</button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Students</p>
              <p className="mt-2 text-3xl font-semibold">{totalStudents}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100">
              <p className="text-sm text-slate-500 dark:text-slate-400">Placed Students</p>
              <p className="mt-2 text-3xl font-semibold">{placedStudents}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100">
              <p className="text-sm text-slate-500 dark:text-slate-400">Unplaced Students</p>
              <p className="mt-2 text-3xl font-semibold">{unplacedStudents}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App