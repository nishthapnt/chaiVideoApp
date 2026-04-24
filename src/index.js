// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'; //config this
dotenv.config({
    path:'./env'
})
import connectDB from './db/index.js';

connectDB()



// import express from 'express';
// const app= express();
// //iife
// //semicolon for cleaning purposes
// //because the prevois line may or may not have a semicolon

// ;(async()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(error)=>{
//         console.log("ERROR: ",error)
//         throw error
//        })

//        app.listen(process.env.PORT,()=>{
//         conaole.log(`App is listening on ${process.env.PORT}`)
//        })

//     }catch(error){
//         console.error("ERROR: ",error);
//         throw error

//     }
// })()