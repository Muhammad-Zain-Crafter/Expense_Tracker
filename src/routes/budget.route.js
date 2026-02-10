import Router from "express";
import { addBudget, getBudgets, updateBudget, deleteBudget } from "../controllers/budget.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/add-budget').post(
    verifyJWT, addBudget
)
router.route('/get-budgets').get(
    verifyJWT, getBudgets
)
router.route('/update-budget/:id').put(
    verifyJWT, updateBudget
)
router.route('/delete-budget/:id').delete(
    verifyJWT, deleteBudget
)
export default router;