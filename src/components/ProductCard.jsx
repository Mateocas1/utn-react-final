import '../styles/Dashboard.css'

function ProductCard({ product, onEdit, onDelete }) {
  function handleDelete() {
    if (window.confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
      onDelete(product.id)
    }
  }

  function formatDate(timestamp) {
    if (!timestamp) return 'Sin fecha'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className="product-card">
      <div className="product-card-header">
        <h4 className="product-card-name">{product.name}</h4>
        <span className="product-card-category">{product.category}</span>
      </div>

      <p className="product-card-description">{product.description}</p>

      <div className="product-card-footer">
        <span className="product-card-price">
          ${product.price.toFixed(2)}
        </span>
        <span className="product-card-date">
          {formatDate(product.createdAt)}
        </span>
      </div>

      <div className="product-card-actions">
        <button className="btn btn-edit" onClick={() => onEdit(product)}>
          Editar
        </button>
        <button className="btn btn-delete" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default ProductCard
