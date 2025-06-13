import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AdminService, Product } from '../../../../service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatIconModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = [];
  isEditMode = false;
  isSubmitting = false;
  productId: any = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.productForm = this.createForm();
  }

  ngOnInit() {
    this.loadCategories();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = params['id'];
        this.loadProduct(this.productId);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0)]],
      imageCover: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      images: this.fb.array([]),
      category: [''],
      subcategory: [''],
      brand: [''],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get imagesArray(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  addImage() {
    this.imagesArray.push(this.fb.control('', [Validators.pattern(/^https?:\/\/.+/)]));
  }

  removeImage(index: number) {
    this.imagesArray.removeAt(index);
  }

  loadCategories() {
    this.adminService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response);

        this.categories = response || [];
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.toastr.error('Failed to load categories');
      }
    });
  }

  loadProduct(id: string) {
    this.adminService.getProduct(id).subscribe({
      next: (response) => {
        const product = response;

        this.productForm.patchValue({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          imageCover: product.imageCover,
          category: typeof product.category === 'object' ? product.category._id : product.category,
          subcategory: product.subcategory || '',
          brand: product.brand || '',
          quantity: product.quantity
        });

        // Load additional images
        if (product.images && product.images.length > 0) {
          product.images.forEach((imageUrl: string) => {
            this.imagesArray.push(this.fb.control(imageUrl, [Validators.pattern(/^https?:\/\/.+/)]));
          });
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.toastr.error('Failed to load product');
        this.router.navigate(['/admin/products']);
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isSubmitting = true;
      const formData = this.productForm.value;
      
      // Filter out empty image URLs
      formData.images = formData.images.filter((url: string) => url.trim() !== '');

      const operation = this.isEditMode 
        ? this.adminService.updateProduct(this.productId!, formData)
        : this.adminService.createProduct(formData);

      operation.subscribe({
        next: (response) => {
          const message = this.isEditMode ? 'Product updated successfully' : 'Product created successfully';
          this.toastr.success(message);
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          console.error('Error saving product:', error);
          const message = this.isEditMode ? 'Failed to update product' : 'Failed to create product';
          this.toastr.error(message);
          this.isSubmitting = false;
        }
      });
    } else {
      this.toastr.error('Please fill in all required fields correctly');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }
}