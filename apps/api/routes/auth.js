import express from "express";
import * as controller from "../controllers/authController.js";

const router = express.Router();

router.post("/signin", express.json(), controller.signIn);
router.post("/signup", express.json(), controller.signUp);
router.post("/forgot-password", express.json(), controller.forgotPassword);
router.get("/session", controller.getSession);
router.post("/signout", controller.signOut);

export default router;
