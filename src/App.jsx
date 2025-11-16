import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE}/products`)
        const data = await res.json()
        setProducts(data)
        setFiltered(data)
      } catch (e) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    if (!query) {
      setFiltered(products)
    } else {
      const q = query.toLowerCase()
      setFiltered(products.filter(p => p.title.toLowerCase().includes(q)))
    }
  }, [query, products])

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => (p.id || p._id) === (product.id || product._id))
      if (existing) {
        return prev.map((p) => (p.id === existing.id ? { ...p, quantity: p.quantity + 1 } : p))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const inc = (item) => {
    setCart((prev) => prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)))
  }
  const dec = (item) => {
    setCart((prev) => prev.map((p) => (p.id === item.id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p)))
  }
  const removeItem = (item) => {
    setCart((prev) => prev.filter((p) => p.id !== item.id))
  }

  const checkout = async () => {
    try {
      const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
      const tax = +(subtotal * 0.07).toFixed(2)
      const total = +(subtotal + tax).toFixed(2)

      const order = {
        customer_name: 'Guest',
        customer_email: 'guest@example.com',
        shipping_address: 'N/A',
        items: cart.map((i) => ({
          product_id: i.id,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
          image: i.image || null,
        })),
        subtotal,
        tax,
        total,
        status: 'pending',
      }

      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })

      if (!res.ok) throw new Error('Checkout failed')
      setCart([])
      alert('Order placed successfully!')
      setCartOpen(false)
    } catch (e) {
      alert('Checkout failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Header cartCount={cartCount} onSearch={setQuery} onOpenCart={() => setCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <section className="mb-6 bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
          <h2 className="text-2xl font-bold mb-2 text-blue-700">Welcome to Blue Shop</h2>
          <p className="text-gray-600">Discover products and add them to your cart. This is a simple demo shop with a working backend.</p>
        </section>

        {loading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onCheckout={checkout}
        onInc={inc}
        onDec={dec}
        onRemove={removeItem}
      />
    </div>
  )
}

export default App
