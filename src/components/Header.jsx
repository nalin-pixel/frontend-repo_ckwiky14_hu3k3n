import { ShoppingCart, Search, Store } from 'lucide-react'

function Header({ cartCount, onSearch, onOpenCart }) {
  return (
    <header className="sticky top-0 z-20 bg-[#0b0b0f]/80 backdrop-blur border-b border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2 text-purple-400 font-extrabold text-xl tracking-tight">
          <Store className="h-6 w-6 text-purple-400" />
          <span>Nova Black</span>
        </div>

        <div className="flex-1 max-w-xl ml-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300/60" />
            <input
              type="text"
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 rounded-md border border-purple-800/60 bg-black/60 text-purple-50 placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/70"
            />
          </div>
        </div>

        <button
          onClick={onOpenCart}
          className="relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white px-3 py-2 rounded-md transition-all shadow-lg shadow-purple-900/30"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-fuchsia-500 text-white text-xs rounded-full h-5 w-5 grid place-items-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
