import { X } from 'lucide-react'

function CartDrawer({ open, items, onClose, onCheckout, onInc, onDec, onRemove }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const tax = +(subtotal * 0.07).toFixed(2)
  const total = +(subtotal + tax).toFixed(2)

  return (
    <div className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[440px] bg-[#0b0b0f] border-l border-purple-900/40 shadow-2xl shadow-black/60 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-purple-900/40">
          <h2 className="text-lg font-semibold text-purple-100">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-purple-900/30 rounded-full text-purple-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
          {items.length === 0 ? (
            <p className="text-purple-300/70">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it._id || it.id || it.title} className="flex gap-3 border-b border-purple-900/40 pb-3">
                {it.image ? (
                  <img src={it.image} alt={it.title} className="h-16 w-16 rounded object-cover" />
                ) : (
                  <div className="h-16 w-16 rounded bg-gradient-to-br from-purple-900/30 to-black grid place-items-center text-xs text-purple-300/70">No Image</div>
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-purple-100">{it.title}</h4>
                  <p className="text-sm text-purple-300/70">${it.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => onDec(it)} className="px-2 bg-purple-900/40 text-purple-100 rounded">-</button>
                    <span className="text-purple-100">{it.quantity}</span>
                    <button onClick={() => onInc(it)} className="px-2 bg-purple-900/40 text-purple-100 rounded">+</button>
                    <button onClick={() => onRemove(it)} className="ml-auto text-fuchsia-400 text-sm hover:text-fuchsia-300">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-purple-900/40 space-y-2">
          <div className="flex justify-between text-purple-300/80">
            <span>Subtotal</span>
            <span className="font-semibold text-purple-100">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-purple-300/80">
            <span>Tax</span>
            <span className="font-semibold text-purple-100">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-purple-900/40 text-purple-200">
            <span>Total</span>
            <span className="font-bold text-purple-50">${total.toFixed(2)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={onCheckout}
            className="mt-2 w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white py-2 rounded-md disabled:opacity-60"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
