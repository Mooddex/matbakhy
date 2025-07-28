# 🍽️ Matbakhy

**Matbakhy** is a full-stack marketplace platform that empowers kitchen makers to showcase and share their unique kitchen designs. Customers can browse, favorite, and connect directly with makers to turn inspiration into reality.

---

## 🔗 Live Demo

👉 [Visit Matbakhy](https://matbakhy-beta.vercel.app/)

![Matbakhy Preview](https://res.cloudinary.com/deq0w5tnr/image/upload/v1753351753/2025-07-16-000244-create-next-app-screenclip_epkkci.jpg)

---

## 🧰 Tech Stack

* **Framework**: Next.js (App Router) + TypeScript
* **Styling**: Tailwind CSS
* **Database**: MongoDB with Mongoose
* **Image Upload**: Cloudinary (via `next-cloudinary`)
* **State Management**: React Server Components & Context API

---

## ✨ Key Features

* **⚡ Fast & SEO-Friendly** – Built with SSR using Next.js App Router.
* **📸 Design Uploads** – Makers can easily upload kitchen designs via Cloudinary.
* **📱 Mobile-Responsive** – Built with Tailwind CSS for clean, responsive UI.
* **❤️ Favorites & Inquiries** – Customers can favorite kitchens and send direct messages to makers.
* **🗂️ Clean Architecture** – Modular folder structure for scalability and maintainability.

---

## 🚧 Upcoming Features

* 🔐 **User Authentication** (Sign up / Log in)
* 👤 **Maker & Customer Profiles**
* 💬 **Advanced Messaging System**

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mooddex/matbakhy.git
cd matbakhy
```

### 2. Install Dependencies

```bash
npm install
npm install next-cloudinary
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory and add:

```ini
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run the App

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 📘 Lessons Learned

* Built a scalable multi-user marketplace using Next.js App Router.
* Integrated Cloudinary for real-time image uploads with presets.
* Designed modular architecture with separation of concerns.
* Leveraged React Server Components for optimized rendering.

---

## 🔗 More Projects by Me

* **My Office (Legal Case Manager)** – [GitHub](https://github.com/Mooddex/my-office)
* **Beautello Salon Booking App** – [GitHub](https://github.com/Mooddex/Beautello-Salon)
* **Interactive Timeline Page** – [GitHub](https://github.com/Mooddex/timeline-page)
* **Personal Portfolio Website** – [GitHub](https://github.com/Mooddex/ProfileWebsite)
