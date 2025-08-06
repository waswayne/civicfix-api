import express from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js"



//register user
export const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;
    //if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}

// login user
export const login = async (req, res) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
