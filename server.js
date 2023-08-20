import express from 'express'
import path  from "path"
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoute from './routes/productRoute.js'
import userRouter from './routes/user.js'
import sportRouter from './routes/sportRoute.js'
import brandRouter from './routes/brandRoute.js'
 import colors from 'colors'
 
 import { fileURLToPath } from 'url';

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
//configure env variables
dotenv.config()

connectDB();

const PORT = process.env.PORT || 8080

//connect to database


//rest object
const app = express()

//static folder
 
app.use('/uploads', express.static(path.join(__dirname, 'uploads/additionalPhotos')));


 

//middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

 
// set path
 



//routes

app.use('/api/auth', authRoute)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoute)
app.use('/api/user', userRouter)
app.use('/api/sport', sportRouter)
app.use('/api/brand', brandRouter)





//rest api
app.get('/', function (req, res) {
  res.send("<h1>Server is running</h1>")
})




//server listen
app.listen(PORT, () => console.log(`Server running on  ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan.white)) 