import Router from "express";
import { addIncome, getIncomes, updateIncome, deleteIncome } from "../controllers/income.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";     

const router = Router();

router.route('/add-income').post(
    verifyJWT, addIncome
)
router.route('/get-incomes').get(
    verifyJWT, getIncomes
)   
router.route('/update-income/:id').put(
    verifyJWT, updateIncome
)
router.route('/delete-income/:id').delete(
    verifyJWT, deleteIncome
)
export default router;