const nodemailer = require("nodemailer");

const mailSender = async(email,title,body) =>{
    try{

        let transporter =  nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            // port: 587, // or 465 for secure connection
            // secure: false,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD,
            }
        })
        let info = await transporter.sendMail({
            from:"StudyNotion|| CodeHelp - Abhinav",
            to:`${email}`,
            body:`${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info;
    }catch(error){
        console.log("Error occurred in nodemailer function",error.message);
    }
}

module.exports = mailSender;