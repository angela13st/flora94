import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();
import { getProductById, getProducts, updateProduct, createProduct, deleteProduct, increaseProductSold } from "../controllers/productController.js";

router.route("/").get(getProducts);

router.route("/").post(createProduct);

router.route("/:id").get(getProductById);

router.route("/:id").put(updateProduct);
router.route("/:id").delete(deleteProduct);
router.route('/:productId/increase-sold').put(increaseProductSold);

export default router;
