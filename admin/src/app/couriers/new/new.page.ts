import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  newUser: any = {}
  constructor(private authCtrl: AuthService, private couriersCtrl: CourierService) { }

  ngOnInit() {
  }
  async register(){
    let result = await this.authCtrl.createUser(this.newUser);
    if(result.success){
      await this.couriersCtrl.setCourierRole(this.newUser.username);
      this.newUser.password = result.password;
    }
  }
}
