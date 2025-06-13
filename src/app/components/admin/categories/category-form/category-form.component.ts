import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../../service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatIconModule],
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  categoryId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.categoryForm = this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.categoryId = params['id'];
        this.loadCategory(this.categoryId!);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]]
    });
  }

  loadCategory(id: string) {
    this.adminService.getCategory(id).subscribe({
      next: (response) => {
        const category = response.data;
        this.categoryForm.patchValue({
          name: category.name,
          image: category.image
        });
      },
      error: (error) => {
        console.error('Error loading category:', error);
        this.toastr.error('Failed to load category');
        this.router.navigate(['/admin/categories']);
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.isSubmitting = true;
      const formData = this.categoryForm.value;

      const operation = this.isEditMode 
        ? this.adminService.updateCategory(this.categoryId!, formData)
        : this.adminService.createCategory(formData);

      operation.subscribe({
        next: (response) => {
          const message = this.isEditMode ? 'Category updated successfully' : 'Category created successfully';
          this.toastr.success(message);
          this.router.navigate(['/admin/categories']);
        },
        error: (error) => {
          console.error('Error saving category:', error);
          const message = this.isEditMode ? 'Failed to update category' : 'Failed to create category';
          this.toastr.error(message);
          this.isSubmitting = false;
        }
      });
    } else {
      this.toastr.error('Please fill in all required fields correctly');
      this.markFormGroupTouched();
    }
  }

  onImageError() {
    this.toastr.error('Failed to load image preview');
  }

  private markFormGroupTouched() {
    Object.keys(this.categoryForm.controls).forEach(key => {
      const control = this.categoryForm.get(key);
      control?.markAsTouched();
    });
  }
}