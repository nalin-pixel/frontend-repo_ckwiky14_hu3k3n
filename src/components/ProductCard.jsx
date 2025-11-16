function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-[#111114] rounded-xl border border-purple-900/40 overflow-hidden shadow-xl shadow-black/40 hover:shadow-purple-900/40 transition-all">
      {product.image ? (
        <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
      ) : (
        <div className="h-48 w-full bg-gradient-to-br from-purple-900/30 to-black grid place-items-center text-purple-300/60">No Image</div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-purple-100 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-purple-300/70 mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-purple-200">${product.price?.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="px-3 py-1.5 text-sm bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-md disabled:opacity-60"
            disabled={!product.in_stock}
          >
            {product.in_stock ? 'Add to cart' : 'Out of stock'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
