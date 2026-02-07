import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'
import {
  subscribeToProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService'
import '../styles/Dashboard.css'
import '../styles/breakpoints.css'

function Dashboard() {
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)

  const { user } = useAuth()

  useEffect(() => {
    if (!user?.uid) return

    // setLoadingProducts(true) // Evitar setState directo en el efecto

    const unsubscribe = subscribeToProducts(
      user.uid,
      (updatedProducts) => {
        setProducts(updatedProducts)
        setLoadingProducts(false)
      },
      (error) => {
        console.error('Error al cargar productos:', error)
        setLoadingProducts(false)
      }
    )

    return () => unsubscribe()
  }, [user?.uid])

  async function handleSubmit(productData) {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData)
      setEditingProduct(null)
    } else {
      await createProduct(productData, user.uid)
    }
  }

  function handleEdit(product) {
    setEditingProduct(product)
  }

  function handleCancelEdit() {
    setEditingProduct(null)
  }

  async function handleDelete(productId) {
    try {
      await deleteProduct(productId)
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
