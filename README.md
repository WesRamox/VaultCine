# 🎬 MoviesGroup

Web platform for creating **movie groups**, where authenticated users can create groups, invite members, and rate movies together.

---

## 🧱 Stack

- **Next.js (App Router)**
- **NextAuth (Auth.js)** – Google login
- **Prisma ORM**
- **PostgreSQL**
- **Docker + Docker Compose**
- **Zod** – Data validation

---

## 🎯 Focus & Expertise

This project is designed to demonstrate **Full Stack expertise**, with a strong emphasis on:

- **Backend architecture and API design**
- **Authentication and authorization flows**
- **Database modeling with Prisma**
- **Server-side logic using Server Components**
- **Clean separation between frontend and backend responsibilities**

---

## 🔐 Authentication

Authentication handled with **NextAuth + Prisma Adapter**.

- Login exclusively via **Google**
- Sessions persisted in the database (`strategy: "database"`)
- Prisma used **only on the backend / server components**

---

## 🗂️ Folder structure (simplified)

```
app/
├─ api/
│  ├─ auth/
│  │  └─ [...nextauth]/route.ts
│  └─ groups/
│     └─ route.ts
│
├─ dashboard/
│  └─ page.tsx   (Server Component)
│
├─ groups/
│  ├─ page.tsx
│  └─ [id]/page.tsx
│
lib/
├─ prisma.ts
│
dtos/
├─ create-group-dto.ts
│
prisma/
├─ schema.prisma
└─ migrations/
```

---

## 📡 API Routes

### 🔑 Auth

- [x] `POST /api/auth/signin`
- [x] `GET /api/auth/session`
- [x] `GET /api/auth/callback/google`

---

### 👥 Groups

- [x] `POST /api/groups` → Create group  
- [x] `GET /api/groups` → List user groups  
- [ ] `GET /api/groups/:id` → Group details  
- [ ] `POST /api/groups/:id/members` → Add member  
- [ ] `DELETE /api/groups/:id/members/:userId` → Remove member  

---

## 🧬 Main Models (Prisma)

### User
- Automatically created on Google login
- Related to groups and sessions

### Group
- Has an owner (`owner`)
- Has members (`GroupMember`)

### GroupMember
- N:N relationship between `User` and `Group`
- Defines role: `owner | member`

---

## 📦 Running the project

### 1️⃣ Clone the repository

```bash
git clone <repo-url>
cd moviesgroup
```

---

### 2️⃣ Environment variables

Create a `.env` file:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=super-secret-key

GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
NODE_ENV=development
```

---

### 3️⃣ Start the database with Docker

```bash
docker-compose up -d
```

---

### 4️⃣ Install dependencies

```bash
npm install
```

---

### 5️⃣ Run Prisma migrations

```bash
npx prisma migrate dev
```

To open Prisma Studio:

```bash
npx prisma studio
```

---

### 6️⃣ Run the project

```bash
npm run dev
```

Access: `http://localhost:3000`

---

## 🧠 Best practices applied

- ✅ Prisma used **only on the backend / server**
- ✅ Server Components for protected pages
- ✅ Client Components only for interactions
- ✅ Data validation with **Zod (DTOs)**
- ✅ Session-based authorization (`getServerSession`)

---

## 🚀 Next steps

- [ ] Group details page
- [ ] Invitation system
- [ ] Movie rating per group
- [ ] Permissions (owner vs member)
- [ ] Deploy (Railway / Vercel)

---

## 🧑‍💻 Author

Developed by **Wesley Ramos** 🚀
