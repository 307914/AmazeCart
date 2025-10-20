
const responseCreator=(message,data)=>{
    return{
        success:true,
        message,
        data
    }
}

const errorcreator=(message,status)=>{
  const err=new Error(message);
  err.status=status;
  throw err;
}

module.exports={responseCreator,errorcreator};