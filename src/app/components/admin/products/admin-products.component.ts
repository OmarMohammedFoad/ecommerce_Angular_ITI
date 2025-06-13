import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService, Product } from '../../../service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-products',
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    MatIconModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './admin-products.component.html'
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  categories: any[] = [];
  isLoading = false;
  searchTerm = '';
  selectedCategory = '';
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.isLoading = true;
    this.adminService.getAllProducts(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        console.log(response);
        
        this.products = response || [];
        this.totalPages = response.metadata?.numberOfPages || 1;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.toastr.error('Failed to load products');
        this.isLoading = false;
      }
    });
  }

  loadCategories() {
    this.adminService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response || [];
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  onSearch() {
    // Implement search functionality
    this.currentPage = 1;
    this.loadProducts();
  }

  onCategoryFilter() {
    // Implement category filtering
    this.currentPage = 1;
    this.loadProducts();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  deleteProduct(id: string, title: string) {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      console.log(`Deleting product with ID: ${id}`);

      this.adminService.deleteProduct(id).subscribe({
        next: () => {
          this.toastr.success('Product deleted successfully');
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.toastr.error('Failed to delete product');
        }
      });
    }
  }
}