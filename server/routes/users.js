const { Router } = require('express');
const { userSchema } = require("./schemas/usersSchema");
const { authenticateUser } = require("./middlewares/authMiddleware");
const db = require("../db");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = Router();

userRouter.post("/users/signup", async (req, res) => {
    const user = req.body;
    const result = userSchema.safeParse(user);
    if (!result.success){
        return res.status(400).json({
            success: false,
            error: "Bad Request",
        })
    }
    try{
        const { username, password } = result.data;
        const [users] = await db.execute(`select * from users where username = ?`, [username]);
        if (users.length !== 0 ){
            return res.status(409).send({
                success: false,
                error: "Conflict",
                message: "Username already exists",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [insertResult] = await db.execute(
            `INSERT INTO users (username, password) VALUES (?, ?)`,
            [username, hashedPassword]
        );
        const user_id = insertResult.insertId;
        const token = jwt.sign({userId: user_id}, process.env.JWT_SECRET_KEY);
        res.status(201).json({
            success: true,
            token,
            message: "User registered successfully.",
        });

    }catch(err){
        return res.status(500).send({
            success: false,
            error: "Internal Server Error",
            message: err.message
        })
    }
})

userRouter.post("/users/login", async (req, res) => {
    const body = req.body;
    const result = userSchema.safeParse(body);
    if (!result.success){
        return res.status(400).send({
            success: false,
            error: "Bad Request",
        })
    }
    try{
        const { username, password } = result.data;
        const [user] = await db.execute(`select * from users where username = ?`, [username]);
        if (user.length === 0 ){
            return res.status(404).send({
                success: false,
                error: "User not found"
            })
        }
        const user_ = user[0];
        const passwordIsValid = await bcrypt.compare(password, user_.password);
        if ( !passwordIsValid) {
            return res.status(401).send({
                success: false,
                error: "Invalid credentials"
            });
        }
        const token = jwt.sign({ userId: user_.id }, process.env.JWT_SECRET_KEY );
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token
        });
    }catch(err){
        return res.status(500).send({
            success: false,
            error: "Internal Server Error",
            message: err.message
        })
    }
})

userRouter.get("/users/current", authenticateUser, async (req, res) => {
    console.log("After Middleware");
    const userId = req.userId;
    try{
        const [users] = await db.execute(`select * from users where id = ?`, [userId]);
        if (users.length === 0 ){
            return res.status(404).send({
                success: false,
                error: "User not found"
            })
        }
        const user = users[0];
        return res.status(200).json({
            userId: user.id,
            username: user.username,
        });
    }catch (err){
        return res.status(500).send({
            success: false,
            error: "Internal Server Error",
            message: err.message
        })
    }
})

module.exports = userRouter;