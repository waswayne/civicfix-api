// import express from 'express'
// import { login, register } from '../controllers/authController.js'

// const router = express.Router()

// router.post('/register', register)
// router.post('/login', login)


// export default router

import express from 'express';
import { register, login } from '../controllers/authController.js'
import { requireAuth } from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/protected', requireAuth, (req,res) => {
    res.json({
        message: 'You are authorized',
        user: req.user
    })
})

export default router;
