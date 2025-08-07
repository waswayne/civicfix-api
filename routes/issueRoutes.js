import express from "express";
import { createIssue, deleteIssue, getAllIssues, getIssueById, updateIssue, } from "../controllers/issueController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/issues", requireAuth, createIssue);
router.get("/issues", requireAuth, getAllIssues);
router.get("/issues/:id", requireAuth, getIssueById);
router.put('/issues/:id', updateIssue)
router.delete('/issues/:id', deleteIssue)

export default router;
