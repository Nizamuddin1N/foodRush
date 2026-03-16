import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { setupRoutes } from './routes.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: "*"
}))

// Health check BEFORE routes
app.get('/health', (req, res) => {
  res.json({ status: "API Gateway running" })
})

// Proxy routes BEFORE express.json()
setupRoutes(app)

// express.json() AFTER proxy routes
app.use(express.json())

const PORT = Number(process.env.PORT) || 4000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Gateway running on port ${PORT}`)
})