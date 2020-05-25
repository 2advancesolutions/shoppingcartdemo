import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orderHistory$: Observable<any>;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.orderHistory$ =  this.orderHistoryService.orderHistory$;
  }

}
