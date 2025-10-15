#!/usr/bin/env node

/**
 * Environment Variable Checker
 * Validates that all required environment variables are set
 */

const fs = require('fs')
const path = require('path')

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// Required environment variables
const required = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
]

// Recommended environment variables
const recommended = [
  'FIREBASE_ADMIN_PROJECT_ID',
  'FIREBASE_ADMIN_CLIENT_EMAIL',
  'FIREBASE_ADMIN_PRIVATE_KEY',
  'NEXT_PUBLIC_APP_URL',
]

// Optional environment variables
const optional = [
  'MIDTRANS_SERVER_KEY',
  'EMAIL_SERVICE_API_KEY',
  'TWILIO_ACCOUNT_SID',
  'NEXT_PUBLIC_SENTRY_DSN',
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',
]

function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local')
  
  if (!fs.existsSync(envPath)) {
    log('\n❌ .env.local file not found!', 'red')
    log('\n💡 Run: cp .env.example .env.local', 'yellow')
    log('   Then fill in your Firebase credentials\n', 'yellow')
    return false
  }
  
  return true
}

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  const envContent = fs.readFileSync(envPath, 'utf-8')
  
  const env = {}
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim()
      env[key] = value
    }
  })
  
  return env
}

function checkVariables() {
  log('\n🔍 Checking environment variables...\n', 'blue')
  
  if (!checkEnvFile()) {
    process.exit(1)
  }
  
  const env = loadEnv()
  let hasErrors = false
  let hasWarnings = false
  
  // Check required variables
  log('📋 Required variables:', 'blue')
  required.forEach(key => {
    const value = env[key] || process.env[key]
    if (!value || value === '') {
      log(`  ❌ ${key} - MISSING`, 'red')
      hasErrors = true
    } else {
      log(`  ✅ ${key}`, 'green')
    }
  })
  
  // Check recommended variables
  log('\n📋 Recommended variables:', 'blue')
  recommended.forEach(key => {
    const value = env[key] || process.env[key]
    if (!value || value === '') {
      log(`  ⚠️  ${key} - NOT SET`, 'yellow')
      hasWarnings = true
    } else {
      log(`  ✅ ${key}`, 'green')
    }
  })
  
  // Check optional variables
  log('\n📋 Optional variables:', 'blue')
  optional.forEach(key => {
    const value = env[key] || process.env[key]
    if (!value || value === '') {
      log(`  ⚪ ${key} - not set (optional)`, 'reset')
    } else {
      log(`  ✅ ${key}`, 'green')
    }
  })
  
  // Summary
  log('\n' + '='.repeat(60), 'blue')
  if (hasErrors) {
    log('\n❌ Environment check FAILED', 'red')
    log('   Missing required variables. Please set them in .env.local\n', 'red')
    process.exit(1)
  } else if (hasWarnings) {
    log('\n⚠️  Environment check PASSED with warnings', 'yellow')
    log('   Some recommended variables are missing.\n', 'yellow')
  } else {
    log('\n✅ Environment check PASSED', 'green')
    log('   All required and recommended variables are set!\n', 'green')
  }
}

// Run the check
checkVariables()
