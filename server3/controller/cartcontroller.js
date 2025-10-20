const { responseCreator } = require("../creators/responsecreators");
const usermodel = require("../model/usermodel");

/**
 * 
 * @param {*} req 
 * @param {import("express").Response} res 
 * @param {*} next 
 */
const addToCart=async(req,res,next)=>{
    try{
    const {username}=res.locals.userdata;
    const product=req.body;

    const data=await usermodel.addToCart(username,product);
    res.send(responseCreator(` the ${product.title} added to cart`,data));
    }catch(err){
        next(err);
    }
}

const RemoveFromCart=async(req,res,next)=>{
    try{
    const {username}=res.locals.userdata;
    const product=req.body;

    const data=await usermodel.removeFromCart(username,product);
    res.send(responseCreator(` the ${product.title} removed from cart `,data));
    }catch(err){
        next(err);
    }
}


const Increment=async(req,res,next)=>{
    try{
    const {username}=res.locals.userdata;
    const product=req.body;

    const data=await usermodel.increment(username,product);
    res.send(responseCreator(` the ${product.title} added to cart `,data));
    }catch(err){
        next(err);
    }
}


const Decrement=async(req,res,next)=>{
    try{
    const {username}=res.locals.userdata;
    const product=req.body;

    const data=await usermodel.decrement(username,product);
    res.send(responseCreator(` the ${product.title} removed from cart `,data));
    }catch(err){
        next(err);
    }
}


const GetCartItems=async(req,res,next)=>{
    try{
    const {username}=res.locals.userdata;
    const product=req.body;

    const data=await usermodel.getcartitems(username,product);
    res.send(responseCreator(` the cart items are `,data));
    }catch(err){
        next(err);
    }
}



const ClearCart=async(req,res,next)=>{
    try{
    const {username}=res.locals.userdata;
    const product=req.body;

    const data=await usermodel.clearcart(username,product);
    res.send(responseCreator(` the cart items are cleared `,data));
    }catch(err){
        next(err);
    }
} 


module.exports={Increment,GetCartItems,ClearCart,Decrement,RemoveFromCart,addToCart};