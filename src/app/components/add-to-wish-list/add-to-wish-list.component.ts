import { Component, OnInit } from '@angular/core';
import { WishlishService } from '../../service/wishlish.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-to-wish-list',
  imports: [],
  templateUrl: './add-to-wish-list.component.html',
})
export class AddToWishListComponent implements OnInit {
  wishlistItems: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  totalPrice: number = 0;
  count: number = 0;
  constructor(private wishListService: WishlishService,private toast:ToastrService) {}

  removeProductFromWishlist(productId: string) {
    this.wishListService.removeLoggedUserWishLish(productId).subscribe({
      next: (res: any) => {
        this.loadWishlistItems()
        this.toast.success(res.message,"Fresh Cart")
        this.loading = true;
      },
    });
  }
  ngOnInit(): void {
    this.loadWishlistItems();
  }





  loadWishlistItems() {
    this.loading = true;
    this.error = null;

    this.wishListService.getLoggedUserWishLish().subscribe({
      next: (res: any) => {
        this.wishlistItems = res.data || [];
        console.log(res.data);
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load wishlist items';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
