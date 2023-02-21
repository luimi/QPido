import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  public encodeObject(obj) {
    return btoa(JSON.stringify(obj));
  }
  public decodeObject(string) {
    return JSON.parse(atob(string));
  }
  public getStoredArray(name) {
    const array = localStorage.getItem(name);
    try {
      return JSON.parse(array ? array : "[]");
    } catch (e) {
      return [];
    }
  }
  public setStoredArray(name, array) {
    localStorage.setItem(name, JSON.stringify(array));
  }
  public ACLPublicRead(role?) {
    var ACL = new Parse.ACL();
    ACL.setPublicReadAccess(true);
    ACL.setWriteAccess(Parse.User.current(), true)
    if (role) {
      ACL.setRoleWriteAccess(role, true);
    }
    return ACL;
  }
  public async getAdminRole() {
    return await new Parse.Query(Parse.Role).equalTo("name", "Administrator").first();
  }
  public async getACL() {
    var ACL = new Parse.ACL();
    ACL.setPublicReadAccess(true);
    ACL.setWriteAccess(Parse.User.current(), true);
    ACL.setReadAccess(Parse.User.current(), true);
    let adminRole = await new Parse.Query(Parse.Role).equalTo("name", "Administrator").first();
    ACL.setRoleWriteAccess(adminRole, true);
    ACL.setRoleReadAccess(adminRole, true);
    //TODO agregar rol de repartidor
    return ACL;
  }

  public parseObjectToObject(o, params) {
    const result = {};
    params.forEach(param => {
      try {
        result[param] = o.get(param);
      } catch (e) { }
    });
    return result;
  }

  public objectToParseObject(c, o, params) {
    const Generic = Parse.Object.extend(c);
    const generic = new Generic();
    params.forEach(param => {
      generic.set(param, o[param]);
    });
    return generic;
  }

  public parseObjectSetParams(p, o, params) {
    params.forEach(param => {
      p.set(param, o[param]);
    });
    return p;
  }

  public parseGenericObject(c) {
    const Generic = Parse.Object.extend(c);
    return new Generic();
  }
  public parseGenericObjectWithId(c, id) {
    let obj = this.parseGenericObject(c);
    obj.id = id;
    return obj;
  }
  public isLogedIn() {
    return Parse.User.current();
  }
  public uploadImage(src, success, error) {
    let files = src.target.files;
    Array.from(files).forEach(async (file: any) => {
      if (file.type.includes('image')) {
        let reader = new FileReader();
        reader.addEventListener("load", async () => {
          let image = reader.result;
          try {
            let response = await Parse.Cloud.run('general_upload-image', { image });
            success(response);
          } catch (e) {
            error(e)
          }
        }, false);
        reader.readAsDataURL(file);
      } else {
        error()
      }
    });
  }
  public getIndexOf(array,id){
    let index = -1;
    for(let i = 0 ; i < array.length ; i++) {
      if(array[i].id === id){
        index = i;
        break;
      }
    }
    return index;
  }
  public async isInitialized(){
    try{
      return await Parse.Cloud.run('setup-is_initialized');
    }catch(e){
      return false;
    }
  }
}
