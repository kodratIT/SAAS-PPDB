import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { User } from '@/types/database'

const COLLECTION_NAME = 'users'

export async function getUser(userId: string): Promise<User | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, userId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return null
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as User
  } catch (error) {
    console.error('Error getting user:', error)
    throw error
  }
}

export async function createUser(
  userId: string,
  data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTION_NAME, userId), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export async function updateUser(
  userId: string,
  data: Partial<Omit<User, 'id' | 'createdAt'>>
): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, userId), {
      ...data,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export async function updateLastLogin(userId: string): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, userId), {
      lastLogin: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating last login:', error)
    throw error
  }
}
