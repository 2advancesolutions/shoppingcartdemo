import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  $currentUser: Observable<any>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.$currentUser = of(JSON.parse(localStorage.getItem('currentUser')));
  }
}
