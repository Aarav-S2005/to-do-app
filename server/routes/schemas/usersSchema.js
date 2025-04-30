const { z } = require("zod");

const userSchema = z.object({
    username: z.string(),
    password: z.string()
}).required();

module.exports = { userSchema };