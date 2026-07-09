# 📘 Today Learning

> **Day 12** — Backend Security & Authentication Deep Dive
> 📅 Date: *09 July 2026*
> 🏷️ Tags: `#jwt` `#authentication` `#authorization` `#nodejs` `#backend`

---

## 📑 Table of Contents

1. [Summary](#-summary)
2. [JWT Secret](#-jwt-secret)
3. [Token — What You Get on Registration](#-token--what-you-get-on-registration)
4. [Authentication — Deep Dive](#-authentication--deep-dive)
5. [Authentication vs Authorization vs Validation vs Verification](#-authentication-vs-authorization-vs-validation-vs-verification)
6. [Code I Wrote Today](#-code-i-wrote-today)
7. [Key Takeaways](#-key-takeaways)
8. [Interview Questions to Revise](#-interview-questions-to-revise)
9. [Next Steps](#-next-steps)

---

## 🧠 Summary

Today I went deeper into **backend security fundamentals**. I learned how a `JWT_SECRET` is used to sign and verify tokens, how a token is generated the moment a user registers, and how **authentication** actually works end‑to‑end on the server. I also cleared up the difference between four terms that are often confused: **authentication, authorization, validation, and verification**. Finally, I wrote and tested the code myself instead of just reading theory.

---

## 🔑 JWT Secret

The `JWT_SECRET` is a **private key stored on the server** (usually in a `.env` file) used to **sign** and **verify** JWT tokens.

```env
# .env
JWT_SECRET=your_super_long_random_string_here
JWT_EXPIRES_IN=7d
```

### Why it matters

| Point | Explanation |
|---|---|
| 🔒 **Never exposed** | It must stay only on the server — never sent to the client |
| ✍️ **Used to sign** | When a token is created, the secret generates the signature |
| ✅ **Used to verify** | When a token comes back, the server re-checks the signature with the same secret |
| 🚫 **If leaked** | Anyone can forge fake tokens and impersonate any user |

> **Rule of thumb:** treat `JWT_SECRET` like a password — long, random, and stored only in environment variables, never hardcoded or committed to Git.

---

## 🎟️ Token — What You Get on Registration

When a user **registers** (or logs in), the server creates a **JWT token** and sends it back. This token acts like a **digital ID card** for that user.

```
Register/Login → Server verifies data → jwt.sign() creates token → Token sent to client
```

```js
const token = jwt.sign(
  { id: user._id, email: user.email }, // payload
  process.env.JWT_SECRET,               // secret
  { expiresIn: "7d" }                   // options
);
```

- The token is sent back in the **response**, usually inside a cookie or the JSON body.
- The client stores it and sends it back on every future request to prove *"this is me."*
- The server never needs to store this token — that's what makes it **stateless**.

---

## 🔐 Authentication — Deep Dive

**Authentication = proving WHO you are.**

### Full flow, step by step

1. **User submits credentials** (email + password) at login/register.
2. **Server checks the database** for a matching user.
3. **Password is compared** using a hash comparison (never plain text).
4. If it matches → server **creates a JWT** using `JWT_SECRET`.
5. Token is sent to the client (cookie / header / body).
6. On every future request, the client **attaches the token**.
7. Server runs **middleware** to `jwt.verify()` the token before allowing access.
8. If valid → request proceeds. If invalid/expired → `401 Unauthorized`.

```js
// auth.middleware.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
```

> 💡 **Insight:** Authentication happens **once at login**, but the token is checked on **every protected route** afterward.

---

## ⚖️ Authentication vs Authorization vs Validation vs Verification

These four words sound similar but mean very different things. Today I finally locked in the difference:

| Term | Question it Answers | Example | When it Happens |
|---|---|---|---|
| **Validation** | *"Is the data in the correct format?"* | Email has `@`, password ≥ 8 characters | Before saving/processing data |
| **Authentication** | *"Who are you?"* | Login with email + password → identity confirmed | At login / on protected routes |
| **Authorization** | *"What are you allowed to do?"* | Only `admin` role can delete a user | After authentication succeeds |
| **Verification** | *"Is this really you / is this real?"* | OTP confirmation, email verification link | After registration, before full access |

### Simple mental model

```
Validation     →  Is the input clean and correctly formatted?
Verification   →  Is this identity/action genuinely confirmed (OTP, email link)?
Authentication →  Who is making this request?
Authorization  →  What is this authenticated user allowed to do?
```

**Quick example — real signup flow:**

1. User fills form → **Validation** checks the email/password format.
2. User submits → account created, verification email sent → **Verification** confirms the email is real.
3. User logs in → **Authentication** confirms identity via JWT.
4. User tries to access `/admin` → **Authorization** checks if their role allows it.

---

## 💻 Code I Wrote Today

```js
// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" })
      .status(201)
      .json({ message: "Registered successfully", user: { id: newUser._id, email } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res
      .cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
```

**What I tested:**
- ✅ Registered a new user → password hashed → token generated
- ✅ Logged in with correct credentials → token returned in cookie
- ✅ Tried a protected route without token → got `401 Unauthorized`
- ✅ Tried a protected route with valid token → request passed successfully

---

## 🎯 Key Takeaways

- `JWT_SECRET` is the backbone of trust — it must **never leave the server**.
- A token is created **once**, sent to the client, and reused on every request — this is what makes JWT **stateless**.
- Authentication happens through a **middleware layer**, not manually on every route.
- **Validation, Verification, Authentication, and Authorization** are four separate checkpoints, each solving a different problem — mixing them up leads to security holes.
- Real apps run these checks **in a specific order**: Validate → Verify → Authenticate → Authorize.

---

## ❓ Interview Questions to Revise

- [ ] What happens if `JWT_SECRET` gets leaked?
- [ ] Why is JWT called "stateless" authentication?
- [ ] Difference between authentication and authorization with a real example?
- [ ] Why hash passwords before storing, and why hashing ≠ encryption?
- [ ] What is the role of middleware in an Express authentication flow?
- [ ] Where should a JWT be stored — cookie vs localStorage — and why?

---

## 🚀 Next Steps

- [ ] Implement **refresh tokens** for auto login without re-entering password
- [ ] Add **role-based authorization** middleware (`admin`, `user`)
- [ ] Explore **rate limiting** to prevent brute-force login attempts
- [ ] Study **OAuth 2.0** as an alternative to custom JWT auth

---

*🗂️ Logged as part of my daily backend learning journal — Day 12.*
