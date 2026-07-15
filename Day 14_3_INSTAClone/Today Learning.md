<div align="center">

# 📸 Insta Clone

### A full-featured Instagram clone built from scratch — backend first, feature by feature.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](#)
[![JWT](https://img.shields.io/badge/Auth-JWT-black?style=flat&logo=jsonwebtokens)](#)
[![Status](https://img.shields.io/badge/status-in--progress-yellow)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#)

</div>

---

## 📖 Overview

**Insta Clone** is a work-in-progress backend recreation of Instagram's core features — built to deeply understand real-world backend architecture: authentication, schema design, RESTful routing, and secure session handling.

This isn't a tutorial copy-paste project. Every route, schema, and middleware here is written, tested, and documented as part of a **daily build-in-public journey**, with progress tracked from Day 1.

> 🚧 **Actively in development.** Check the [Roadmap](#-roadmap) below for current progress.

---

## ✨ Features

### ✅ Implemented
- 🔐 User registration with password hashing (`bcrypt`)
- 🔑 User login with credential verification
- 🍪 JWT-based authentication via secure HTTP-only cookies
- 🗂️ Modular routing using `express.Router()`
- 🧬 MongoDB schema design with `mongoose`
- 📝 Post schema + create-post route (auth protected)

### 🔜 Planned
- ☁️ Real image upload via Multer + Cloudinary/S3
- 👤 User profile (bio, avatar, followers/following)
- ❤️ Like & comment system
- 🔍 Explore / search users
- 💬 Direct messaging
- 📱 Stories feature
- 🔔 Notifications

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT + bcrypt |
| **Environment Config** | dotenv |
| **API Testing** | Postman |

---

## 📁 Project Structure

![Folder Structure](./assets/folder-structure.png)

```
Day 14_1_INSTAClone/
├── config/
│   └── database.js             # MongoDB connection setup
├── controllers/
│   └── auth.controller.js      # Business logic for auth routes
├── models/
│   └── user.model.js           # Mongoose user schema
├── routes/
│   └── auth.routes.js          # /api/auth routes
├── src/
│   └── app.js                  # Express app configuration
├── node_modules/
├── .env                        # Environment variables (not committed)
├── .gitignore
├── package.json
├── package-lock.json
└── server.js                   # App entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Day14_1_INSTAClone.git
cd Day14_1_INSTAClone

# Install dependencies
npm install

# Create a .env file
touch .env
```

### Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Run the server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

---

## 📡 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Login and receive JWT cookie | ❌ |

### Post Routes — `/api/post`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/create` | Create a new post | ✅ |

<details>
<summary><strong>POST /api/auth/register</strong></summary>

**Request Body**
```json
{
  "username": "rahul_dev",
  "email": "rahul@example.com",
  "password": "SecurePass123"
}
```

**Response — 201 Created**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "64f1c2...",
    "username": "rahul_dev",
    "email": "rahul@example.com"
  }
}
```
</details>

<details>
<summary><strong>POST /api/auth/login</strong></summary>

**Request Body**
```json
{
  "email": "rahul@example.com",
  "password": "SecurePass123"
}
```

**Response — 200 OK**
```json
{
  "message": "Login successful"
}
```
> JWT is set as an `httpOnly` cookie on successful login.
</details>

<details>
<summary><strong>POST /api/post/create</strong></summary>

**Request Body**
```json
{
  "caption": "Sunset at the beach 🌅",
  "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v123/sunset.jpg"
}
```

**Response — 201 Created**
```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "64f2d9...",
    "user": "64f1c2...",
    "caption": "Sunset at the beach 🌅",
    "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v123/sunset.jpg"
  }
}
```
> `imageUrl` is expected to be a **cloud storage link**, not raw file data — the app never stores files on its own server.
</details>

---

## 🧬 Data Model

**User Schema**

| Field | Type | Constraints |
|---|---|---|
| `username` | String | required, unique |
| `email` | String | required, unique, lowercase |
| `password` | String | required, stored as bcrypt hash |
| `createdAt` / `updatedAt` | Date | auto-generated |

**Post Schema**

| Field | Type | Constraints |
|---|---|---|
| `user` | ObjectId (ref: User) | required |
| `caption` | String | optional, max 2200 chars |
| `imageUrl` | String | required — cloud storage URL, not a local file |
| `likes` | [ObjectId] (ref: User) | defaults to empty |
| `comments` | [ObjectId] (ref: Comment) | defaults to empty |
| `createdAt` / `updatedAt` | Date | auto-generated |

---

## 🗺️ Roadmap

Progress is tracked daily as part of my backend learning journey.

- [x] **Day 1** — Project setup, User schema, Register & Login routes
- [x] **Day 2** — Post schema, create-post route, learned cloud storage pattern for file uploads
- [ ] **Day 3** — Multer + Cloudinary/S3 integration for real image uploads
- [ ] **Day 4** — Logout route + token refresh
- [ ] **Day 5** — Like & comment functionality
- [ ] **Day 6** — Follow / unfollow system
- [ ] **Day 7+** — Explore page, notifications, direct messages

---

## 🧑‍💻 About This Project

This project is part of a **daily build-in-public backend journey**, where every feature is implemented from the ground up — no boilerplate templates, no shortcuts. The goal is to demonstrate real, hands-on understanding of:

- Secure authentication (hashing, JWT, cookies)
- Clean, scalable folder architecture
- RESTful API design
- Database schema modeling

---

## 🤝 Contributing

This is currently a solo learning project, but suggestions and code reviews are always welcome — feel free to open an issue or a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**⭐ If you're a recruiter or fellow developer checking this out — thanks for stopping by!**
Feel free to connect or reach out.

</div>