import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuthenticate = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) return res.json({ message: "Login First" });

  const decoded = jwt.verify(token, process.env.jwt);
  const id = decoded.userId;
  let user = await User.findById(id);

  if (!user) return res.json({ message: "User not finde" });

  req.user = user;

  next();
};
