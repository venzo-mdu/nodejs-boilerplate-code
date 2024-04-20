import express from "express";
import {
  readData,
  createData,
  updateData,
  deleteData,
} from "../controllers/firebaseController.js";
import { createJwtToken, verifyJwtToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/course",verifyJwtToken, readData);
router.post("/course",createJwtToken, createData);
router.put("/course/:id",verifyJwtToken, updateData);
router.delete("/course/:id",verifyJwtToken, deleteData);

export default router;
