import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminController.js";

const router = express.Router();

router.route("/").post(protect, admin, createProduct);
router.route("/:id").put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route("/:id").delete(deleteProduct);

export default router;
