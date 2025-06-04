# **Simple Todo-App**

## Prerequisites

> 1. mysql
> 2. nodejs

## Set-up

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

