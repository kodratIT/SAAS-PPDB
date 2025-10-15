# Sprint 2: Quick Summary & Checklist

## 🎯 Sprint Goal
Implement authentication system and super admin foundation

---

## 📊 Sprint Metrics

| Metric | Value |
|--------|-------|
| **Duration** | 2 weeks |
| **Story Points** | 26 SP |
| **Team Size** | 4-5 developers |
| **Stories** | 5 |
| **Tasks** | 15 tasks |

---

## 📚 Stories Overview

| # | Story | SP | Owner | Status |
|---|-------|----|----|--------|
| 2.1 | Authentication System | 8 | TL + FSD1 | [ ] |
| 2.2 | Authentication UI | 6 | FSD1 + FED | [ ] |
| 2.3 | Role-Based Access Control | 5 | TL + FSD2 | [ ] |
| 2.4 | Super Admin Dashboard | 4 | FSD1 + FED | [ ] |
| 2.5 | Subscription Plans | 3 | TL + FSD2 | [ ] |

---

## ✅ Master Checklist

### Story 2.1: Authentication System (Day 1-2)
- [ ] Task 2.1.1: Auth Context & Hooks (TL, 3h)
- [ ] Task 2.1.2: Login/Register/Logout Functions (FSD1, 3h)
- [ ] Task 2.1.3: Google OAuth Integration (FSD1, 2h)
- [ ] Task 2.1.4: Password Reset (FSD1, 2h)
- [ ] Task 2.1.5: Email Verification (FSD1, 2h)

**Verification**:
```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"idToken": "YOUR_TOKEN"}'

# Should return user data with session
```

---

### Story 2.2: Authentication UI (Day 3-4)
- [ ] Task 2.2.1: Login Page (FED, 3h)
- [ ] Task 2.2.2: Register Page (FED, 3h)
- [ ] Task 2.2.3: Forgot Password Page (FED, 2h)
- [ ] Task 2.2.4: Protected Routes (FSD1, 2h)

**Verification**:
- [ ] Visit `/login` - form validates
- [ ] Visit `/register` - creates user
- [ ] Visit `/forgot-password` - sends email
- [ ] Try `/super-admin` without login - redirects

---

### Story 2.3: RBAC System (Day 5-7)
- [ ] Task 2.3.1: Define Roles & Permissions (TL, 2h)
- [ ] Task 2.3.2: RBAC Middleware (TL, 3h)
- [ ] Task 2.3.3: Permission Hooks (FSD2, 2h)
- [ ] Task 2.3.4: Permission Guards (FSD2, 2h)

**Verification**:
```typescript
// Test permission check
const { hasPermission } = usePermissions()
console.log(hasPermission('schools.create')) // true/false
```

---

### Story 2.4: Super Admin Dashboard (Day 8-9)
- [ ] Task 2.4.1: Dashboard Layout (FED, 3h)
- [ ] Task 2.4.2: Statistics Widgets (FSD1, 2h)
- [ ] Task 2.4.3: Activities Section (FSD1, 2h)

**Verification**:
- [ ] Visit `/super-admin/dashboard`
- [ ] Stats display correctly
- [ ] Activities load

---

### Story 2.5: Subscription Plans (Day 10)
- [ ] Task 2.5.1: Plan Schema (TL, 2h)
- [ ] Task 2.5.2: Plan CRUD (FSD2, 3h)
- [ ] Task 2.5.3: Plan UI (FSD2, 3h)

**Verification**:
- [ ] Create plan successful
- [ ] List plans working
- [ ] Edit/Delete working

---

## ⚡ Quick Commands

### Development
```bash
# Start dev server
npm run dev

# Auth emulator
firebase emulators:start --only auth

# Visit pages
open http://localhost:3000/login
open http://localhost:3000/register
open http://localhost:3000/super-admin/dashboard
```

