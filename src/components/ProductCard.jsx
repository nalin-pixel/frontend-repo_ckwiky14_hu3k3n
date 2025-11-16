function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {product.image ? (
        <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
      ) : (
        <div className="h-48 w-full bg-gray-100 grid place-items-center text-gray-400">No Image</div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold">${product.price?.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
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
