# Task Management Feature

## 🚀 Overview

This is a **Task Management** feature built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. Users can create, update, delete, and track tasks seamlessly with an intuitive UI and a robust backend API.

## 🎯 Features

- 📌 **Create, edit, and delete tasks**
- ✅ **Mark tasks as complete or pending**
- 🔍 **Search and filter tasks by status**
- 🔐 **User authentication with JWT (Optional)**
- 📊 **Responsive UI built with React & Tailwind CSS**
- 🚀 **Deployed for easy access (Optional)**

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

## 📜 API Documentation

{
"info": {
"\_postman_id": "2d3f1aac-f3e7-4cc9-b890-d28643fbacde",
"name": "Cheetah",
"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
"\_exporter_id": "33012146"
},
"item": [
{
"name": "User",
"item": [
{
"name": "Registration",
"request": {
"method": "POST",
"header": [],
"body": {
"mode": "formdata",
"formdata": []
},
"url": {
"raw": "https://cheetah-production.up.railway.app/api/v1/register",
"host": ["localhost"],
"port": "4000",
"path": ["api", "v1", "register"]
}
},
"response": [
{
"success": true,
"message": "User registered successfully",
"users": {
"name": "Nayab",
"email": "kjnayab@gmail.com",
"password": "$2b$10$YwlYaWIlyXZzB0UokYa59ew0GrAf8n60lQrgBuqZ/ar5gIFpZwqUK",
"tasks": [],
"\_id": "660e69db4c426ef83d241c9f",
"**v": 0
}
}
]
},
{
"name": "Login",
"request": {
"method": "POST",
"header": [],
"body": {
"mode": "raw",
"raw": "{\r\n \"email\": \"nayab@gmail.com\",\r\n \"password\": \"Nayab1122\"\r\n}\r\n",
"options": {
"raw": {
"language": "json"
}
}
},
"url": {
"raw": "https://cheetah-production.up.railway.app/api/v1/login",
"host": ["localhost"],
"port": "4000",
"path": ["api", "v1", "login"]
}
},
"response": [
{
"success": true,
"authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwYmJkNGY4M2RlM2U4NDZkNzdmMTRiIn0sImlhdCI6MTcxMjIyMDA0NH0.sDhqeoYS5glXfl7PM0R9Hv2h1R13tFomS9TT8uRRcd8",
"user": {
"\_id": "660bbd4f83de3e846d77f14b",
"name": "Nayab",
"email": "nayab@gmail.com",
"password": "$2b$10$FrU4wZ/yFVjtCvD.hx9bCeOtXcUaLqeSbRP.18V5hB9cK2yXExQL2",
"tasks": [
"660bd04d5215339adb4a81e9",
"660cf4415808622bda771acf",
"660cfd432f355ad03bee2671",
"660cff2c2f355ad03bee2690",
"660cff2f2f355ad03bee2697",
"660cffe72f355ad03bee26aa",
"660d00222f355ad03bee26b1",
"660d03412f355ad03bee26f4",
"660d034a2f355ad03bee26fe",
"660ddc3eb7ff36990263a271",
"660e041a71aa2c1611b99f82"
],
"**v": 30
}
}
]
},
{
"name": "logout",
"request": {
"method": "GET",
"header": [],
"url": {
"raw": "https://cheetah-production.up.railway.app/api/v1/logout",
"host": ["localhost"],
"port": "4000",
"path": ["api", "v1", "logout"]
}
},
"response": [
{
"success": true,
"message": "Logged Out"
}
]
}
]
},
{
"name": "Tasks",
"item": [
{
"name": "All Tasks",
"request": {
"method": "GET",
"header": [],
"url": {
"raw": "https://cheetah-production.up.railway.app/api/v1/tasks",
"host": ["localhost"],
"port": "4000",
"path": ["api", "v1", "tasks"]
}
},
"response": [
{
"success": true,
"tasks": [
{
"_id": "660e6568d9b2bfeb7c77fb6f",
"description": "description of task 1",
"completed": false,
"createAt": "2024-04-04T08:31:36.082Z",
"__v": 0
},
{
"_id": "660e6579d9b2bfeb7c77fb7b",
"description": "description of task 3 is updated",
"completed": false,
"createAt": "2024-04-04T08:31:53.589Z",
"__v": 0
},
{
"_id": "660e6580d9b2bfeb7c77fb82",
"description": "description of task 3",
"completed": false,
"createAt": "2024-04-04T08:32:00.255Z",
"__v": 0
}
]
}
]
},
{
"name": "Create Task",
"request": {
"method": "POST",
"header": [],
"body": {
"mode": "raw",
"raw": "{\r\n \"description\":\"description of task 3\"\r\n}",
"options": {
"raw": {
"language": "json"
}
}
},
"url": {
"raw": "https://cheetah-production.up.railway.app/api/v1/createtasks",
"host": ["localhost"],
"port": "4000",
"path": ["api", "v1", "createtasks"]
}
},
"response": [
{
"success": true,
"message": "Task created successfully",
"result": {
"description": "description of task 3",
"completed": false,
"_id": "660e6580d9b2bfeb7c77fb82",
"createAt": "2024-04-04T08:32:00.255Z",
"__v": 0
}
}
]
},
{
"name": "Update task",
"request": {
"method": "PUT",
"header": [],
"body": {
"mode": "raw",
"raw": "{\r\n \"description\":\"description of task 3 is updated\"\r\n}",
"options": {
"raw": {
"language": "json"
}
}
},
"url": {
"raw": "https://cheetah-production.up.railway.app/api/v1/updatetask/660e6579d9b2bfeb7c77fb7b",
"host": ["localhost"],
"port": "4000",
"path": ["api", "v1", "updatetask", "660e6579d9b2bfeb7c77fb7b"]
}
},
"response": [
{
"success": true,
"message": "Task successfully updated"
}
]
},
{
"name": "Task Detail",
"request": {
"method": "GET",
"header": [],
"url": {
"raw": "localhost:4000/api/v1/task/660e6579d9b2bfeb7c77fb7b",
"host": ["localhost"],
"port": "4000",
"path": ["api", "v1", "task", "660e6579d9b2bfeb7c77fb7b"]
}
},
"response": [
{
"success": true,
"result": {
"_id": "660e6579d9b2bfeb7c77fb7b",
"description": "description of task 3 is updated",
"completed": false,
"createAt": "2024-04-04T08:31:53.589Z",
"__v": 0
}
}
]
},
{
"name": "delete task",
"request": {
"method": "DELETE",
"header": [],
"url": {
"raw": "https://cheetah-production.up.railway.app/api/v1/deletetask/660bcfc73c138773b6ecc543",
"host": ["localhost"],
"port": "4000",
"path": ["api", "v1", "deletetask", "660bcfc73c138773b6ecc543"]
}
},
"response": [
{
"success": true,
"message": "Task Deleted"
}
]
},
{
"name": "complete task",
"request": {
"method": "GET",
"header": [],
"url": {
"raw": "https://cheetah-production.up.railway.app/api/v1/complete/660e6579d9b2bfeb7c77fb7b",
"host": ["localhost"],
"port": "4000",
"path": ["api", "v1", "complete", "660e6579d9b2bfeb7c77fb7b"]
}
},
"response": [
{
"success": true,
"result": {
"_id": "660e6579d9b2bfeb7c77fb7b",
"description": "description of task 3 is updated",
"completed": true,
"createAt": "2024-04-04T08:31:53.589Z",
"__v": 0
}
}
]
}
]
}
]
}
