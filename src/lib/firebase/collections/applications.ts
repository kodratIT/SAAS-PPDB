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
import type { Application, ApplicationStatus } from '@/types/database'

const COLLECTION_NAME = 'applications'

// Get application by ID
export async function getApplicationById(applicationId: string): Promise<Application | null> {
  try {
    const appRef = doc(db, COLLECTION_NAME, applicationId)
    const appSnap = await getDoc(appRef)

    if (!appSnap.exists()) {
      return null
    }

    return {
      id: appSnap.id,
      ...appSnap.data(),
    } as Application
  } catch (error) {
    console.error('Error getting application:', error)
    throw error
  }
}

// Get application by registration number
export async function getApplicationByRegNumber(
  schoolId: string,
  periodId: string,
  registrationNumber: string
): Promise<Application | null> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('schoolId', '==', schoolId),
      where('periodId', '==', periodId),
      where('registrationNumber', '==', registrationNumber),
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
    } as Application
  } catch (error) {
    console.error('Error getting application by reg number:', error)
    throw error
  }
}

// Get applications by user
export async function getApplicationsByUser(userId: string): Promise<Application[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Application
    )
  } catch (error) {
    console.error('Error getting applications by user:', error)
    throw error
  }
}

// Get applications by school and period
export async function getApplicationsByPeriod(
  schoolId: string,
  periodId: string,
  filters?: {
    status?: ApplicationStatus
    jalurId?: string
    limitCount?: number
  }
): Promise<Application[]> {
  try {
    const constraints: QueryConstraint[] = [
      where('schoolId', '==', schoolId),
      where('periodId', '==', periodId),
    ]

    if (filters?.status) {
      constraints.push(where('status', '==', filters.status))
    }
    if (filters?.jalurId) {
      constraints.push(where('jalurId', '==', filters.jalurId))
    }

    constraints.push(orderBy('submittedAt', 'desc'))

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
        }) as Application
    )
  } catch (error) {
    console.error('Error getting applications by period:', error)
    throw error
  }
}

// Create new application
export async function createApplication(
  applicationData: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const now = Timestamp.now()
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...applicationData,
      createdAt: now,
      updatedAt: now,
      lastModified: now,
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating application:', error)
    throw error
  }
}

// Update application
export async function updateApplication(
  applicationId: string,
  updates: Partial<Omit<Application, 'id' | 'createdAt'>>
): Promise<void> {
  try {
    const appRef = doc(db, COLLECTION_NAME, applicationId)
    const now = Timestamp.now()
    await updateDoc(appRef, {
      ...updates,
      updatedAt: now,
      lastModified: now,
    })
  } catch (error) {
    console.error('Error updating application:', error)
    throw error
  }
}

// Update application status
export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
): Promise<void> {
  try {
    const appRef = doc(db, COLLECTION_NAME, applicationId)
    const now = Timestamp.now()
    const updates: Partial<Application> = {
      status,
      updatedAt: now,
      lastModified: now,
    }

    if (status === 'submitted' && !(await getApplicationById(applicationId))?.submittedAt) {
      updates.submittedAt = now
    }

    await updateDoc(appRef, updates)
  } catch (error) {
    console.error('Error updating application status:', error)
    throw error
  }
}

// Update document status
export async function updateDocumentStatus(
  applicationId: string,
  documentKey: string,
  status: 'pending' | 'approved' | 'rejected',
  verifiedBy?: string,
  note?: string
): Promise<void> {
  try {
    const appRef = doc(db, COLLECTION_NAME, applicationId)
    const app = await getApplicationById(applicationId)

    if (!app) {
      throw new Error('Application not found')
    }

    const now = Timestamp.now()
    const updatedDocuments = {
      ...app.documents,
      [documentKey]: {
        ...app.documents[documentKey],
        status,
        verifiedBy,
        verifiedAt: now,
        note,
      },
    }

    await updateDoc(appRef, {
      documents: updatedDocuments,
      updatedAt: now,
      lastModified: now,
    })
  } catch (error) {
    console.error('Error updating document status:', error)
    throw error
  }
}

// Update verification data
export async function updateVerification(
  applicationId: string,
  verificationData: Partial<Application['verification']>
): Promise<void> {
  try {
    const appRef = doc(db, COLLECTION_NAME, applicationId)
    const app = await getApplicationById(applicationId)

    if (!app) {
      throw new Error('Application not found')
    }

    const now = Timestamp.now()
    await updateDoc(appRef, {
      verification: {
        ...app.verification,
        ...verificationData,
        verifiedAt: Timestamp.now(),
      },
      updatedAt: now,
      lastModified: now,
    })
  } catch (error) {
    console.error('Error updating verification:', error)
    throw error
  }
}

// Update scores
export async function updateScores(
  applicationId: string,
  scores: Partial<Application['scores']>
): Promise<void> {
  try {
    const appRef = doc(db, COLLECTION_NAME, applicationId)
    const app = await getApplicationById(applicationId)

    if (!app) {
      throw new Error('Application not found')
    }

    const updatedScores = {
      ...app.scores,
      ...scores,
    }

    // Calculate total
    const total =
      (updatedScores.academic || 0) +
      (updatedScores.achievement || 0) +
      (updatedScores.zonasi || 0) +
      (updatedScores.test || 0) +
      (updatedScores.interview || 0)

    await updateDoc(appRef, {
      scores: {
        ...updatedScores,
        total,
      },
      updatedAt: Timestamp.now(),
      lastModified: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating scores:', error)
    throw error
  }
}

// Delete application
export async function deleteApplication(applicationId: string): Promise<void> {
  try {
    const appRef = doc(db, COLLECTION_NAME, applicationId)
    await deleteDoc(appRef)
  } catch (error) {
    console.error('Error deleting application:', error)
    throw error
  }
}

// Generate registration number
export async function generateRegistrationNumber(
  schoolId: string,
  periodId: string,
  prefix: string = 'REG'
): Promise<string> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('schoolId', '==', schoolId),
      where('periodId', '==', periodId),
      orderBy('registrationNumber', 'desc'),
      limit(1)
    )
    const querySnapshot = await getDocs(q)

    let nextNumber = 1
    if (!querySnapshot.empty) {
      const lastRegNumber = querySnapshot.docs[0].data().registrationNumber as string
      const lastNumber = parseInt(lastRegNumber.split('-').pop() || '0')
      nextNumber = lastNumber + 1
    }

    const year = new Date().getFullYear()
    return `${prefix}-${year}-${nextNumber.toString().padStart(6, '0')}`
  } catch (error) {
    console.error('Error generating registration number:', error)
    throw error
  }
}
