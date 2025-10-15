import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore'
import { db } from '../config'
import type { User, UserRole } from '@/types/database'

const COLLECTION_NAME = 'users'

// Get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return null
    }

    return {
      id: userSnap.id,
      ...userSnap.data(),
    } as User
  } catch (error) {
    console.error('Error getting user:', error)
    throw error
  }
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('email', '==', email), limit(1))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as User
  } catch (error) {
    console.error('Error getting user by email:', error)
    throw error
  }
}

// Get users by school
export async function getUsersBySchool(
  schoolId: string,
  role?: UserRole,
  limitCount?: number
): Promise<User[]> {
  try {
    const constraints: QueryConstraint[] = [where('schoolId', '==', schoolId)]

    if (role) {
      constraints.push(where('role', '==', role))
    }

    constraints.push(orderBy('createdAt', 'desc'))

    if (limitCount) {
      constraints.push(limit(limitCount))
    }

    const q = query(collection(db, COLLECTION_NAME), ...constraints)
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as User
    )
  } catch (error) {
    console.error('Error getting users by school:', error)
    throw error
  }
}

// Get users by role
export async function getUsersByRole(role: UserRole, limitCount?: number): Promise<User[]> {
  try {
    const constraints: QueryConstraint[] = [
      where('role', '==', role),
      orderBy('createdAt', 'desc'),
    ]

    if (limitCount) {
      constraints.push(limit(limitCount))
    }

    const q = query(collection(db, COLLECTION_NAME), ...constraints)
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as User
    )
  } catch (error) {
    console.error('Error getting users by role:', error)
    throw error
  }
}

// Create new user
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const now = Timestamp.now()
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...userData,
      createdAt: now,
      updatedAt: now,
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// Update user
export async function updateUser(
  userId: string,
  updates: Partial<Omit<User, 'id' | 'createdAt'>>
): Promise<void> {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId)
    await updateDoc(userRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

// Delete user
export async function deleteUser(userId: string): Promise<void> {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId)
    await deleteDoc(userRef)
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

// Update last login
export async function updateLastLogin(userId: string): Promise<void> {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId)
    await updateDoc(userRef, {
      lastLogin: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating last login:', error)
    throw error
  }
}

// Update user preferences
export async function updateUserPreferences(
  userId: string,
  preferences: Partial<User['preferences']>
): Promise<void> {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId)
    const user = await getUserById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    await updateDoc(userRef, {
      preferences: {
        ...user.preferences,
        ...preferences,
      },
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating user preferences:', error)
    throw error
  }
}
