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
  public async resetPassword(email){
    try{
      return await Parse.Cloud.run("authentication-email_generateCode", { username: email });
    }catch(e){
      return {success:false};
    }
  }
  public async validateCode(email,code){
    try{
      return await Parse.Cloud.run("authentication-email_validateCode", { username: email, code: code });
    }catch(e){
      return {success:false};
    }
  }
  public async changePassword(email,token,password){
    try{
      return await Parse.Cloud.run("authentication-email_changePassword", { username: email, token: token, newpassword: password });
    }catch(e){
      return {success:false};
    }
    
  }
  async logOut(){
    try{
      await Parse.User.logOut();
    }catch(e){}
  }
}
