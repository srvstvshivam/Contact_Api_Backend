import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './Routes/user.js';
import contactRouter from './Routes/Conatct.js';
import { config } from 'dotenv';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// .env setup
config({ path: '.env' });

// User Routes
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Contact Routes
app.use("/api/contact", contactRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  dbName: "NodeJS_Mastery_course",
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error(err));

// ✅ Use Render's dynamic PORT (fallback to 3000 locally)
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
});
