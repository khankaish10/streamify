import express, { urlencoded } from "express";
import cors from 'cors'
const app = express();
import cookieParser from 'cookie-parser'


app.get("/", (req, res) => {
    res.send("App is running .....")
})

// enable cors
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));


// middleware for parsing
app.use(express.json({limit: '50mb'}));
app.use(urlencoded({extended: true, limit: "50mb"}))
app.use(express.static("public"));
app.use(cookieParser())


// imports
import userRouter from './route/user.route.js'
import videoRouter from './route/video.route.js'




app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)




export {app}