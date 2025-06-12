import { Component, Input, OnInit } from '@angular/core';
import { AddtoCartService } from '../../service/addtocart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtocart',
  imports: [],
  templateUrl: './addtocart.component.html',
  styles: ``,
})
export class AddToCart implements OnInit {
  constructor(
    private addtoCartService: AddtoCartService,
    private toast: ToastrService
  ) {}
  cartItems: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  totalPrice: number = 0;

  count: number = 0;

  ngOnInit(): void {
    this.loadCartItems();
  }

  addProductToCart(productId: string) {
    this.addtoCartService.addToCart(productId).subscribe({
      next: (res: any) => {
        this.cartItems = res.data;
        this.toast.success(res.message, 'Fresh Cart');
      },
    });
  }

  increaseProductCount(productId: string) {
    this.count = this.count++;
    this.updateProductQuantintyCart(productId, this.count);
  }

  decreaseProductCount(productId: string) {
    this.count = this.count++;
    this.updateProductQuantintyCart(productId, this.count);
  }

  updateProductQuantintyCart(productId: string, count: number) {
    this.loading = true;
    this.error = null;

    this.addtoCartService
      .updateCartProductQuantity(productId, count)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.cartItems = res.data.products || [];
          this.loading = false;
          this.totalPrice = res.data.totalCartPrice;
        },
        error: (err) => {
          this.error = 'Failed to load cart items';
          this.loading = false;
          console.error(err);
        },
      });
  }

  removeAllItems() {
    this.addtoCartService.removeAllCart().subscribe({
      next: (res: any) => {
        console.log(res);

        this.loadCartItems();
        this.toast.success(res.message, 'Fresh Cart');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  removeCartItem(productId: string) {
    console.log(productId);

    this.addtoCartService.removeSpecificItemFromCart(productId).subscribe({
      next: (res: any) => {
        console.log(res);

        // this.loadCartItems();
        // this.toast.success(res.message, 'Fresh Cart');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  loadCartItems() {
    this.loading = true;
    this.error = null;

    this.addtoCartService.getLoggedUserProductFromCart().subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartItems = res.data.products || []; // Direct assignment
        this.loading = false;
        this.totalPrice = res.data.totalCartPrice;
      },
      error: (err) => {
        this.error = 'Failed to load cart items';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
