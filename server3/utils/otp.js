
const speakeasy=require('speakeasy');
const QRCode=require('qrcode');
const encoding="base32";
const genOtp=async(username)=>{

    const {base32:secret}=speakeasy.generateSecret();

    const otpath_url=speakeasy.otpauthURL({
        secret,
        label:username,
        encoding,
        issuer:"AmazeCart"
    })

    const qrcode= await QRCode.toDataURL(otpath_url);

    return {qrcode,secret,otpath_url};

}

const verifyOtp=(secret,otp)=>{
    const isverified=speakeasy.totp.verify({ secret,
                                       encoding: encoding,
                                       token: otp });

    return isverified;
}

module.exports={verifyOtp,genOtp};