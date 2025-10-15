// Environment configuration and validation

export const env = {
  // Node environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  // Firebase Client (Public)
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
    useEmulator: process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true',
  },

  // Firebase Admin (Server-side only)
  firebaseAdmin: {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || '',
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || '',
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  },

  // Application
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_APP_NAME || 'PPDB SaaS',
  },

  // Features
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    errorTracking: process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING === 'true',
  },

  // Payment Gateway
  payment: {
    midtrans: {
      serverKey: process.env.MIDTRANS_SERVER_KEY || '',
      clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
    },
  },

  // Email Service
  email: {
    apiKey: process.env.EMAIL_SERVICE_API_KEY || '',
    fromAddress: process.env.EMAIL_FROM_ADDRESS || '',
    fromName: process.env.EMAIL_FROM_NAME || '',
  },

  // SMS/WhatsApp
  messaging: {
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID || '',
      authToken: process.env.TWILIO_AUTH_TOKEN || '',
      phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
    },
    whatsapp: {
      apiKey: process.env.WHATSAPP_API_KEY || '',
    },
  },

  // Monitoring
  monitoring: {
    sentry: {
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
      authToken: process.env.SENTRY_AUTH_TOKEN || '',
    },
    ga: {
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    },
  },
} as const

// Validate required environment variables
export function validateEnv() {
  const required = {
    'NEXT_PUBLIC_FIREBASE_API_KEY': env.firebase.apiKey,
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': env.firebase.authDomain,
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID': env.firebase.projectId,
  }

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((key) => `  - ${key}`).join('\n')}`
    )
  }
}

// Get environment info
export function getEnvironmentInfo() {
  return {
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    firebase: {
      projectId: env.firebase.projectId,
      useEmulator: env.firebase.useEmulator,
    },
    features: env.features,
  }
}

// Check if running on server
export const isServer = typeof window === 'undefined'

// Check if running on client
export const isClient = typeof window !== 'undefined'
