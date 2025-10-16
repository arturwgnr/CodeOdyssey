import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { authenticate } from "./authenticate.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

//GET
app.get("/", (req, res) => {
  res.send("🦅 I have everything that I need in order to succeed!");
});

app.get("/profiles", async (req, res) => {
  try {
    const profiles = await prisma.user.findMany();

    res.status(200).json({ message: "Profiles list:", profiles });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//POST
app.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or username already in use" });
    }

    const newUser = await prisma.user.create({
      data: { name, username, email, password: hashPassword },
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userId: user.id,
      },
    });

    res
      .status(200)
      .json({ message: "Login successful!", user, token, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    if (storedToken.expiresAt < new Date()) {
      return res.status(403).json({ message: "Refresh token expired" });
    }

    const newAccessToken = jwt.sign(
      { id: storedToken.userId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "New access token generated",
      token: newAccessToken,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    await prisma.refreshToken.delete({
      where: { token: refreshToken },
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//private
app.get("/private", authenticate, (req, res) => {
  res.status(200).json({
    message: `Access granted, welcome ${req.user.username}`,
  });
});

//server
app.listen(3000, () => {
  console.log("🔥 Selvagem! Server is on: http://localhost:3000");
});
