import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import Razorpay from 'razorpay'
import cors from 'cors'
import paymentRoutes from './routes/payment.js'
export const instance=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET!
})

const app=express()
app.use(cors())
app.use(express.json())
app.use('/api/payment', paymentRoutes)
app.listen(process.env.PORT,()=>{
    console.log(`Payment service is running on port ${process.env.PORT}`)
})

