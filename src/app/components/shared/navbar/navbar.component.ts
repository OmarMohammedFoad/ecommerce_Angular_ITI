import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { AddtoCartService } from '../../../service/addtocart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatIconModule, MatBadgeModule],
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  cartCount = 0;
  wishCount = 2;

  constructor(
    private router: Router,
    private auth: AuthService,
    private addtoCartService: AddtoCartService
  ) {
    // this.updateCartCount();
  }

  // updateCartCount() {
  //   this.addtoCartService.updateCartProductQuantity().subscribe((items) => {
  //     this.cartCount = items.length;
  //   });
  // }

  isAuthenticated() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
