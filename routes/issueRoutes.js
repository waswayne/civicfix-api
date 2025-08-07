import express from 'express'
import { createIssue, getAllIssues } from '../controllers/issueController.js'
import { getIssueById } from '../controllers/issueController.js'
import { requireAuth } from '../middleware/authMiddleware.js'



const router= express.Router()

router.post('/issues', requireAuth, createIssue)
router.get('/issues', requireAuth, getAllIssues)
router.get('/issues/:id', requireAuth, getIssueById)

export default router