# 🎓 ProfessorRater

An anonymous but verified review platform for Indian university professors (specifically tailored for AKTU and similar institutions). Built with a focus on trust, verification, and a premium Apple-style aesthetic.

## 🚀 Tech Stack
**React + Vite + Tailwind CSS + Firebase (Auth/Firestore) + React Router + Lucide Icons.**

## ✨ Features
- **Verified Signup:** Requires college email (e.g., `@ucer.ac.in`) to prevent fake reviews.
- **Complete Anonymity:** Students are always shown as "Anonymous Student."
- **Comprehensive Ratings:** Rate professors on Teaching, Clarity, Fairness, and Availability.
- **Search & Filters:** Find professors by name, department, or specific college.
- **Apple Aesthetic:** Modern, minimalist UI with glassmorphism, smooth transitions, and clean typography.
- **Anti-Abuse:** One review per user per professor per subject; reviews permanent after 24 hours.

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-link>
   cd professor-rater
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a project on [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Email/Password & Email Verification).
   - Create a **Cloud Firestore** database.
   - Copy your config and update `src/firebase.js`.

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure
```text
src/
├── components/     # Reusable UI (Navbar, Cards, StarRating)
├── context/        # AuthContext for Firebase state
├── data/           # Mock data for frontend preview
├── pages/          # Full page views (Landing, Profile, Search, etc.)
├── App.jsx         # Routing configuration
└── index.css       # Tailwind v4 configuration & Apple Design System
```

## 🔐 Firestore Schema (Proposed)
- `colleges/`: name, domain, university
- `professors/`: name, department, collegeId, subjects, avgRating, totalReviews
- `reviews/`: professorId, userId (hashed), subject, ratings (obj), comment, tags

## 📄 License
Built for educational purposes.
