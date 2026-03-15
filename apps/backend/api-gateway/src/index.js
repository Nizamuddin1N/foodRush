import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { setupRoutes } from './routes.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://foodrush-nizamuddin1ns-projects.vercel.app/"
  ],
  credentials: true
}))

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: "API Gateway running" })
})

setupRoutes(app)

const PORT = Number(process.env.PORT) || 4000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Gateway running on port ${PORT}`)
})