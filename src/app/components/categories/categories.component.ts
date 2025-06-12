import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { CategoriesService } from '../../service/categories.service';
import { CommonModule } from '@angular/common';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-categories',
  imports: [MatCardModule, MatRadioModule, FormsModule, MatSliderModule, MatProgressSpinnerModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  isLoading: boolean = true;

  constructor(private categoriesService: CategoriesService) {}

  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (response: any) => {
        console.log(response, 'asd');
        this.isLoading = false;
        this.categories = response.data;
        
      },
      error: (err: any) => {
        console.error(err);

      },
    });
  }
}
