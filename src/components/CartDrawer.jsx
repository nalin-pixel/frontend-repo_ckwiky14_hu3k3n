import { X } from 'lucide-react'

function CartDrawer({ open, items, onClose, onCheckout, onInc, onDec, onRemove }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)

  return (
    <div className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-180px)]">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it._id || it.id || it.title} className="flex gap-3 border-b pb-3">
                {it.image ? (
                  <img src={it.image} alt={it.title} className="h-16 w-16 rounded object-cover" />
                ) : (
                  <div className="h-16 w-16 rounded bg-gray-100 grid place-items-center text-xs text-gray-500">No Image</div>
                )}
                <div className="flex-1">
                  <h4 className="font-medium">{it.title}</h4>
                  <p className="text-sm text-gray-500">${it.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => onDec(it)} className="px-2 bg-gray-100 rounded">-</button>
                    <span>{it.quantity}</span>
                    <button onClick={() => onInc(it)} className="px-2 bg-gray-100 rounded">+</button>
                    <button onClick={() => onRemove(it)} className="ml-auto text-red-600 text-sm">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={onCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md disabled:opacity-60"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