### Testing
```bash
# Test auth flow manually
# 1. Register at /register
# 2. Check email for verification
# 3. Login at /login
# 4. Should redirect to dashboard based on role

# Test protected routes
# Try accessing /super-admin without login
# Should redirect to /login

# Test RBAC
# Login as student
# Try accessing /super-admin
# Should see 403 Unauthorized
```

### Firebase
```bash
# View auth users
firebase auth:export users.json

# View Firestore users
# Check Firebase Console → Firestore → users
```

### Git
```bash
# Create feature branch
git checkout -b feature/story-2.1-auth-system

# Commit
git add .
git commit -m "feat: implement authentication system"

# Push
git push origin feature/story-2.1-auth-system
```

---

## 📁 Key Files Created

### Sprint 2 Files
- `src/contexts/AuthContext.tsx` - Auth state management
- `src/lib/utils/auth.ts` - Session utilities
- `src/middleware.ts` - Route protection
- `src/app/api/auth/login/route.ts` - Login API
- `src/app/api/auth/logout/route.ts` - Logout API
- `src/app/api/auth/session/route.ts` - Session check
- `src/app/(auth)/login/page.tsx` - Login page
- `src/app/(auth)/register/page.tsx` - Register page
- `src/app/(auth)/forgot-password/page.tsx` - Forgot password
- `src/app/(auth)/verify-email/page.tsx` - Email verification
- `src/app/(auth)/reset-password/page.tsx` - Reset password
- `src/components/auth/ProtectedRoute.tsx` - Protected wrapper
- `src/app/unauthorized/page.tsx` - 403 page

### RBAC Files (Story 2.3)
- `src/lib/rbac/permissions.ts` - Permission definitions
- `src/lib/rbac/middleware.ts` - RBAC middleware
- `src/hooks/usePermissions.ts` - Permission hook

### Dashboard Files (Story 2.4)
- `src/app/(super-admin)/dashboard/page.tsx` - Dashboard
- `src/components/dashboard/StatsCard.tsx` - Stats widget
- `src/components/dashboard/RecentActivities.tsx` - Activities

---

## 🎨 Tech Stack (Sprint 2 Additions)

| Category | Technology |
|----------|-----------|
| **Authentication** | Firebase Auth |
| **Form Validation** | React Hook Form + Zod |
| **Session** | JWT (jose library) |
| **OAuth** | Google Identity Services |
| **State** | React Context API |
| **Middleware** | Next.js Middleware |

---

## 🔍 Verification Checklist

### Authentication Working
- [ ] Register creates user in Firestore
- [ ] Login returns session token
- [ ] Logout clears session
- [ ] Google OAuth creates/logs in user
- [ ] Password reset sends email
- [ ] Password reset link works
- [ ] Email verification works
- [ ] Session persists on refresh

### UI/UX
- [ ] All forms validate input
- [ ] Error messages shown
- [ ] Success messages shown
- [ ] Loading states shown
- [ ] Responsive design works

### Security
- [ ] Passwords never exposed
- [ ] Tokens validated on API calls
- [ ] Protected routes work
- [ ] RBAC prevents unauthorized access
- [ ] CSRF protection enabled
- [ ] XSS sanitization working

### RBAC
- [ ] Roles assigned correctly
- [ ] Permissions checked on routes
- [ ] Permissions checked on API
- [ ] Role-based UI rendering
- [ ] Unauthorized users blocked

---

## 🐛 Common Issues

### Issue: "Firebase Auth not initialized"
```bash
# Solution
# Check .env.local has all NEXT_PUBLIC_FIREBASE_* variables
# Restart dev server: npm run dev
```

### Issue: "Session not persisting"
```bash
# Solution
# Check JWT_SECRET in .env.local
# Clear cookies in browser
# Re-login
```

### Issue: "OAuth popup blocked"
```
Solution: Allow popups for localhost in browser settings
Chrome: Settings → Privacy → Popups → Allow
```

### Issue: "Email not sending"
```
Solution: 
1. Check Firebase Console → Authentication → Templates
2. Verify email sender domain
3. Check spam folder
```

