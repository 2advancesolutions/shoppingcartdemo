import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { APPCONFIG } from '../constants/config';

export const httpOptions = {
  headers: new HttpHeaders({
   //  Authorization: 'Bearer e60ce72ecdebc37631b0cc1de13a2f15',
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private products = new BehaviorSubject<any[]>([]);
  public readonly products$: Observable<any[]> = this.products.asObservable();

  constructor(private http: HttpClient) { }

  loadProducts(): Observable<any> {
   return this.http.get<any>(APPCONFIG.API.DEV.PRODUCTS, httpOptions);
  }

}
