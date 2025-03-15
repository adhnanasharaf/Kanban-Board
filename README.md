# Kanban Project Management App

## Overview

The **Kanban Project Management App** is a full-stack application designed to help teams and individuals efficiently manage projects using a Kanban board structure. Each **Board** represents a project, containing multiple **Lists** (e.g., To-Do, In Progress, Done), and each list contains **Cards** representing tasks within that phase.

## Features

- **Board Management:** Rendering different boards.
- **List Management:** Add lists for different project stages (To-Do, In Progress, Done, etc.).
- **Card Management:** Add, update, delete, and move tasks between lists.
- **Real-time Updates:** Smooth UI interactions for creating and updating tasks.
- **Responsive Design:** Fully adaptable UI for desktop and mobile views.
- **Persistent Storage:** Uses Prisma ORM with a backend to store all data.

---

## Tech Stack

### **Frontend:**

- **Framework:** React (with TypeScript)
- **State Management:** React hooks
- **Styling:** CSS
- **Build Tool:** Vite
- **HTTP Requests:** Axios

### **Backend:**

- **Framework:** Node.js with Express.js
- **Database:** SQLite (via Prisma ORM)
- **API Structure:** RESTful API with CRUD operations

---

## **Screenshots**  

### **1️⃣ Board View**  
Displays all lists inside a board.  

<img width="1406" alt="Screenshot 2025-03-15 at 11 34 08 AM" src="https://github.com/user-attachments/assets/d692d830-8e34-461a-b586-9efcea06bce4" />



### **2️⃣ Creating a New Card**  
Allows adding new tasks inside a list.  
<img width="293" alt="Screenshot 2025-03-15 at 11 34 23 AM" src="https://github.com/user-attachments/assets/d487a174-7bf5-4122-ad52-6c8cf073eab1" />




### **3️⃣ Lists Display**  
Shows different lists like **To-Do, In Progress, Done.**  
<img width="1429" alt="Screenshot 2025-03-15 at 11 33 49 AM" src="https://github.com/user-attachments/assets/c1a54b1f-b46f-43f9-bbce-6d7aae8d4675" />




## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/your-repo/kanban-app.git
cd kanban-app
```

### 2. Backend Setup

```sh
cd backend
npm install
```

- **Set up environment variables** in `.env`:

```sh
DATABASE_URL="file:./dev.db"
```

- **Run Database Migrations:**

```sh
npx prisma migrate dev --name init
```

- **Start the Backend Server:**

```sh
npm run dev
```

### 3. Frontend Setup

```sh
cd ../frontend
npm install
```

- **Start the Frontend App:**

```sh
npm run dev
```

---

## API Endpoints

### **Boards**

- `GET /api/boards` – Get all boards
- `POST /api/boards` – Create a new board
- `PUT /api/boards/:id` – Update a board
- `DELETE /api/boards/:id` – Delete a board

### **Lists**

- `GET /api/lists/:boardId` – Get lists for a board
- `POST /api/lists` – Create a new list
- `PUT /api/lists/:id` – Update a list
- `DELETE /api/lists/:id` – Delete a list

### **Cards**

- `GET /api/cards/:listId/cards` – Get cards for a list
- `POST /api/cards` – Create a new card
- `PUT /api/cards/:id` – Update a card
- `DELETE /api/cards/:id` – Delete a card

---

## Project Structure

```plaintext
kanban-app/
│── backend/        # Node.js, Express.js
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── prisma/
│   │   └── index.ts
│   ├── package.json
│   └── .env
│
│── frontend/       # React, TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
```

---

## Future Improvements

- Implement Drag & Drop functionality.
- Add User Authentication & Role Management.
- Improve UI animations and UX.

---

## Contributors

- **Adhnan A.** _(Lead Developer)_

---

## License

This project is licensed under the **MIT License**.
