const req = require("request-promise");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.CLOUDINARYAPIKEY,
  api_secret: process.env.CLOUDINAARYAPISECRET
});
module.exports = {
  upload:(request) =>{
    return new Promise((res, rej) => {
      cloudinary.v2.uploader.upload(
        request.params.image,{},async (error, result) => {
          if(result){
            res({success:true, url: result.url});
          } else {
            res({success:false, message:"Error al intentar guardar la imagen", error:error});
          }
        }
      );
    });
  }
}