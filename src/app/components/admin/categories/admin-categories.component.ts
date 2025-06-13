import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService } from '../../../service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-categories',
  imports: [CommonModule, RouterModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './admin-categories.component.html'
})
export class AdminCategoriesComponent implements OnInit {
  categories: any[] = [];
  isLoading = false;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.adminService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.toastr.error('Failed to load categories');
        this.isLoading = false;
      }
    });
  }

  deleteCategory(id: string, name: string) {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      this.adminService.deleteCategory(id).subscribe({
        next: () => {
          this.toastr.success('Category deleted successfully');
          this.loadCategories();
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          this.toastr.error('Failed to delete category');
        }
      });
    }
  }
}