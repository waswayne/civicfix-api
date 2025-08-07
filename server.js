import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import { MONGO_URI,PORT } from './config/env.js'
import issueRoutes from './routes/issueRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))



if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env');
  process.exit(1)
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB is connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })

app.use('/api', authRoutes)
app.use('/api', issueRoutes)

app.get('/', (req, res) => {
  res.send('CivicFix is running')
})


