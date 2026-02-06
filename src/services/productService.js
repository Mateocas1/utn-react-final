import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION_NAME = 'productos'

// Obtener todos los productos del usuario autenticado
export async function getProducts(uid) {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('uid', '==', uid),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

// Crear un nuevo producto
export async function createProduct(productData, uid) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...productData,
    uid,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

// Actualizar un producto existente
export async function updateProduct(productId, productData) {
  const productRef = doc(db, COLLECTION_NAME, productId)
  await updateDoc(productRef, {
    ...productData,
    updatedAt: serverTimestamp(),
  })
}

// Eliminar un producto
export async function deleteProduct(productId) {
  const productRef = doc(db, COLLECTION_NAME, productId)
  await deleteDoc(productRef)
}
