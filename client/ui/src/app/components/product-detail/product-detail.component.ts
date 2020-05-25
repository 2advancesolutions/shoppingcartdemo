import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  $currentUser: Observable<any>;
  $products: Observable<any>;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.$currentUser = of(JSON.parse(localStorage.getItem('currentUser')));
    this.$products = this.productService.loadProducts();
  }
}
