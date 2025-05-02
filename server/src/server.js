import express, { urlencoded } from "express";
import cors from 'cors'
const app = express();
import cookieParser from 'cookie-parser'
// import errorHandler from './utils/errorHandler.js'

app.use(cookieParser())

app.get("/", (req, res) => {
    res.send(req.cookies.accessToken)
    
})


// enable cors
app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.0.116:3000"],
    // origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], 
}));
// app.options("*", cors())


// middleware for parsing

app.use(express.json({limit: '50mb'}));
app.use(urlencoded({extended: true, limit: "50mb"}))
app.use(express.static("public"));


// imports
import userRouter from './route/user.route.js'
import videoRouter from './route/video.route.js'




app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)



// app.use(errorHandler)
export {app}