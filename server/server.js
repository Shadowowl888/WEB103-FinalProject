import express from 'express'
import cors from 'cors'
import recipeRoutes from './routes/recipes.js'
import dotenv from 'dotenv'
dotenv.config()

// create express app
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">PlatePal API</h1>')
})

app.use('/api/recipes', recipeRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})