### Issue: "Permission denied Firestore"
```bash
# Solution
# Update Firestore rules to allow authenticated reads
# Firebase Console → Firestore → Rules
```

### Issue: "Middleware not running"
```bash
# Solution
# Check middleware.ts is at root src/
# Verify matcher patterns
# Clear .next cache: rm -rf .next && npm run dev
```

---

## 📞 Quick Links

### Documentation
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

### Internal
- [INDEX.md](INDEX.md) - Navigation
- [README.md](README.md) - Overview
- [SETUP-GUIDE.md](SETUP-GUIDE.md) - Detailed steps
- [diagrams/](./diagrams/) - Architecture diagrams

### Support
- #dev-auth - Authentication issues
- #dev-security - Security questions
- Tech Lead - Architecture decisions

---

## 📈 Progress Tracking

### Daily Progress Template

**Day [X] - [Date]**

**Completed**:
- [x] Story 2.X - Task 2.X.X

**In Progress**:
- [ ] Story 2.X - Task 2.X.X

**Blocked**:
- [ ] Issue: [Description]

**Tomorrow**:
- [ ] Story 2.X - Task 2.X.X

---

## 🎯 Success Criteria

Sprint 2 is **DONE** when:

✅ All stories completed (26 SP)  
✅ Users can register/login  
✅ OAuth working  
✅ Password reset working  
✅ Sessions persist  
✅ RBAC prevents unauthorized access  
✅ Super admin dashboard functional  
✅ 0 critical security bugs  
✅ Demo successful

---

## 🔐 Security Checklist

Before marking Sprint 2 complete:

- [ ] Passwords hashed (Firebase handles this)
- [ ] Tokens validated on every API call
- [ ] Protected routes block unauthorized users
- [ ] RBAC prevents privilege escalation
- [ ] CSRF protection enabled
- [ ] XSS sanitization in forms
- [ ] Rate limiting on auth endpoints (Firebase)
- [ ] Email verification enforced
- [ ] Session timeout configured (7 days)
- [ ] Secure cookies (httpOnly, secure in prod)
- [ ] No sensitive data in localStorage
- [ ] JWT secret strong (32+ characters)

---

## 📊 Sprint Velocity

**Planned**: 26 SP  
**Completed**: ___ SP  
**Velocity**: ___% 

---

**Last Updated**: [Date]  
**Sprint Status**: 🚀 In Progress

---

## 🚀 Next Actions

After Sprint 2:
1. Sprint Demo (Friday, Week 2)
2. Sprint Retrospective
3. Sprint 3 Planning (School Management)
4. Start Sprint 3: Multi-tenancy & PPDB Periods

---

## 🧪 Testing Scenarios

### Manual Testing

**Scenario 1: New User Registration**
1. Go to `/register`
2. Fill form with valid data
3. Submit
4. Check email for verification
5. Click verification link
6. Login at `/login`
7. Should redirect to `/student/dashboard`

**Scenario 2: Password Reset**
1. Go to `/forgot-password`
2. Enter registered email
3. Check email for reset link
4. Click reset link
5. Enter new password
6. Submit
7. Login with new password
8. Should work

**Scenario 3: OAuth Login**
1. Go to `/login`
2. Click "Login with Google"
3. Select Google account
4. Should redirect to `/student/dashboard`

**Scenario 4: Protected Routes**
1. Logout if logged in
2. Try to access `/super-admin/dashboard`
3. Should redirect to `/login`
4. Login as student
5. Try to access `/super-admin/dashboard`
6. Should see 403 Unauthorized

**Scenario 5: Role-Based Access**
1. Create users with different roles
2. Login as each role
3. Verify correct dashboard shown:
   - super_admin → `/super-admin/dashboard`
   - school_admin → `/school-admin/dashboard`
   - panitia → `/panitia/dashboard`
   - student → `/student/dashboard`

---

**Need Help?** Check [SETUP-GUIDE.md](SETUP-GUIDE.md) or ask in #dev-auth
