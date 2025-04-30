const { z } = require("zod")

const listSchema = z.object({
    title: z.string()
}).required();

module.exports = { listSchema }
