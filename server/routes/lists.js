const { Router } = require('express');
const authenticateUser = require('./middlewares/authMiddleware');
const db = require("../db");

const listRouter = Router();

listRouter.use(authenticateUser);

listRouter.get("/lists", async (req, res) => {
    const userId = req.userId;
    try{
        const [lists] = await db.execute(`select * from lists where user_id = ?;`, [userId]);
        if (!lists) {
            return res.status(200).json({
                lists: [],
                message: "No lists found."
            })
        }
        return res.status(200).json(lists);
    }catch(err){
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message
        })
    }
})

listRouter.post("/lists", async (req, res) => {
    const userId = req.userId;

    const { title } = req.body;
    try {
        const [result] = await db.execute(`insert into lists( title, user_id) values(?, ?);`, [ title, userId]);

        return res.status(201).json({
            success: true,
            message: "List inserted successfully.",
            newID: result.insertId
        })
    }catch (err){
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message
        })
    }
})

listRouter.get('/lists/:listId', async (req, res) => {
    const userId = req.userId;
    const  listId  = parseInt(req.params.listId);
    try{
        const [list] = await db.execute(`select * from lists where user_id = ? and id = ?;`, [userId, listId]);
        if (list.length === 0) {
            return res.status(404).json({
                error: "No lists found."
            })
        }
        return res.status(200).json(list[0]);
    }catch(err){
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message
        })
    }
})

listRouter.put("/lists/:listId", async (req, res) => {
    const userId = req.userId;
    const  listId  = parseInt(req.params.listId);
    try{
        const [list] = await db.execute(`select * from lists where user_id = ? and id = ?;`, [userId, listId]);
        if (list.length === 0) {
            return res.status(404).json({
                error: "List not found."
            })
        }
        const { title } = req.body;
        await db.execute(`update lists set title = ? where user_id = ? and id = ?;`, [ title, userId, listId]);
        return res.status(200).json({
            success: true,
            message: "List updated successfully."
        })
    }catch (err){
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message
        })
    }
})

listRouter.delete("/lists/:listId", async (req, res) => {
    const userId = req.userId;
    const  listId  = parseInt(req.params.listId);
    try{
        const [list] = await db.execute(`select * from lists where user_id = ? and id = ?;`, [userId, listId]);
        if (list.length === 0) {
            return res.status(404).json({
                error: "List not found."
            })
        }
        await db.execute(`delete from lists where user_id = ? and id = ?;`, [ userId, listId]);
        return res.status(200).json({
            success: true,
            message: "List deleted successfully."
        })
    }catch (err){
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message
        })
    }
})

module.exports = listRouter;