import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddToCart } from '../addToCart/addtocart.component';
import { AddtoCartService } from '../../service/addtocart.service';
import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { ToastrService } from 'ngx-toastr';
import { WishlishService } from '../../service/wishlish.service';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule, MatSliderModule, MatIcon],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  wishlist: string[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  totalItems: number = 0;
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  constructor(
    private productService: ProductsService,
    private addToCartService: AddtoCartService,
    private wishListService: WishlishService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  // searchForProduct(productId: string) {
  //   const produc
  // }

  getAllProduct() {
    return this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.data || res;
        this.isLoading = false;
        this.totalItems = res.results;

      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load products';
        this.isLoading = false;
        console.error('Error fetching products:', error);
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
        this.addToCartService.cartNum.next(res.data.reduce((acc: number, product: any) => acc + product.numOfCartItems, 0));

      },
      error: (error: any) => {
        console.log(error);
      },
    });
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
        console.log(error);
      },
    });
  }
}
