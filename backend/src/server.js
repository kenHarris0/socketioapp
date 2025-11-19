import express from "express"
import dontenv from "dotenv"
dontenv.config() 
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from './routes/message.route.js'


const app=express()

const PORT=process.env.PORT || 3000


app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)


app.listen(PORT,()=>{
    console.log("server running")
})