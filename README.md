
# DriftBox – Cloud Storage Backend

DriftBox is a backend service developed using **Node.js**, **Express**, and **MongoDB**, designed to handle file storage operations such as uploading, retrieving, and listing files. It can be used as a simple cloud storage mobile applications.

---

## Features

* Upload and store files via REST API
* Retrieve files by ID or path
* Store metadata in MongoDB
* Organized folder structure for scalability

---

## Technologies Used

* Node.js
* Express.js
* MongoDB (via Mongoose)
* Multer (for handling file uploads)
* dotenv (for environment configuration)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vankunavath0/DriftBox.git
cd DriftBox/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongo_connection_string
PORT=5000
```

### 4. Start the server

```bash
npm start
```

The server will run at `http://localhost:5000`

---


