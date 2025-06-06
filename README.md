# **Simple Todo-App**

## Prerequisites

> 1. mysql
> 2. nodejs

## Set-up

- Create a database in mysql named todo_app and run the following query
```
use todo_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE lists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  list_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  due_date DATE,
  FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
);

```
  

- In server directory, create a .env file
```aiignore
DB_HOST=localhost
DB_USER=<username>
DB_PASSWORD=<password>
DB_NAME=<database name>
PORT=<Port number>
JWT_SECRET_KEY=<secret jwt key>
```
- in client directory, create a .env file
```
VITE_API_URL=http://localhost:<PORT number>/api/
```

## How to install and run

- frontend
```
cd client
npm install
npm run dev
```
- backend
```
cd server
npm install
node index.js
```

