import axios from "axios";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import getBuffer from "../utils/buffer.js";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";

export const createCompany=TryCatch(async(req:AuthenticatedRequest,res)=>{
    const user=req.user;
    if(!user){
        throw new ErrorHandler(401,"Aunthentication error")
    }
    if(user.role!=="recruiter"){
        throw new ErrorHandler(403,"Forbidden Request")
    }
    const {name,description,website}=req.body
    if(!name || !description || !website){
        throw new ErrorHandler(400,"Please provide all the requird fields")
    }
    const existingCompany=await sql`
    SELECT company_id FROM companies WHERE name=${name}
    `
    if(existingCompany.length>0){
        throw new ErrorHandler(409,`A company with this name ${name} already exists`)
    }
    const file=req.file
    if(!file){
        throw new ErrorHandler(400,"company logo is requird")
    }
    const fileBuffer=getBuffer(file)
    if(!fileBuffer || !fileBuffer.content){
         throw new ErrorHandler(500,"Failed to create image buffer")
    }
    const {data}=await axios.post(`${process.env.UPLOAD_SERVICE}/api/utils/upload`,{
        buffer:fileBuffer.content
    })
    const [newCompany] = await sql`
INSERT INTO companies (name,description,website,logo,logo_public_id,recruiter_id) 
VALUES (${name},${description},${website},${data.url},${data.public_id},${req.user?.user_id})
RETURNING *
`;

    res.json({
        message:"Company created succesfully",
        company:newCompany
    })
})
