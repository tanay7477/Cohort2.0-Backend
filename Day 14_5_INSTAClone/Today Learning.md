<div align="center">

# 📸 Insta Clone

### A full-featured Instagram clone built from scratch — backend first, feature by feature.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](#)
[![JWT](https://img.shields.io/badge/Auth-JWT-black?style=flat&logo=jsonwebtokens)](#)
[![ImageKit](https://img.shields.io/badge/Storage-ImageKit-FF7A5C?style=flat)](#)
[![Status](https://img.shields.io/badge/status-in--progress-yellow)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#)

</div>

---

## 📖 Overview

**Insta Clone** is a work-in-progress backend recreation of Instagram's core features — built to deeply understand real-world backend architecture: authentication, schema design, RESTful routing, secure session handling, and file uploads.

This isn't a tutorial copy-paste project. Every route, schema, and middleware here is written, tested, and documented as part of a **daily build-in-public journey**, with progress tracked from Day 1.

> 🚧 **Actively in development.** Check the [Roadmap](#-roadmap) below for current progress.

---

## ✨ Features

### ✅ Implemented
- 🔐 User registration with password hashing (`bcrypt`)
- 🔑 User login with credential verification (login via **username or email**)
- 🍪 JWT-based authentication via secure HTTP-only cookies
- 🗂️ Modular routing using `express.Router()`
- 🧬 MongoDB schema design with `mongoose`
- 📝 Create post with **real image upload** (`multer` in-memory buffer → `ImageKit` cloud storage)
- 📄 View all posts belonging to the logged-in user
- 🔍 View a single post's details by ID
- 🔒 **Ownership-based access control** — a user can only view their own posts; accessing another user's post returns `403 Forbidden`
- 🛡️ Token verification on every protected route (`jwt.verify` + `httpOnly` cookie)

### 🔜 Planned
- 🧩 Extract repeated auth-verification logic into a reusable `authMiddleware`
- 👤 User profile (bio, avatar, followers/following)
- ❤️ Like & comment system
- 🌍 Feed — view posts from all/followed users (with proper visibility rules)
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
| **File Upload** | Multer (memory storage) |
| **Image Storage** | ImageKit |
| **Environment Config** | dotenv |
| **API Testing** | Postman |

---

## 📁 Project Structure

![Folder Structure](./assets/folder-structure.png)

```
Day 14_3_INSTAClone/
├── config/
│   └── database.js             # MongoDB connection setup
├── controllers/
│   ├── auth.controller.js      # Business logic for auth routes
│   └── post.controller.js      # Business logic for post routes (create/get/details)
├── models/
│   ├── user.model.js           # Mongoose user schema
│   └── post.model.js           # Mongoose post schema
├── routes/
│   ├── auth.routes.js          # /api/auth routes
│   └── post.routes.js          # /api/posts routes
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
- An [ImageKit](https://imagekit.io/) account (for image storage)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Day14_3_INSTAClone.git
cd Day14_3_INSTAClone

# Install dependencies
npm install

# Create a .env file
touch .env
```

### Environment Variables

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### Run the server

```bash
npm run dev
```

Server will start on `http://localhost:3000`

---

## 📡 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Login (via username **or** email) and receive JWT cookie | ❌ |

### Post Routes — `/api/posts`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/` | Create a new post with image upload | ✅ |
| `GET` | `/` | Get all posts created by the logged-in user | ✅ |
| `GET` | `/:postId` | Get a single post's details (owner-only) | ✅ |

<details>
<summary><strong>POST /api/auth/register</strong></summary>

**Request Body**
```json
{
  "username": "rahul_dev",
  "email": "rahul@example.com",
  "password": "SecurePass123",
  "bio": "Full stack developer"
}
```

**Response — 201 Created**
```json
{
  "message": "User register succesfully!",
  "user": {
    "email": "rahul@example.com",
    "username": "rahul_dev",
    "bio": "Full stack developer",
    "profileImage": "https://ik.imagekit.io/.../default-avatar.avif"
  }
}
```
</details>

<details>
<summary><strong>POST /api/auth/login</strong></summary>

**Request Body** — login with either `username` or `email`
```json
{
  "username": "rahul_dev",
  "password": "SecurePass123"
}
```

**Response — 200 OK**
```json
{
  "message": "user loggedIn Succesfully!",
  "user": {
    "username": "rahul_dev",
    "email": "rahul@example.com",
    "bio": "Full stack developer",
    "profileImage": "https://ik.imagekit.io/.../default-avatar.avif"
  }
}
```
> JWT is set as an `httpOnly` cookie on successful login.
</details>

<details>
<summary><strong>POST /api/posts/</strong></summary>

**Request** — `multipart/form-data` (not raw JSON, since an actual file is uploaded)

| Key | Type | Example |
|---|---|---|
| `image` | File | *(select an image file)* |
| `caption` | Text | `Sunset at the beach 🌅` |

> ⚠️ The `user` field is **never** sent from the client — it's derived from the JWT cookie on the server, so a post always belongs to whoever is actually logged in.

**Response — 201 Created**
```json
{
  "message": "post created successfully!",
  "post": {
    "_id": "64f2d9...",
    "user": "64f1c2...",
    "caption": "Sunset at the beach 🌅",
    "imgUrl": "https://ik.imagekit.io/.../Test_xyz123.webp"
  }
}
```
</details>

<details>
<summary><strong>GET /api/posts/</strong></summary>

Returns **only** the posts created by the currently logged-in user (identified via the JWT cookie) — no other user's posts are included.

**Response — 200 OK**
```json
{
  "message": "post fetched successfully!",
  "posts": [
    {
      "_id": "64f2d9...",
      "user": "64f1c2...",
      "caption": "Sunset at the beach 🌅",
      "imgUrl": "https://ik.imagekit.io/.../Test_xyz123.webp"
    }
  ]
}
```
</details>

<details>
<summary><strong>GET /api/posts/:postId</strong></summary>

Fetches a single post by ID — **only if the requester is the owner** of that post.

**Response — 200 OK (owner)**
```json
{
  "message": "post fetched succesfully!",
  "post": {
    "_id": "64f2d9...",
    "user": "64f1c2...",
    "caption": "Sunset at the beach 🌅",
    "imgUrl": "https://ik.imagekit.io/.../Test_xyz123.webp"
  }
}
```

**Response — 403 Forbidden (not owner)**
```json
{
  "message": "Forbidden Content"
}
```

**Response — 404 Not Found**
```json
{
  "message": "post not found!"
}
```
</details>

---

## 🧬 Data Model

**User Schema**

| Field | Type | Constraints |
|---|---|---|
| `username` | String | required, unique |
| `email` | String | required, unique |
| `password` | String | required, stored as bcrypt hash |
| `bio` | String | optional |
| `profileImage` | String | defaults to a placeholder avatar URL |

**Post Schema**

| Field | Type | Constraints |
|---|---|---|
| `caption` | String | optional, defaults to `""` |
| `imgUrl` | String | required — cloud storage URL (ImageKit), not a local file |
| `user` | ObjectId (ref: `users`) | required — set from the JWT token, never from client input |

> 🔐 **Access control:** every post is tied to the `_id` of the user who created it. On `GET /api/posts/:postId`, the server compares the logged-in user's ID against `post.user` — if they don't match, the request is rejected with `403 Forbidden`. This is what guarantees one user can never view another user's post data.

---

## 🗺️ Roadmap

Progress is tracked daily as part of my backend learning journey.

- [x] **Day 1** — Project setup, User schema, Register & Login routes
- [x] **Day 2** — Post schema, create-post route, learned cloud storage pattern for file uploads
- [x] **Day 3** — Real image upload via Multer + ImageKit, view own posts, view single post with owner-only access control
- [ ] **Day 4** — Extract auth logic into reusable middleware, logout route + token refresh
- [ ] **Day 5** — Like & comment functionality
- [ ] **Day 6** — Follow / unfollow system
- [ ] **Day 7+** — Explore page, notifications, direct messages

---

## 🧑‍💻 About This Project

This project is part of a **daily build-in-public backend journey**, where every feature is implemented from the ground up — no boilerplate templates, no shortcuts. The goal is to demonstrate real, hands-on understanding of:

- Secure authentication (hashing, JWT, cookies)
- Real file uploads and cloud storage integration
- Ownership-based authorization (users can only access their own data)
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