import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './Routes/user.js'
import contactRouter from './Routes/Conatct.js'
import { config   } from 'dotenv';

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

// .env setup
config({path:'.env'})



//User Routes
app.use("/api/user",userRouter);
app.get("/",(req,res)=>{
    res.json({message:"Welcome to the API"});
})

//conatct Router
app.use("/api/contact",contactRouter)















mongoose.connect(process.env.MONGO_URL, {
    dbname: "NodeJS_Mastery_course",
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((err)=>{
    console.log(err);
});





const PORT =process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})


