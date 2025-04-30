const { z } = require("zod");

const todoAddSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    completed: z.boolean().default(false),
    dueDate: z.string().refine(val => /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: "Invalid date format, expected YYYY-MM-DD"
    }).optional()
});

const todoUpdateSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    dueDate: z.string().refine(val => /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: "Invalid date format, expected YYYY-MM-DD"
    }).optional()
})

module.exports = { todoAddSchema, todoUpdateSchema };