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
import type { PPDBPeriod, PeriodStatus } from '@/types/database'

const COLLECTION_NAME = 'ppdb_periods'

// Get period by ID
export async function getPeriodById(periodId: string): Promise<PPDBPeriod | null> {
  try {
    const periodRef = doc(db, COLLECTION_NAME, periodId)
    const periodSnap = await getDoc(periodRef)

    if (!periodSnap.exists()) {
      return null
    }

    return {
      id: periodSnap.id,
      ...periodSnap.data(),
    } as PPDBPeriod
  } catch (error) {
    console.error('Error getting period:', error)
    throw error
  }
}

// Get periods by school
export async function getPeriodsBySchool(
  schoolId: string,
  status?: PeriodStatus,
  limitCount?: number
): Promise<PPDBPeriod[]> {
  try {
    const constraints: QueryConstraint[] = [where('schoolId', '==', schoolId)]

    if (status) {
      constraints.push(where('status', '==', status))
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
        }) as PPDBPeriod
    )
  } catch (error) {
    console.error('Error getting periods by school:', error)
    throw error
  }
}

// Get active period for school
export async function getActivePeriod(schoolId: string): Promise<PPDBPeriod | null> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('schoolId', '==', schoolId),
      where('status', '==', 'active'),
      limit(1)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as PPDBPeriod
  } catch (error) {
    console.error('Error getting active period:', error)
    throw error
  }
}

// Create new period
export async function createPeriod(
  periodData: Omit<PPDBPeriod, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const now = Timestamp.now()
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...periodData,
      createdAt: now,
      updatedAt: now,
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating period:', error)
    throw error
  }
}

// Update period
export async function updatePeriod(
  periodId: string,
  updates: Partial<Omit<PPDBPeriod, 'id' | 'createdAt'>>
): Promise<void> {
  try {
    const periodRef = doc(db, COLLECTION_NAME, periodId)
    await updateDoc(periodRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating period:', error)
    throw error
  }
}

// Delete period
export async function deletePeriod(periodId: string): Promise<void> {
  try {
    const periodRef = doc(db, COLLECTION_NAME, periodId)
    await deleteDoc(periodRef)
  } catch (error) {
    console.error('Error deleting period:', error)
    throw error
  }
}

// Update period status
export async function updatePeriodStatus(
  periodId: string,
  status: PeriodStatus
): Promise<void> {
  try {
    const periodRef = doc(db, COLLECTION_NAME, periodId)
    await updateDoc(periodRef, {
      status,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating period status:', error)
    throw error
  }
}

// Update period quotas
export async function updatePeriodQuotas(
  periodId: string,
  quotaUpdates: Partial<PPDBPeriod['quotas']>
): Promise<void> {
  try {
    const periodRef = doc(db, COLLECTION_NAME, periodId)
    const period = await getPeriodById(periodId)

    if (!period) {
      throw new Error('Period not found')
    }

    await updateDoc(periodRef, {
      quotas: {
        ...period.quotas,
        ...quotaUpdates,
      },
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating period quotas:', error)
    throw error
  }
}

// Check if registration is open
export async function isRegistrationOpen(periodId: string): Promise<boolean> {
  try {
    const period = await getPeriodById(periodId)
    if (!period || period.status !== 'active') {
      return false
    }

    const now = Date.now()
    const registrationStart = period.timeline.registrationStart.toMillis()
    const registrationEnd = period.timeline.registrationEnd.toMillis()

    return now >= registrationStart && now <= registrationEnd
  } catch (error) {
    console.error('Error checking registration open:', error)
    return false
  }
}
