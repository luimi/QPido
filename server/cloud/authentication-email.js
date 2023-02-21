const nodemailer = require('nodemailer');
const utils = require('./utils');
const transporter = nodemailer.createTransport({
        host: process.env.MAILHOST,
        port: process.env.MAILPORT,
        secure: true,
        auth: {
            user: process.env.MAILFROM,
            pass: process.env.MAILPASSWORD
        }
    });
module.exports = {
  generateCode: async request => {
    const user = await getUser(request.params.username);
    if(!user){
      return {success:false};
    }
    const AuthEmailValidation = Parse.Object.extend("AuthEmailValidation");
    const authEmailValidation = new AuthEmailValidation();
    authEmailValidation.set("user", user);
    authEmailValidation.set("code", utils.randomNumberBetween(100000,999999));
    authEmailValidation.set("status", true);
    authEmailValidation.set("token", utils.randomString(20));
    authEmailValidation.setACL(new Parse.ACL());
    await authEmailValidation.save();
    return await sendEmail(user.get('email'),authEmailValidation.get('code'));
  },
  validateCode: async request => {
    const user = await getUser(request.params.username);
    const authEmailCode = await new Parse.Query("AuthEmailValidation")
      .equalTo("user", user)
      .equalTo("code", parseInt(request.params.code))
      .equalTo("status", true)
      .first({ useMasterKey: true });
    if(authEmailCode) {
      return {success:true,token:authEmailCode.get('token')};
    }else{
      return {success:false};
    }
  },
  changePassword: async (request) => {
    const user = await getUser(request.params.username);
    const authEmailCode = await new Parse.Query("AuthEmailValidation")
      .equalTo("user", user)
      .equalTo("token", request.params.token)
      .equalTo("status", true)
      .first({ useMasterKey: true });
    if(authEmailCode) {
      user.setPassword(request.params.newpassword);
      await user.save(null,{ useMasterKey: true });
      await authEmailCode.set('status',false).save(null,{ useMasterKey: true });
      return {success:true};
    }else{
      return {success:false};
    }
  }
};

const getUser = async username => {
  return await new Parse.Query(Parse.User)
    .equalTo("username", username)
    .include("email")
    .first({ useMasterKey: true });
};
const sendEmail = (to,code) => {
  return new Promise((res,rej) => {
    transporter.sendMail(
        {
            from: process.env.MAILFROM,
            to: to,
            subject: "Restauracion de contraseña",
            text: "Hola, con este codigo puedes recuperar tu contraseña " + code
        },
        (error, info) => {
            if (error) {
                res({success:false, message:JSON.stringify(error)});
            } else {
                res({success:true,email:utils.maskEmail(to)});
            }
        }
    );
  });
} 
