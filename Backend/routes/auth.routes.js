import express from "express";
import { currentUser, login, register } from "../controller/auth.controller.js";

import { CheckIsAuthenticate } from "../middleware/isAuthenticate.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logUser", CheckIsAuthenticate, currentUser);

export default router;