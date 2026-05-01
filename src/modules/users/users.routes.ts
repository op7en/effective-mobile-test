import { Router } from "express";
import {
  getByIdHandler,
  getAllHandler,
  blockHandler,
} from "./users.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/role.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/:id", getByIdHandler);
router.get("/", adminOnly, getAllHandler);
router.patch("/:id/block", blockHandler);

export default router;
