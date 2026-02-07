import { useState } from 'react'
import { formatDate } from '../utils/formatters'

function ProductCard({ product, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false)

  function handleDelete() {
    if (window.confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
      onDelete(product.id)
    }
  }

  return (
    <div className="product-card">
      {product.imageUrl && !imgError && (
        <div className="product-card-image">
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImgError(true)}
          />
        </div>
      )}

      <div className="product-card-header">
        <h4 className="product-card-name">{product.name}</h4>
        <span className="product-card-category">{product.category}</span>
      </div>

      <p className="product-card-description">{product.description}</p>

      <div className="product-card-footer">
        <span className="product-card-price">
          ${(product.price ?? 0).toFixed(2)}
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
