import type { Routes } from "@angular/router"
import { LoginComponent } from "./components/authentication/login/login.component"
import { RegistrationComponent } from "./components/authentication/registeration/registeration.component"
import { HomeComponent } from "./components/home/home.component"
import { OneProductComponent } from "./components/one-product/one-product.component"
import { AddToCart } from "./components/addToCart/addtocart.component"
import { AllproductsComponent } from "./components/allproducts/allproducts.component"
import { CategoriesComponent } from "./components/categories/categories.component"
import { AddToWishListComponent } from "./components/add-to-wish-list/add-to-wish-list.component"
import { AdminUsersComponent } from "./components/admin/users/admin-users.component"
import { AdminProductsComponent } from "./components/admin/products/admin-products.component"
import { AdminCategoriesComponent } from "./components/admin/categories/admin-categories.component"
import { ProductFormComponent } from "./components/admin/products/product-form/product-form.component"

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "product/:id", component: OneProductComponent },
  { path: "products", component: AllproductsComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "wishlist", component: AddToWishListComponent },
  { path: "cart", component: AddToCart },

  // Admin routes
  { path: "admin", redirectTo: "admin/products", pathMatch: "full" },
  { path: "admin/products", component: AdminProductsComponent },
  { path: "admin/products/create", component: ProductFormComponent },
  { path: "admin/products/edit/:id", component: ProductFormComponent },
  { path: "admin/categories", component: AdminCategoriesComponent },
  { path: "admin/users", component: AdminUsersComponent },

  // Fallback route
  { path: "**", redirectTo: "", pathMatch: "full" },
]
