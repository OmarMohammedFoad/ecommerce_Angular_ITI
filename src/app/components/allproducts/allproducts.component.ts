import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { AddtoCartService } from '../../service/addtocart.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatIcon } from '@angular/material/icon';

import {
  ProgressSpinnerMode,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { WishlishService } from '../../service/wishlish.service';

@Component({
  selector: 'app-allproducts',
  imports: [
    RouterModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatIcon,
  ],
  templateUrl: './allproducts.component.html',
  // styles: './allproduct.style.css'
})
export class AllproductsComponent implements OnInit {
  products: any[] = [];
  currentPage = 1;
  totalPages = 1;
  totalItems = 0;
  itemsPerPage = 40;
  isLoading = false;
  errorMessage: string = '';
  Math: any;

  constructor(
    private productService: ProductsService,
    private addToCartService: AddtoCartService,
    private wishListService: WishlishService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct(page: number = 1) {
    this.isLoading = true;
    this.currentPage = page;

    this.productService.getAllProducts(page, this.itemsPerPage).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalItems = response.results;
        this.totalPages = response.metadata.numberOfPages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      },
    });
  }
  changePage(newPage: number): void {
    if (
      newPage >= 1 &&
      newPage <= this.totalPages &&
      newPage !== this.currentPage
    ) {
      this.getAllProduct(newPage);
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  addToWishlist(productId: string) {
    return this.wishListService.addToWishList(productId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        this.toast.success(res.message, 'Fresh Wishlist');
      },
      error: (error: any) => {
        console.log(error);
        this.toast.error(error.error.message);
      },
    });
  }
  removeFromWishlist(productId: string) {
    return this.wishListService.removeLoggedUserWishLish(productId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        this.toast.success(res.message, 'Fresh Wishlist');
      },
      error: (error: any) => {
        console.log(error.error.message);
      },
    });
  }
  addToCart(productId: string) {
    // console.log(productId);

    return this.addToCartService.addToCart(productId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        this.toast.success(res.message, 'Fresh Cart');
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
