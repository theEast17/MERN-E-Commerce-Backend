import express from 'express'
import connectDb from './db.js'
import ProductRoutes from './Routes/ProductRoutes.js'

const app=express()
const port=5000
connectDb()

app.use(express.json())

app.use('/api/products',ProductRoutes)


app.listen(port,()=>{
    console.log('server started '+port)
})
