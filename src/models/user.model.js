import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true // set true for searching, also, dont index every field kyuki expensive
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,// cloudinary url
        required:true,
    },
    coverImage:{
        type:String,// cloudinary url
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    refreshToken:{
        type:String,
    }
},{
    timestamps:true //created at abd updated at fields automatically added
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next(); //only hash when password is modified or new user is created
    this.password= bcrypt.hash(this.password,10) //salt rounds
    next()
})//dont use arrow callback func because we need to access this keyword

userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password) //returns boolean
    
}

userSchema.methods.generateAccessToken=function(){ // no need for async because fast   
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,

    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY //takes expiry of token in object
    }
)

}

userSchema.methods.generateRefreshToken=function(){// contains less info than accesstoken and has longer expiry
    return jwt.sign({
        _id:this._id
        
    },
    process.env.REFRESH_TOKEN_SECRET,

    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY //takes expiry of token in object
    }
)

}

export const User = mongoose.model("User", userSchema)