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
import type { School } from '@/types/database'

const COLLECTION_NAME = 'schools'

// Get school by ID
export async function getSchoolById(schoolId: string): Promise<School | null> {
  try {
    const schoolRef = doc(db, COLLECTION_NAME, schoolId)
    const schoolSnap = await getDoc(schoolRef)

    if (!schoolSnap.exists()) {
      return null
    }

    return {
      id: schoolSnap.id,
      ...schoolSnap.data(),
    } as School
  } catch (error) {
    console.error('Error getting school:', error)
    throw error
  }
}

// Get school by slug
export async function getSchoolBySlug(slug: string): Promise<School | null> {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug), limit(1))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as School
  } catch (error) {
    console.error('Error getting school by slug:', error)
    throw error
  }
}

// Get all schools with optional filters
export async function getSchools(filters?: {
  status?: string
  schoolType?: string
  subscriptionStatus?: string
  limitCount?: number
}): Promise<School[]> {
  try {
    const constraints: QueryConstraint[] = []

    if (filters?.status) {
      constraints.push(where('status', '==', filters.status))
    }
    if (filters?.schoolType) {
      constraints.push(where('schoolType', '==', filters.schoolType))
    }
    if (filters?.subscriptionStatus) {
      constraints.push(where('subscription.status', '==', filters.subscriptionStatus))
    }

    constraints.push(orderBy('createdAt', 'desc'))

    if (filters?.limitCount) {
      constraints.push(limit(filters.limitCount))
    }

    const q = query(collection(db, COLLECTION_NAME), ...constraints)
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as School
    )
  } catch (error) {
    console.error('Error getting schools:', error)
    throw error
  }
}

// Create new school
export async function createSchool(
  schoolData: Omit<School, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const now = Timestamp.now()
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...schoolData,
      createdAt: now,
      updatedAt: now,
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating school:', error)
    throw error
  }
}

// Update school
export async function updateSchool(
  schoolId: string,
  updates: Partial<Omit<School, 'id' | 'createdAt'>>
): Promise<void> {
  try {
    const schoolRef = doc(db, COLLECTION_NAME, schoolId)
    await updateDoc(schoolRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating school:', error)
    throw error
  }
}

// Delete school
export async function deleteSchool(schoolId: string): Promise<void> {
  try {
    const schoolRef = doc(db, COLLECTION_NAME, schoolId)
    await deleteDoc(schoolRef)
  } catch (error) {
    console.error('Error deleting school:', error)
    throw error
  }
}

// Update school quotas
export async function updateSchoolQuotas(
  schoolId: string,
  quotaUpdates: Partial<School['quotas']>
): Promise<void> {
  try {
    const schoolRef = doc(db, COLLECTION_NAME, schoolId)
    const school = await getSchoolById(schoolId)

    if (!school) {
      throw new Error('School not found')
    }

    await updateDoc(schoolRef, {
      quotas: {
        ...school.quotas,
        ...quotaUpdates,
      },
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating school quotas:', error)
    throw error
  }
}

// Update subscription status
export async function updateSubscriptionStatus(
  schoolId: string,
  subscriptionUpdates: Partial<School['subscription']>
): Promise<void> {
  try {
    const schoolRef = doc(db, COLLECTION_NAME, schoolId)
    const school = await getSchoolById(schoolId)

    if (!school) {
      throw new Error('School not found')
    }

    await updateDoc(schoolRef, {
      subscription: {
        ...school.subscription,
        ...subscriptionUpdates,
      },
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating subscription:', error)
    throw error
  }
}
