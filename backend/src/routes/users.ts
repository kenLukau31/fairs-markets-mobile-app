import {Router} from "express";
import * as usersControllers from "../controllers/users";

const router = Router();

router.post("/register", usersControllers.registerUser);
router.post("/login", usersControllers.loginUser);

router.get("/", usersControllers.getAllUsers);

export default router;