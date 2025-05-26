import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { login, register, getMe } from "../controllers/auth.controller.js";

const router = express.Router();

// Register using email or phone and password (user, admin, provider)
router.post("/register", register);

// Login using email or phone and password (user, admin, provider)
router.post("/login", login);

// Get the logged in user
router.get("/me", isAuthenticated, getMe);

export default router;
