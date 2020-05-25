import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private orderHistory = new BehaviorSubject<any[]>([]);
  public readonly orderHistory$: Observable<any[]> = this.orderHistory.asObservable();

  constructor() { }

  loadOrderHistory(): Observable<any> {
   return this.orderHistory$;
  }

  updateOrderHistory(order) {
    const orderHistory = this.orderHistory.getValue();
    orderHistory.push(order);
    this.orderHistory.next(orderHistory);
  }

}
