import app from "./app.js"
import dotenv from 'dotenv'
import { sql } from "./utils/db.js"
dotenv.config()

async function initDB() {
    try {
        await sql`
        DO $$
        BEGIN 
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE )
        `
    } catch (error) {
        
    }
}

app.listen(()=>{
    console.log(`Job Service is running on port ${process.env.PORT}`)
})