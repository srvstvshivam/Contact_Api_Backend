import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/user.js';
import contactRouter from './Routes/Contact.js';
import { config } from 'dotenv';

const app = express();

// Load .env
config({ path: '.env' });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  dbName: "NodeJS_Mastery_course",
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
