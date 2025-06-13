import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService, User } from '../../../service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-users',
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatIconModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './admin-users.component.html'
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  searchTerm = '';
  selectedRole = '';
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;

  // Modal states
  showEditModal = false;
  showPasswordModal = false;
  selectedUser: User | null = null;

  // Forms
  editUserForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      role: ['user', Validators.required]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.adminService.getAllUsers(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        console.log(response.data);
        
        this.users = response.data || [];
        this.totalPages = response.metadata?.numberOfPages || 1;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.toastr.error('Failed to load users');
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadUsers();
  }

  onRoleFilter() {
    this.currentPage = 1;
    this.loadUsers();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers();
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

  editUser(user: User) {
    this.selectedUser = user;
    this.editUserForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role
    });
    this.showEditModal = true;
  }

  saveUser() {
    if (this.editUserForm.valid && this.selectedUser) {
      const formData = this.editUserForm.value;
      this.adminService.updateUser(this.selectedUser._id!, formData).subscribe({
        next: () => {
          this.toastr.success('User updated successfully');
          this.closeEditModal();
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.toastr.error('Failed to update user');
        }
      });
    }
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedUser = null;
    this.editUserForm.reset();
  }

  changePassword(user: User) {
    this.selectedUser = user;
    this.passwordForm.reset();
    this.showPasswordModal = true;
  }

  savePassword() {
    if (this.passwordForm.valid && this.selectedUser) {
      const password = this.passwordForm.value.password;
      this.adminService.changeUserPassword(this.selectedUser._id!, password).subscribe({
        next: () => {
          this.toastr.success('Password changed successfully');
          this.closePasswordModal();
        },
        error: (error) => {
          console.error('Error changing password:', error);
          this.toastr.error('Failed to change password');
        }
      });
    }
  }

  closePasswordModal() {
    this.showPasswordModal = false;
    this.selectedUser = null;
    this.passwordForm.reset();
  }

  toggleUserStatus(user: User) {
    const newStatus = !user.active;
    const action = newStatus ? 'activate' : 'deactivate';
    
    if (confirm(`Are you sure you want to ${action} ${user.name}?`)) {
      this.adminService.updateUser(user._id!, { active: newStatus }).subscribe({
        next: () => {
          this.toastr.success(`User ${action}d successfully`);
          this.loadUsers();
        },
        error: (error) => {
          console.error(`Error ${action}ing user:`, error);
          this.toastr.error(`Failed to ${action} user`);
        }
      });
    }
  }

  deleteUser(id: string, name: string) {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      this.adminService.deleteUser(id).subscribe({
        next: () => {
          this.toastr.success('User deleted successfully');
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.toastr.error('Failed to delete user');
        }
      });
    }
  }
}