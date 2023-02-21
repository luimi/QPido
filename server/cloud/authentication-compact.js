const utils = require('./utils');
// TODO Agregar validacion para que solo el usuario con rol admin pueda hacer esto
module.exports = {
  createUser:async (request)=>{
    let user = await new Parse.Query(Parse.User).equalTo("username", request.params.username).first();
    if(!user){
      user = new Parse.User();
      user.set('username', request.params.username);
      let password = utils.randomString(8)
      user.setPassword(password);
      user.set('name', request.params.name);
      user.set('changePassword',true);
      await user.save(null,{ useMasterKey: true });
      return {success:true, password:password};
    } else {
      return {success:false};
    }
  },
  resetUserPassword: async (request) => {
    let user = await new Parse.Query(Parse.User).equalTo("username", request.params.username).first();
    if(user){
      let password = utils.randomString(8)
      user.setPassword(password);
      user.set('changePassword',true);
      await user.save(null,{ useMasterKey: true });
      return {success:true, password:password};
    } else {
      return {success:false};
    }
  }
};