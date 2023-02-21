import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  public setAvatar(result){
    let files = result.target.files;
    Array.from(files).forEach(async (file:any) => {
      if(file.type.includes('image')){
        let reader  = new FileReader();
        reader.addEventListener("load",async () => {
          let result = await Parse.Cloud.run('profile_uploadAvatar',{image:reader.result});
          this.getUser().fetch();
          return result;
        }, false);
        reader.readAsDataURL(file);
      } else {
        return {success:false, message:'Archivo no reconocido como imagen'};
      }
    });
  }
  public getUser(){
    return Parse.User.current();
  }
}
