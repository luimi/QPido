const req = require("request-promise");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "lui2mi",
  api_key: "185466639193225",
  api_secret: "Jb1go2Hrgcs6kjSYyW2yTUQ_az8"
});
module.exports = {
  uploadAvatar: (request) => {
    return new Promise((res, rej) => {
      cloudinary.v2.uploader.upload(
        request.params.image,{},async (error, result) => {
          if(result){
            const user = await new Parse.Query(Parse.User).get(request.user.id);
            await user.set('avatar',result.url).save(null,{useMasterKey: true});
            res({success:true, url: result.url});
          } else {
            res({success:false, message:"Error al intentar guardar la imagen", error:error});
          }
        }
      );
    });
  }
};
