# Code Odyssey

Code Odyssey is a full-stack authentication project built as part of my personal development journey, focused on mastering real-world web application architecture.

## 🧠 Overview
This project is divided into two main parts:
- Frontend: React + TypeScript (Vite)
- Backend: Node.js + Express + Prisma + PostgreSQL

The goal is to implement a real authentication flow using JWT (access and refresh tokens), persistent sessions, and protected routes.

## ⚙️ Features
- User registration and login
- Password hashing with bcrypt
- JWT access and refresh tokens
- Session refresh and logout system
- Protected routes with middleware
- Full React integration using Context API

## 🧩 Tech Stack
Frontend:
- React + TypeScript + Vite
- Context API
- Fetch API for backend communication

Backend:
- Node.js + Express
- Prisma ORM + PostgreSQL
- JWT + bcrypt + dotenv

## 🚀 How to Run

Backend:
cd backend
npm install
npx prisma migrate dev --name init
npm run dev

Frontend:
cd frontend
npm install
npm run dev

Then open http://localhost:5173 to access the app.

## 📚 Structure
CodeOdyssey/
│
├── backend/
│   ├── src/
│   ├── prisma/
│   └── server.js
│
└── frontend/
    ├── src/
    ├── public/
    └── App.tsx

## 🧭 Purpose
This project is part of the Ragnarok Dev Protocol — a personal mission to achieve full technical fluency, discipline, and autonomy in software development.

Created and maintained by Artur Wagner.
