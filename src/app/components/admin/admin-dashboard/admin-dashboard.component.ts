import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalProducts: 0,
    activeProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalOrders: 0
  };

  recentActivity = [
    {
      action: 'Product Created',
      item: 'iPhone 15 Pro',
      date: new Date(),
      status: 'success'
    },
    {
      action: 'Category Updated',
      item: 'Electronics',
      date: new Date(Date.now() - 86400000),
      status: 'success'
    },
    {
      action: 'User Registered',
      item: 'john.doe@example.com',
      date: new Date(Date.now() - 172800000),
      status: 'pending'
    }
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    // Load products count
    this.adminService.getAllProducts(1, 1).subscribe({
      next: (response) => {
        
        this.stats.totalProducts = response.results || 0;
        this.stats.activeProducts = response.results || 0;
      }
    });

    // Load categories count
    this.adminService.getAllCategories().subscribe({
      next: (response) => {
        this.stats.totalCategories = response.results || response.data?.length || 0;
      }
    });

    // Load users count
    this.adminService.getAllUsers(1, 1).subscribe({
      next: (response) => {
        this.stats.totalUsers = response.results || 0;
        this.stats.activeUsers = response.results || 0;
      }
    });
  }
}