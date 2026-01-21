# 🛡️ DSAR Portal (Data Subject Access Request Management)

A full-stack **DSAR (GDPR) management platform** that allows companies to receive, manage, and process Data Subject Access Requests in a compliant and structured way.

---

## ✨ Features Overview

### 🌍 Public (No Login)
- Company public DSAR page: `/c/[slug]`
- Company details:
  - Name & logo
  - Field of work
  - Employee count
  - Representation region (EU / UK)
- DSAR submission form:
  - Name
  - Email
  - Phone
  - Request details
  - Document upload
- Submission saved to DB and linked to company

> DSAR form is enabled **only if company is approved and subscription is active**

---

### 🏢 Company Owner
- Login as owner
- Owner Dashboard `/owner`
  - Company info
  - Subscription status (mock)
  - Quick stats
- DSAR Management `/owner/dsars`
  - View only their company’s DSARs
  - Status counts (open, in_progress, in_review, closed)
  - Update DSAR status
- Edit company details
- Activate mock subscription

---

### 👑 Admin
- Login as admin
- Admin Dashboard `/admin`
  - Total companies
  - Pending companies
  - Total DSARs
  - Open DSARs
- Manage Companies `/admin/companies`
  - Approve / Reject / Pending
  - View subscription status
  - View DSAR count per company
- Manage DSARs `/admin/dsars`
  - View all DSARs
  - Filter by company
  - Update DSAR status

---

## 🔐 Access Control Rules

| Role | Access |
|----|----|
| Public | Only public company page |
| Owner | Only their own company + DSARs |
| Admin | Full system access |

Strict server-side authorization using **cookies + Prisma filtering**  
No client-side trust.

---

## 💳 Subscription Logic (Mocked)

Public DSAR page is **active only if**:
- Company is **approved**
- AND subscription status is **active / trialing**

If subscription is inactive:
- Public page loads
- DSAR form is disabled
- Informational message is shown

> Stripe is intentionally mocked for MVP simplicity  
> Structure supports real Stripe integration later

---

## 🧱 Tech Stack

### Frontend
- Next.js 14 (App Router)
- React (Server Components)
- Tailwind CSS
- next/image

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL (Supabase)
- Cookie-based auth (MVP)

---


🧩 Prisma Data Model (Core)

User
role: admin | owner

Company
owner (1-1)
status: pending | approved | rejected
subscriptionStatus: active | trialing | inactive

DsarRequest
linked to company
status: open | in_progress | in_review | closed


⚙️ Setup Instructions
1️⃣ Install dependencies
npm install

2️⃣ Environment Variables (.env)
DATABASE_URL=postgresql://...

3️⃣ Prisma
npx prisma generate
npx prisma db push

4️⃣ Run the app
npm run dev

🧪 Test Accounts (Example)
Role	Email	                Password
Admin	admin@dsarportal.com	Admin@123
Owner	abc@company.com      	abc