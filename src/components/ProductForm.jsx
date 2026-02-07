import { useState, useEffect } from 'react'

const CATEGORIES = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Deportes', 'Otros']

function ProductForm({ onSubmit, editingProduct, onCancelEdit }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || '')
      setDescription(editingProduct.description || '')
      setPrice(editingProduct.price?.toString() || '')
      setCategory(editingProduct.category || '')
      setImageUrl(editingProduct.imageUrl || '')
    } else {
      resetForm()
    }
  }, [editingProduct])

  function resetForm() {
    setName('')
    setDescription('')
    setPrice('')
    setCategory('')
    setImageUrl('')
    setError('')
  }

  function validateForm() {
    if (!name.trim()) {
      setError('El nombre es obligatorio')
      return false
    }
    if (!description.trim()) {
      setError('La descripción es obligatoria')
      return false
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      setError('El precio debe ser un número mayor a 0')
      return false
    }
    if (!category) {
      setError('Seleccioná una categoría')
      return false
    }
    if (imageUrl.trim() && !/^https?:\/\/.+/i.test(imageUrl.trim())) {
      setError('La URL de la imagen debe comenzar con http:// o https://')
      return false
    }
    return true
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    try {
      setLoading(true)
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        category,
        imageUrl: imageUrl.trim(),
      })
      if (!editingProduct) {
        resetForm()
      }
    } catch (err) {
      console.error('Error al guardar producto:', err)
      setError('Error al guardar el producto. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="product-form-card">
      <h3 className="product-form-title">
        {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
      </h3>

      {error && <p className="product-form-error">{error}</p>}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Nombre del producto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            placeholder="Descripción del producto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Imagen URL (opcional)</label>
          <input
            id="imageUrl"
            type="text"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Precio ($)</label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              <option value="">Seleccionar...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="product-form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading
              ? 'Guardando...'
              : editingProduct
              ? 'Actualizar'
              : 'Crear Producto'}
          </button>

          {editingProduct && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
              disabled={loading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ProductForm
