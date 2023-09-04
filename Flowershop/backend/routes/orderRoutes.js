import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(addOrderItems);
router.route("/myorders/:userId").get(getMyOrders);
router.route("/:id").get( getOrderById);
router.route("/:id/pay").put(updateOrderToPaid);

export default router;
