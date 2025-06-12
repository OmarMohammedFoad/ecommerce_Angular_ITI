import { Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegistrationComponent } from './components/authentication/registeration/registeration.component';
import { HomeComponent } from './components/home/home.component';
import { OneProductComponent } from './components/one-product/one-product.component';
import { AddToCart } from './components/addToCart/addtocart.component';
import { AllproductsComponent } from './components/allproducts/allproducts.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddToWishListComponent } from './components/add-to-wish-list/add-to-wish-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'product/:id', component: OneProductComponent },
  { path: 'products', component: AllproductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'wishlist', component: AddToWishListComponent },
  { path: 'cart', component: AddToCart },
];
