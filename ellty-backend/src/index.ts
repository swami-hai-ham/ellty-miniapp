import express from "express"
import cors from "cors"
import authRouter from "./routers/auth.routes.js"
import postRouter from "./routers/post.routes.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import { env } from "./config/config.js"

const app = express();
const PORT = env.PORT || 3000;
app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/', postRouter)

app.use(errorHandler)
app.listen(PORT, () => console.log("server running"))
