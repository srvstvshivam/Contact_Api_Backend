import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (name == "" || email == "" || password == "") {
    return res.json({ message: "All fields are required" });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User Already exites", Success: false });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });
  return res.json({
    message: "User Register Successfully",
    Success: true,
    data: req.body,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (email == "" || password == "") {
    return res.json({ message: "All fields are required" });
  }
  let user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not Exist", successs: false });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.json({ message: "Invalid Password", successs: false });

  const token = jwt.sign({ userId: user._id },process.env.jwt, {
    expiresIn: "1 d",
  });
  res.json({ message: `Welcome ${user.name}`, token, success: true });
};
