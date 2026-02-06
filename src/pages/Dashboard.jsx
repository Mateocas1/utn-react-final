import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService'
import '../styles/Dashboard.css'

function Dashboard() {
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)

  const { user } = useAuth()

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts()
  }, [user])

  async function loadProducts() {
    try {
      setLoadingProducts(true)
      const data = await getProducts(user.uid)
      setProducts(data)
    } catch (error) {
      console.error('Error al cargar productos:', error)
    } finally {
      setLoadingProducts(false)
    }
  }

  // Crear o actualizar producto
  async function handleSubmit(productData) {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData)
      setEditingProduct(null)
    } else {
      await createProduct(productData, user.uid)
    }
    await loadProducts()
  }

  // Seleccionar producto para editar
  function handleEdit(product) {
    setEditingProduct(product)
  }

  // Cancelar edición
  function handleCancelEdit() {
    setEditingProduct(null)
  }

  // Eliminar producto
  async function handleDelete(productId) {
    try {
      await deleteProduct(productId)
      await loadProducts()
    } catch (error) {
      console.error('Error al eliminar producto:', error)
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Gestión de productos — {products.length} producto(s)</p>
      </div>

      <div className="dashboard-content">
        <ProductForm
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
          onCancelEdit={handleCancelEdit}
        />

        <ProductList
          products={products}
          loading={loadingProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default Dashboard
