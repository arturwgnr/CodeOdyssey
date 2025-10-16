🚀 Code Odyssey – Auth & Theme App

A mock application built with React + TypeScript, focused on practicing authentication, Context API, and routing.
Implements a complete flow: Register → Login → Protected Dashboard, plus light/dark theme toggle.

✨ Features

🔐 User registration & login (data persisted in localStorage)

👤 Global authentication state with Context API

🌓 Light/Dark theme toggle (applied directly to body)

🌍 Routing with react-router-dom (Home, Login, Register, Dashboard)

✅ Dashboard access restricted to logged-in users

🛠 Tech Stack

React + TypeScript

React Router DOM for navigation

Context API for Auth & Theme management

LocalStorage for session persistence

Modern CSS (glassmorphism, responsive)

📂 Project Structure
src/
 ┣ components/
 ┃ ┣ Hero.tsx
 ┃ ┣ Navbar.tsx
 ┃ ┗ PrivateRoute.tsx
 ┣ context/
 ┃ ┣ AuthContext.tsx
 ┃ ┗ ThemeContext.tsx
 ┣ pages/
 ┃ ┣ LoginPage.tsx
 ┃ ┣ RegisterPage.tsx
 ┃ ┗ Dashboard.tsx
 ┣ App.tsx
 ┗ main.tsx

🚦 Routes

/ → Home (Hero + Navbar)

/login → Login page

/register → Registration page

/dashboard → Protected route (requires login)

▶️ Getting Started
# install dependencies
npm install

# run in development mode
npm run dev

🔮 Next Steps

 Role-based access (admin vs user)

 Improve UI feedback (toasts, error messages)

 Build a real dashboard with tasks/finances

 Persist theme selection in localStorage

Next features coming in the future! Near future.
