const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }



}


export {asyncHandler}





//asynchandler using async await  

//basically taking a function as parameter and returning a function which will execute the passed function 
// const asyncHandler=(fn)=>{()=>{}}

// const asyncHandler=(fn)=>async (req,res,next)=>{
//     try{
//         await fn(req,res,next)
//     }catch(error){
//         res.status(error.code||500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

//standardize api response and error   
//nodejs api error google search 