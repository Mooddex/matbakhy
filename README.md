# 🍽️ Matbakhy

[![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge\&logo=cloudinary\&logoColor=white)](https://cloudinary.com/)

**Matbakhy** is a **full-stack marketplace** where kitchen makers can **showcase and share unique kitchen designs**.
Customers can **browse, favorite, and connect** directly with makers to bring their dream kitchens to life.

---

## 🔗 Live Demo

👉 **[Visit Matbakhy](https://matbakhy-beta.vercel.app/)**

![Matbakhy Preview](https://res.cloudinary.com/deq0w5tnr/image/upload/v1753351753/2025-07-16-000244-create-next-app-screenclip_epkkci.jpg)

---

## 🧰 Tech Stack

* ⚡ **Framework:** Next.js (App Router) + TypeScript
* 🎨 **Styling:** Tailwind CSS
* 🗄️ **Database:** MongoDB + Mongoose
* 🖼️ **Image Upload:** Cloudinary (via `next-cloudinary`)
* 🔄 **State Management:** React Server Components & Context API

---

## 🧩 Core Features

| Status | Feature                                               |
| ------ | ----------------------------------------------------- |
| ✅      | 🔐 **Login & Signup** (Email & Google Auth)           |
| ✅      | 🖼️ **Create, View, Update, Delete** Kitchen Listings |
| ✅      | 📱 **Responsive Design**                              |
| ✅      | 👤 **Maker & Customer Profiles**                      |
| ✅      | 📊 **Maker Analytics Dashboard**                      |

---

## 🚧 Upcoming Features

* 🌍 **Multi-language Support**
* 💬 **Advanced Messaging System**

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mooddex/matbakhy.git
cd matbakhy
```

### 2️⃣ Install Dependencies

```bash
npm install
npm install next-cloudinary
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory and add:

```ini
# MongoDB
MONGODB_URI=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# JWT
JWT_SECRET=

# Auth.js
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_TRUST_HOST=
NEXTAUTH_URL=
```

### 4️⃣ Run the App

```bash
npm run dev
```

### 5️⃣ Build for Production

```bash
npm run build
npm start
```

---

## 📘 Lessons Learned

* **Next.js App Router** improves performance but requires careful server/client component separation.
* **Cloudinary Integration** greatly simplifies image handling in full-stack apps.
* **Context API & Server Components** allow for smooth state management without heavy libraries.
* Structuring `.env` files early avoids deployment headaches later.

---

## 🔗 More Projects by Me

* **My Office (Legal Case Manager)** – [GitHub](https://github.com/Mooddex/my-office)
* **Beautello Salon Booking App** – [GitHub](https://github.com/Mooddex/Beautello-Salon)
* **Blogbook Website** – [GitHub](https://github.com/Mooddex/Blogbook)

---