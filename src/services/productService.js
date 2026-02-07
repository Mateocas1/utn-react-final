import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION_NAME = 'productos'

// Escuchar productos en tiempo real del usuario autenticado
export function subscribeToProducts(uid, callback, onError) {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('uid', '==', uid),
    orderBy('createdAt', 'desc')
  )

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      callback(products)
    },
    (error) => {
      console.error('Error escuchando productos:', error)
      if (onError) onError(error)
    }
  )

  return unsubscribe
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
