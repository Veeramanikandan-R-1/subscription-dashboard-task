# 🚀 Full Stack Subscription App

A full-stack application built with **Node.js + Express** (backend) and **React + Tailwind CSS** (frontend).  
It includes JWT authentication, role-based access (Admin/User), and subscription management.

---

## 📂 Project Structure

```

project-root/
│
├── server/                # Backend (Node.js + Express + MongoDB)
│   ├── package.json
│   ├── .env
│   ├── src/
│   │   ├── index.js
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── middleware/
│
├── client/                # Frontend (React + Tailwind)
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── store/
│       └── App.js
│
└── README.md

````

---

## ⚙️ **Setup Instructions**

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/subscription-app.git
cd subscription-app
````

---

## 🧩 **Backend Setup (Node.js + Express)**

### Navigate to server folder:

```bash
cd server
```

### Install dependencies:

```bash
npm install
```

### Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_access_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
```

> 📝 Example MongoDB connection string (from MongoDB Atlas):
>
> ```
> MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/test
> ```

### Seed Sample Plans (optional)

```bash
npm run seed
```

### Run backend server:

```bash
npm run dev
```

Server runs on:
👉 `http://localhost:5000`

---

## 🎨 **Frontend Setup (React + Tailwind CSS)**

### Navigate to client folder:

```bash
cd ../client
```

### Install dependencies:

```bash
npm install
```

### Run React app:

```bash
npm start
```

Frontend runs on:
👉 `http://localhost:3000`

---

## 🔐 **Authentication API Endpoints**

| Method | Endpoint                   | Description                | Access        |
| ------ | -------------------------- | -------------------------- | ------------- |
| POST   | `/api/auth/register`       | Register a new user        | Public        |
| POST   | `/api/auth/login`          | Login user & return tokens | Public        |
| GET    | `/api/plans`               | Get all plans              | Public        |
| POST   | `/api/subscribe/:planId`   | Subscribe to a plan        | Authenticated |
| GET    | `/api/my-subscription`     | Get logged-in user’s plan  | Authenticated |
| GET    | `/api/admin/subscriptions` | List all subscriptions     | Admin only    |

---

## 🧠 **Frontend Pages**

| Route                  | Description                             |
| ---------------------- | --------------------------------------- |
| `/register`            | User registration                       |
| `/login`               | User login                              |
| `/plans`               | List of available plans                 |
| `/dashboard`           | User dashboard with active subscription |
| `/admin/subscriptions` | Admin-only subscriptions list           |

---

## 🧰 **Tech Stack**

### Backend:

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Joi for validation

### Frontend:

* React.js (CRA)
* Redux Toolkit / Zustand
* Tailwind CSS
* Axios

---

## 🧪 **Common Commands**

### Start backend only

```bash
cd server && npm run dev
```

### Start frontend only

```bash
cd client && npm start
```

### Run both (using 2 terminals)

1. **Terminal 1:**

   ```bash
   cd server && npm run dev
   ```
2. **Terminal 2:**

   ```bash
   cd client && npm start
   ```

---

## 🌐 **Environment Tips**

* Make sure MongoDB is accessible from your IP in Atlas.
* Use unique JWT secrets.
* Always start server before frontend.
* Frontend `.env` can include:

  ```
  REACT_APP_API_BASE_URL=http://localhost:5000
  ```

---

## ✅ **Test Setup**

Once both are running:

* Open [http://localhost:3000](http://localhost:3000)
* Register a new user.
* Login and view available plans.
* Subscribe to a plan.
* Check admin dashboard (login as admin).

---

## 🧑‍💻 Author

**Veeramanikandan R**
Frontend & Full Stack Developer
📧 [r.veeramanikandany216@gmail.com](mailto:r.veeramanikandany216@gmail.com)
🔗 [GitHub](https://github.com/Veeramanikandan-R-1)

---

## 🏁 License

This project is licensed under the **MIT License** — free to use and modify.

