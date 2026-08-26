# 📸 Insta Clone

### A simple Instagram clone backend, built step by step.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat\&logo=node.js\&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat\&logo=express\&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat\&logo=mongodb\&logoColor=white)](#)
[![JWT](https://img.shields.io/badge/Auth-JWT-black?style=flat\&logo=jsonwebtokens)](#)
[![ImageKit](https://img.shields.io/badge/Storage-ImageKit-FF7A5C?style=flat)](#)
[![Status](https://img.shields.io/badge/status-in--progress-yellow)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#)

---

## 📖 About

**Insta Clone** is a backend project that recreates the core features of Instagram. It's built to learn real backend concepts — authentication, database design, REST APIs, file uploads, social interactions, and access control — one feature at a time.

Everything here is written and tested by hand, with progress tracked day by day.

> 🚧 Still in progress. See the [Roadmap](#-roadmap) for where things stand.

---

## ✨ Features

### ✅ Done

* User registration with hashed passwords (`bcrypt`)
* Login with username or email
* JWT authentication using secure `httpOnly` cookies
* Reusable **auth middleware** to protect routes
* Post creation with real image upload (`multer` → `ImageKit`)
* View all of your own posts
* View a single post by ID
* Ownership check — protected resources cannot be accessed by unauthorized users
* **Like / unlike posts**
* **Follow / unfollow users**
* Authentication-protected social interactions
* User-to-user relationship handling
* Post-to-user like relationship handling

### 🔜 Coming Next

* Logout route + token refresh
* Comment system
* User profile improvements
* Feed — posts from followed users
* Search / explore users
* Direct messaging
* Stories
* Notifications

---

## 🛠️ Tech Stack

| Layer         | Technology              |
| ------------- | ----------------------- |
| Runtime       | Node.js                 |
| Framework     | Express.js              |
| Database      | MongoDB + Mongoose      |
| Auth          | JWT + bcrypt            |
| File Upload   | Multer (memory storage) |
| Image Storage | ImageKit                |
| Config        | dotenv                  |
| API Testing   | Postman                 |

---

## 📁 Project Structure

```text
Day 14_3_INSTAClone/
├── config/
│   └── database.js             # MongoDB connection
├── controllers/
│   ├── auth.controller.js      # Auth logic
│   └── post.controller.js      # Post logic
├── middlewares/
│   └── auth.middleware.js      # JWT verification, reused across routes
├── models/
│   ├── user.model.js           # User schema
│   └── post.model.js           # Post schema
├── routes/
│   ├── auth.routes.js          # /api/auth routes
│   └── post.routes.js          # /api/posts routes
├── src/
│   └── app.js                  # Express app setup
├── .env                        # Environment variables (not committed)
├── .gitignore
├── package.json
├── package-lock.json
└── server.js                   # Entry point
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18+
* MongoDB (local or Atlas)
* An [ImageKit](https://imagekit.io/) account

### Setup

```bash
git clone https://github.com/your-username/Day14_3_INSTAClone.git
cd Day14_3_INSTAClone
npm install
touch .env
```

### Environment Variables

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### Run

```bash
npm run dev
```

Runs on `http://localhost:3000`

---

## 📡 API Reference

### Auth — `/api/auth`

| Method | Endpoint    | Description                  | Auth Required |
| ------ | ----------- | ---------------------------- | ------------- |
| POST   | `/register` | Register a new user          | No            |
| POST   | `/login`    | Login with username or email | No            |

### Posts — `/api/posts`

| Method | Endpoint          | Description                     | Auth Required |
| ------ | ----------------- | ------------------------------- | ------------- |
| POST   | `/`               | Create a post with image upload | Yes           |
| GET    | `/`               | Get your own posts              | Yes           |
| GET    | `/:postId`        | Get one post                    | Yes           |
| POST   | `/:postId/like`   | Like a post                     | Yes           |
| POST   | `/:postId/unlike` | Unlike a post                   | Yes           |

### Users — Follow System

| Method | Endpoint            | Description     | Auth Required |
| ------ | ------------------- | --------------- | ------------- |
| POST   | `/:userId/follow`   | Follow a user   | Yes           |
| POST   | `/:userId/unfollow` | Unfollow a user | Yes           |

> **Note:** Update the endpoint paths above if your actual route names are different.

---

## 🧬 Data Model

### User

| Field          | Type       | Notes                            |
| -------------- | ---------- | -------------------------------- |
| `username`     | String     | required, unique                 |
| `email`        | String     | required, unique                 |
| `password`     | String     | required, stored as bcrypt hash  |
| `bio`          | String     | optional                         |
| `profileImage` | String     | defaults to a placeholder avatar |
| `followers`    | [ObjectId] | users following this user        |
| `following`    | [ObjectId] | users this user follows          |

### Post

| Field     | Type                    | Notes                         |
| --------- | ----------------------- | ----------------------------- |
| `caption` | String                  | optional, defaults to `""`    |
| `imgUrl`  | String                  | required — ImageKit URL       |
| `user`    | ObjectId (ref: `users`) | required — taken from the JWT |
| `likes`   | [ObjectId]              | users who liked the post      |

> 🔐 Every post is linked to the `_id` of its creator.

> ❤️ Likes are associated with users, allowing the backend to track which users have liked a post.

> 👥 Follow relationships are maintained between users using their MongoDB ObjectIds.

> 🔒 Protected actions use the shared JWT authentication middleware, so the server identifies the logged-in user from the authenticated request instead of trusting user identity sent by the client.

---

## 🗺️ Roadmap

* [x] **Day 1** — Project setup, User schema, Register & Login
* [x] **Day 2** — Post schema, create-post route, cloud storage pattern
* [x] **Day 3** — Image upload via Multer + ImageKit, view own posts, owner-only access
* [x] **Day 4** — Reusable auth middleware
* [x] **Day 5** — Like & unlike functionality
* [x] **Day 6** — Follow / unfollow system
* [ ] **Day 7** — Logout route + token refresh
* [ ] **Day 8** — Comment system
* [ ] **Day 9** — User profile improvements
* [ ] **Day 10+** — Feed, Explore, notifications, direct messages, and stories

---

## 🧑‍💻 About

This is part of a daily build-in-public backend project — every feature built from scratch, no templates.

The focus is on:

* Secure authentication (hashing, JWT, cookies)
* Real file uploads with cloud storage
* Ownership-based access control
* Social interactions and user relationships
* Like / unlike functionality
* Follow / unfollow functionality
* Clean, scalable folder structure
* RESTful API design
* Database schema design
* Building backend features incrementally

---

## 🤝 Contributing

Solo learning project for now, but feedback and pull requests are welcome.

---

## 📄 License

MIT License.

---

<div align="center">

**⭐ Recruiter or fellow dev checking this out — thanks for stopping by!**

</div>
