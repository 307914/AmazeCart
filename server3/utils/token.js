const {verify,sign}=require('jsonwebtoken')

const SECRET_KEY=process.env.SECRET_KEY;
const genToken=(userdata,time='1h')=>{
    const {username}=userdata;
     
    const token=sign({username},SECRET_KEY,{
        expiresIn:time
    })

return token;

}


const verifyToken=(token)=>{
    if(!token){
        const err=new Error("session expired please login again");
        err.status=401;
        throw err;
    }

    return verify(token,SECRET_KEY);
}

module.exports={verifyToken,genToken};