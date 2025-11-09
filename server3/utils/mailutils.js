const nodemailer = require('nodemailer');
const { genOtp } = require('./otp');

// // const transporter=nodemailer.createTransport({

// //     host:'smtp:gmail.com',
// //     port:465,
// //     secure:true,
// //     auth:{
// //         user:process.env.EMAIL_USER,
// //         pass:process.env.EMAIL_PASSWORD
// //     }
// // })

// // const sendemail=async({to,from,attachments,html})=>{
// //     const info= await transporter.sendMail({
// //         from,
// //         to,
// //         html,
// //         text,
// //         attachments
// //     })
// //     console.log("sendemail",info);
// //   return info;
// // }

// // (async()=>{
// //    const {qrcode,secret,otpath_url}=await genOtp();

// //    const to="nodemailernodemailer3@gmail.com"
// //    const subject='2fa auth'
// //    const html=`
// //    <h2>scan this qr code</h2>
// //    <img src="cid:qrcode/>
// //    `
// //    const attachments=[
// //     {filename:"QR_code.png",path:"qrcode" ,cid:"qrcode"}
// //    ]
// //    sendemail({
// //     to,subject,html,attachments
// //    })

// // })()

// // module.exports=sendemail;

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER_NAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });
// const sendEmail = async ({ to, subject, html, attachments }) => {
//   const info = await transporter.sendMail({
//     from: `"Admin" <${process.env.EMAIL_USER_NAME}>`,
//     to,
//     subject,
//     html,
//     attachments,
//   });
//   // console.log('sendemail', info);

//   return info;
// };

// (async () => {
//   const { otpath_url, qrcode, secret } = await genOtp('saibhai');
//   // console.log({ qrcode, otpath_url });
//   const to = 'nodemailernodemailer3@gmail.com';
//   const subject = ' 2FA setup';
//   const html = `<h2>2FA setup </h2>
// <h3>scan the below code using google authenticator</h3>
// <img src="cid:qrcode" />`;

//   const attachments = [
//     { filename: 'QR_CODE.png', path: qrcode, cid: 'qrcode' },
//   ];

//   const text = `2FA setup
// Add the following link in Google authenticator app -${otpath_url}`;
//   sendEmail({ to, subject, html, attachments });
// })();

// module.exports = sendEmail;
