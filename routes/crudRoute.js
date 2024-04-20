import express from "express";
import {
  readData,
  createData,
  updateData,
  deleteData,
} from "../controllers/crudController.js";
import { verifyJwtToken, createJwtToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/user", verifyJwtToken, readData);
router.post("/user", createJwtToken, createData);
router.put("/user", verifyJwtToken, updateData);
router.delete("/user", verifyJwtToken, deleteData);

export default router;
