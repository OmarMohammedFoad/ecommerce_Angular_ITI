import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule, MatIconModule],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}