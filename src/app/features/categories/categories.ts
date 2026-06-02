import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { LayoutComponent } from '../../shared/layout/layout';

@Component({
  selector: 'app-categories',
  imports: [FormsModule, LayoutComponent],
  templateUrl: './categories.html',
})
export class CategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);

  categories: any[] = [];

  categoryName = '';

  editingCategoryId: string | null = null;

  editingName = '';

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: console.error,
    });
  }

  createCategory() {
    if (!this.categoryName.trim()) return;

    this.categoryService.createCategory(this.categoryName).subscribe({
      next: () => {
        this.categoryName = '';

        this.loadCategories();
      },
      error: console.error,
    });
  }

  startEdit(category: any) {
    this.editingCategoryId = category._id;

    this.editingName = category.name;
  }

  saveEdit() {
    if (!this.editingCategoryId) return;

    this.categoryService.updateCategory(this.editingCategoryId, this.editingName).subscribe({
      next: () => {
        this.editingCategoryId = null;

        this.editingName = '';

        this.loadCategories();
      },
      error: console.error,
    });
  }

  deleteCategory(id: string) {
    if (!confirm('Delete this category?')) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.loadCategories();
      },
      error: console.error,
    });
  }
}
