// Here we will only connect the Database and run the server
import { config } from "dotenv";
config();

import { app } from "./server.js";
import connectDB from "./db/index.js";


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT} got to  http://localhost:8000`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
