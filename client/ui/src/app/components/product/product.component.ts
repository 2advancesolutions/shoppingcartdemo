import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  @Input() $products: Observable<any>;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
  }

  addOrder(product){
    // TODO convert to UTC just use for demo
    product.orderdate = new Date().toLocaleDateString();
    product.orderTime = new Date().toLocaleTimeString();
    this.orderHistoryService.updateOrderHistory(product);
    alert('Order added to order history');
  }

}
