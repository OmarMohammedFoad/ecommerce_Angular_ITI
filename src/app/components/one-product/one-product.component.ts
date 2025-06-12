import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// import { Product } from '../../models/product.model'; // Create this interface

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './one-product.component.html',
})
export class OneProductComponent implements OnInit {
  product: any = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.getOneProduct(productId);
    });
  }


 

  getOneProduct(id: string): void {
    this.loading = true;
    this.error = null;

    this.productService.getOneProduct(id).subscribe({
      next: (res: any) => {
        // console.log(res.data.data,"asdasd");

        this.product = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product. Please try again later.';
        this.loading = false;
        console.error('Error fetching product:', err);
      },
    });
  }
}
