# Task Management Feature

## 🚀 Overview

This is a **Task Management** feature built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. Users can create, update, delete, and track tasks seamlessly with an intuitive UI and a robust backend API.

## 🎯 Features

- 📌 **Create, edit, and delete tasks**
- ✅ **Mark tasks as complete or pending**
- 🔍 **Search and filter tasks by status**
- 🔐 **User authentication with JWT**
- 📊 **Responsive UI built with React & Tailwind CSS**

---

## 🛠️ Tech Stack

### **Frontend**

- React.js ⚛️
- Tailwind CSS 🎨

### **Backend**

- Node.js 🌐
- Express.js 🚀
- MongoDB & Mongoose 🗄️
- JWT Authentication 🔑

## 📌 Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/TheNayab/Sprouto-Group-Task
cd sprotus task
```

### **2️⃣ Install Dependencies**

#### Backend:

```bash
cd backend
npm install
```

#### Frontend:

```bash
cd frontend
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env` file in the **backend** directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **4️⃣ Run the Application**

#### Backend:

```bash
npm start
```

#### Frontend:

```bash
npm start
```

---

## 📡 API Endpoints

### **Task Routes**

| Method | Endpoint          | Description                                    |
| ------ | ----------------- | ---------------------------------------------- |
| POST   | `/createtasks`    | Create a new task                              |
| GET    | `/tasks`          | Fetch all tasks                                |
| GET    | `/task/:id`       | Fetch a single task                            |
| PUT    | `/updatetask/:id` | Update a task (edit details, mark as complete) |
| OUT    | `/status/:id`     | Status a task                                  |
| DELETE | `/deletetask/:id` | Delete a task                                  |
| GET    | `/search`         | search tasks                                   |

### **Authentication Routes (Optional)**

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/auth/registration` | Register a new user |
| POST   | `/auth/login`        | User login          |
| GET    | `/auth/logout`       | User logout         |

# Task Management API Documentation

## Overview
This API provides endpoints for user authentication and task management. Users can register, log in, create, update, delete, and mark tasks as completed.

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
### Register a User
**Endpoint:** `POST /register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "tasks": [],
    "_id": "660e69db4c426ef83d241c9f"
  }
}
```

### User Login
**Endpoint:** `POST /login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "authToken": "your_jwt_token",
  "user": {
    "_id": "660bbd4f83de3e846d77f14b",
    "name": "John Doe",
    "email": "john@example.com",
    "tasks": []
  }
}
```

### Logout
**Endpoint:** `GET /logout`

**Response:**
```json
{
  "success": true,
  "message": "Logged Out"
}
```

## Task Management
### Fetch All Tasks
**Endpoint:** `GET /tasks`

**Response:**
```json
{
  "success": true,
  "tasks": [
    {
      "_id": "660e6568d9b2bfeb7c77fb6f",
      "description": "Task 1 description",
      "completed": false
    }
  ]
}
```

### Create a Task
**Endpoint:** `POST /createtask`

**Request Body:**
```json
{
  "description": "New task description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "result": {
    "description": "New task description",
    "completed": false,
    "_id": "660e6580d9b2bfeb7c77fb82"
  }
}
```

### Update a Task
**Endpoint:** `PUT /updatetask/:id`

**Request Body:**
```json
{
  "description": "Updated task description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task successfully updated"
}
```

### Delete a Task
**Endpoint:** `DELETE /deletetask/:id`

**Response:**
```json
{
  "success": true,
  "message": "Task Deleted"
}
```

### Mark Task as Completed
**Endpoint:** `GET /complete/:id`

**Response:**
```json
{
  "success": true,
  "result": {
    "_id": "660e6579d9b2bfeb7c77fb7b",
    "description": "Updated task description",
    "completed": true
  }
}
```

## Notes
- All protected routes require a valid JWT token in the `Authorization` header as `Bearer <token>`.
- Ensure MongoDB is running before testing the API.
- You can use tools like Postman to interact with the API.