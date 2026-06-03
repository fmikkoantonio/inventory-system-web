import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { LayoutComponent } from '../../shared/layout/layout';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categories',
  imports: [
    FormsModule,
    LayoutComponent,

    ButtonModule,
    InputTextModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './categories.html',
})
export class CategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);

  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

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
    this.confirmationService.confirm({
      header: 'Delete Category',
      message: 'Are you sure you want to delete this category?',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Category deleted successfully',
            });

            this.loadCategories();
          },

          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Unable to delete category',
            });
          },
        });
      },
    });
  }
}
