import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public async logIn(data, success,fail) {
    try{
      await Parse.User.logIn(data.email, data.password);
      success();
    }catch(e){
      fail(e);
    }
  }
  public async signUp(data, params, success,fail) {
    var user = new Parse.User();
    params.forEach(param => {
      user.set(param, data[param]);
    });
    try{
      await user.signUp();
      success();
    }catch(e){
      fail(e);
    }
  }
  async logOut(){
    try{
      await Parse.User.logOut();
    }catch(e){}
  }
  public async createUser(data) {
    try {
      return await Parse.Cloud.run("authentication-compact_createUser", { username: data.username, name: data.name });
    } catch (e) {
      return { success: false, error: e };
    }
  }
  public async changePassword(newPassword) {
    const user = Parse.User.current();
    user.setPassword(newPassword);
    user.set("changePassword", false);
    try{
      await user.save();
      return {success:true};
    }catch(e){
      return {success:false, error:e};
    }
  }
  public async resetPassword(username){
    try{
      return await Parse.Cloud.run("authentication-compact_resetUserPassword", { username:username});
    }catch(e){
      return {success:false};
    }
  }
  public async isCurrentUserInRole(rol){
    return true
  }
}
