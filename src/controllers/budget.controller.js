import { isValidObjectId } from "mongoose";
import { Budget } from "../models/budget.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const addBudget = asyncHandler(async (req, res) => {
    const { category, limit, month, year } = req.body;
    if (!category || !limit || !month || !year) {
        throw new ApiError(400, "category, limit, month and year are required");
    }
    if (!limit || isNaN(limit) || limit <= 0) {
        throw new ApiError(400, "limit must be a positive number");
    }
    const budget = await Budget.create({
        user: req.user._id,
        category,
        limit,
        month,  
        year,
    })
    return res.status(201).json(new ApiResponse(201, budget, "Budget added successfully"));
})

const getBudgets = asyncHandler(async(req, res) => {
    const budgtes = await Budget.find({
        user: req.user._id
    }).sort(
        ({createdAt: -1})
    )
    return res.status(200).json(new ApiResponse(200, budgtes, "Budgets fetched successfully"));
})

const updateBudget = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const {limit}= req.body
    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid budget id");
    }
    if (!limit || isNaN(limit) || limit <= 0) {
        throw new ApiError(400, "limit must be a positive number");
    }
    const budget = await Budget.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { $set: { limit: limit } },
    { new: true }
  );
    if (!budget) {
        throw new ApiError(404, "Budget not found");
    }
    return res.status(200).json(new ApiResponse(200, budget, "Budget updated successfully"));
})

const deleteBudget = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid budget id");
  }

  const budget = await Budget.findOneAndDelete({
    _id: id,
    user: req.user._id
  });

  if (!budget) {
    throw new ApiError(404, "Budget not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, budget, "Budget deleted"));
});

export { addBudget, getBudgets, updateBudget, deleteBudget };