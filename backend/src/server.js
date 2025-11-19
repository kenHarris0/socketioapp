import express from "express"
import dontenv from "dotenv"
dontenv.config() 
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from './routes/message.route.js'
import path from "path"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"


const app=express()
const __dirname=path.resolve()

const PORT=process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)


//for deployment
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
      res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    })
}

app.listen(PORT,()=>{
  connectDB()
    console.log("server running")
})