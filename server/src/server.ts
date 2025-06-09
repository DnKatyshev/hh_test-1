import express from "express";
import { createServer } from 'http';
import 'dotenv/config'
import cors from 'cors'
import router from './router/router'


// Express-server
const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: "*",
        credentials: true
    }
))
app.use('/server-side', router)


const server = createServer(app)
const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server is working on ${PORT} port`)
})
