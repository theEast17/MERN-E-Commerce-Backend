import express from 'express'
import connectDb from './db.js'
import ProductRoutes from './Routes/ProductRoutes.js'
import BrandRoutes from './Routes/BrandRoutes.js'
import CategoryRoutes from './Routes/CategoryRoutes.js'
import cors from 'cors'
import UserRoutes from './Routes/UserRoutes.js'

const app = express()
const port = 5000
connectDb()

app.use(express.json())
app.use(cors(
    {
        exposedHeaders: ['X-Total-Count']
    }
))
app.use('/products', ProductRoutes)
app.use('/brands', BrandRoutes)
app.use('/categories', CategoryRoutes)
app.use('/users', UserRoutes)


app.listen(port, () => {
    console.log('server started ' + port)
})
