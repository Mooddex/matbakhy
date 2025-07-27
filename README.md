# Matbakhy

Matbakhy is a full‑stack marketplace platform that empowers kitchen makers to showcase and upload their unique kitchen designs. Customers can browse, favorite, and connect directly with makers to turn inspiration into reality.

---

## 🔗 Live Demo

[Visit Matbakhy](https://matbakhy.netlify.app)

---

![Matbakhy Dashboard Preview](https://res.cloudinary.com/deq0w5tnr/image/upload/v1753351753/2025-07-16-000244-create-next-app-screenclip_epkkci.jpg)

---

## 🛠️ Tech Stack

* **Framework**: Next.js (App Router) with TypeScript
* **Styling**: Tailwind CSS
* **Database**: MongoDB via Mongoose
* **Image Hosting**: Cloudinary for design uploads (using next-cloudinary)
* **State Management**: React Server Components & Context API

---

## 🚀 Features

1. **Server‑Side Rendering (SSR)** for fast, SEO‑friendly pages.
2. **Design Uploads**: Makers can add new kitchen designs via Cloudinary.
3. **Responsive UI**: Mobile‑first layout with Tailwind utilities.
4. **Favorites & Inquiries**: Customers can favorite designs and send inquiries directly.
5. **Clean Architecture**: Modular folder structure (api, components, models, lib).

---

## 🛠️ Future Improvements

- Add Authentication
- Profiels 
- More Chating Options

---

## ⚙️ Getting Started

1. **Clone the repo**:

   ```bash
   git clone https://github.com/Mooddex/matbakhy.git
   cd matbakhy
   ```

2. **Install dependencies**:

   ```bash
   npm install
   npm install next-cloudinary
   ```

3. **Configure environment**:

   Create a `.env.local` file in the project root with your credentials:

   ```ini
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run in development**:

   ```bash
   npm run dev
   ```

5. **Build for production**:

   ```bash
   npm run build
   npm start


## 📖 Lessons Learned

* Building a multi‑user marketplace UI with Next.js App Router.
* Integrating Cloudinary for seamless image uploads.
* Structuring a scalable codebase with separation of concerns.
* Managing data and rendering with React Server Components.

---

## 🔗 More Projects

* **My Office (Legal Case Manager)**: [https://github.com/Mooddex/my-office](https://github.com/Mooddex/my-office)
* **Beautello Salon Booking**: [https://github.com/Mooddex/Beautello-Salon](https://github.com/Mooddex/Beautello-Salon)
* **Interactive Timeline Page**: [https://github.com/Mooddex/timeline-page](https://github.com/Mooddex/timeline-page)
* **Personal Profile Website**: [https://github.com/Mooddex/ProfileWebsite](https://github.com/Mooddex/ProfileWebsite)

---

