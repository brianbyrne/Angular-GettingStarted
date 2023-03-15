import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | undefined;
  constructor(private route: ActivatedRoute, private router: Router) {}

  pageTitle: string = 'Product Details';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;

    // TODO remove hard coded product:
    this.product = {
      'productId': id,
      'productName': 'Blah',
      'productCode': '010202',
      'releaseDate': 'March 19, 2021',
      'description': 'Leaf Rake',
      'price': 19.95,
      'starRating': 3.2,
      'imageUrl': 'assets/images/leaf_rake.png'
    };
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
