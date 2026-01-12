import { Router } from "express";
import { getMe, login, logout, register } from "../controllers/auth.contoller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get('/me', auth, getMe)
router.post("/register", register);
router.post("/login", login);
router.post('/logout', logout)

export default router;
