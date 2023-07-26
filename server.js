import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoute from './routes/productRoute.js'
import userRouter from './routes/user.js'
 
//configure env variables
dotenv.config()

connectDB();

const PORT = process.env.PORT || 8080

//connect to database


//rest object
const app = express()

//middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))



//routes

app.use('/api/auth', authRoute)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoute)
app.use('/api/user', userRouter)





//rest api
app.get('/', function (req, res) {
  res.send("<h1>Server is running</h1>")
})



//server listen
app.listen(PORT, () => console.log(`Server running on  ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan.white)) 