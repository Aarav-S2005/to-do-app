const { Router } = require('express');
const { todoAddSchema, todoUpdateSchema} = require("./schemas/todoSchema")
const { authenticateUser } = require('./middlewares/authMiddleware');
const db = require("../db");

const todoRouter = Router();

todoRouter.use(authenticateUser);

todoRouter.get("/lists/:listId/todos", async (req, res) => {
    const userId = req.userId;

    const  listId  = parseInt(req.params.listId);
    try {
        const [todos] = await db.execute(
            `SELECT t.* FROM todos t
             JOIN lists l ON t.list_id = l.id
             WHERE t.list_id = ? AND l.user_id = ?`,
            [listId, userId]
        );

        if (todos.length === 0) {
            return res.status(404).json({
                error: "No todos found for this list",
            });
        }
        res.status(200).json(todos);
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
});

todoRouter.post("/lists/:listId/todos", async (req, res) => {
    const todo = req.body;
    const result = todoAddSchema.safeParse(todo);
    const  listId  = parseInt(req.params.listId);
    const userId = req.userId;
    if (!result.success){
        return res.status(400).json({
            error: "Bad request",
        })
    }
    const { title, description = null, completed = false, dueDate = null } = result.data;

    try {
        const [lists] = await db.execute(
            `SELECT * FROM lists WHERE id = ? AND user_id = ?`,
            [listId, userId]
        );
        if (lists.length === 0) {
            return res.status(403).json({ error: "Unauthorized or list not found" });
        }
        await db.execute(`INSERT INTO todos (list_id, title, description, completed, due_date)
                          VALUES (?, ?, ?, ?, ?)`,
            [listId, title, description, completed, dueDate]
        )
        return res.status(201).send("success");

    }catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        })
    }
});

todoRouter.put("/lists/:listId/todos/:todoId", async (req, res) => {

    const  listId  = parseInt(req.params.listId);
    const  todoId  = parseInt(req.params.todoId);
    const userId = req.userId;
    const todo = req.body;
    const result = todoUpdateSchema.safeParse(todo);
    if (!result.success){
        return res.status(400).json({
            error: "Bad request"
        })
    }
    const { title, description, completed, dueDate } = result.data;

    try{
        const [ todoPresent ] = await db.execute(
            `SELECT * FROM todos t JOIN lists l on t.list_id = l.id
             WHERE t.id = ? AND t.list_id = ? AND l.user_id = ?;`,
            [todoId, listId, userId]
        )
        if (todoPresent.length === 0){
            return res.status(404).json({
                error: "Todo not found"
            })
        }
        await db.execute(`
            update todos 
            set title = COALESCE(?, title),
                description = COALESCE(?, description),
                completed = COALESCE(?, completed),
                due_date = COALESCE(?, due_date)
            WHERE id = ? AND list_id = ?;`, [
            title || null,
            description || null,
            completed !== undefined ? completed : null,
            dueDate || null,
            todoId,
            listId
        ])
        return res.status(200).send("success");
    }catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        })
    }
})

todoRouter.delete("/lists/:listId/todos/:todoId", async (req, res) => {

    const  listId  = parseInt(req.params.listId);
    const  todoId  = parseInt(req.params.todoId);
    const userId = req.userId;

    try{
        const [ todoPresent ] = await db.execute(
            `SELECT * FROM todos t JOIN lists l on t.list_id = l.id
             WHERE t.id = ? AND t.list_id = ? AND l.user_id = ?;`,
            [todoId, listId, userId]
        )
        if (todoPresent.length === 0){
            return res.status(404).json({
                error: "Todo not found"
            })
        }
        await db.execute(`
            delete from todos where id = ? and list_id = ?;
        `, [ todoId, listId ])
        return res.status(200).send("success");
    }catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        })
    }
})

todoRouter.get("/lists/:listId/todos/:todoId", async (req, res) => {
    const  listId  = parseInt(req.params.listId);
    const  todoId  = parseInt(req.params.todoId);
    const userId = req.userId;
    try{
        const [ todoPresent ] = await db.execute(
            `SELECT * FROM todos t JOIN lists l on t.list_id = l.id
             WHERE t.id = ? AND t.list_id = ? AND l.user_id = ?;`,
            [todoId, listId, userId]
        )
        if (todoPresent.length === 0){
            return res.status(404).json({
                error: "Todo not found"
            })
        }
        return res.status(200).json(todoPresent[0]);
    }catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        })
    }
})

module.exports = todoRouter;