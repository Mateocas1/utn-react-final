import ProductCard from './ProductCard'

function ProductList({ products, loading, onEdit, onDelete }) {
  if (loading) {
    return <p className="product-list-message">Cargando productos...</p>
  }

  if (products.length === 0) {
    return (
      <p className="product-list-message">
        No hay productos cargados. ¡Creá el primero!
      </p>
    )
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ProductList
