import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  @Input() delivery;
  @Input() showDate = false;
  constructor(public chatCtrl: ChatService, public deliveryCtrl: DeliveryService) { }

  ngOnInit() {}

}
