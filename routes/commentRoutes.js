import express from 'express'
import { addComment } from '../controllers/issueController.js'

const router = express.Router()

router.post('/issues/:id/comments', addComment)


export default router;