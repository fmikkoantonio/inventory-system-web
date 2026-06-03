import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../../shared/layout/layout';
import { CategoryService } from '../../core/services/category.service';
import { DecimalPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    RouterLink,
    LayoutComponent,
    DecimalPipe,
    TooltipModule,
    TableModule,
    ButtonModule,
    DialogModule,
    TagModule,
    InputTextModule,
    SelectModule,
    ConfirmDialogModule,
    ToastModule,
    InputNumberModule,
  ],
  templateUrl: './products.html',
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);

  private categoryService = inject(CategoryService);

  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  products: any[] = [];

  totalPages = 1;

  currentPage = 1;

  searchTerm = '';

  categories: any[] = [];

  selectedCategory = '';

  selectedProduct: any = null;

  stockType: 'IN' | 'OUT' = 'IN';

  stockQuantity = 0;

  showStockModal = false;

  isLoading = false;

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
    });
  }

  loadProducts() {
    this.productService
      .getProducts(this.currentPage, 10, this.searchTerm, this.selectedCategory)
      .subscribe({
        next: (response: any) => {
          this.products = response.products;

          this.totalPages = response.totalPages;
        },
        error: console.error,
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;

      this.loadProducts();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;

      this.loadProducts();
    }
  }

  deleteProduct(id: string) {
    this.confirmationService.confirm({
      header: 'Delete Product',
      message: 'Are you sure you want to delete this product?',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Product deleted successfully',
            });

            this.loadProducts();
          },

          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Unable to delete product',
            });
          },
        });
      },
    });
  }

  openStockModal(product: any, type: 'IN' | 'OUT') {
    this.selectedProduct = product;

    this.stockType = type;

    this.stockQuantity = 0;

    this.showStockModal = true;
  }

  submitStockTransaction() {
    if (!this.selectedProduct) return;

    this.productService
      .updateStock(this.selectedProduct._id, this.stockType, this.stockQuantity)
      .subscribe({
        next: () => {
          this.showStockModal = false;

          this.loadProducts();
        },

        error: (err) => {
          console.error(err);
        },
      });
  }

  searchProducts() {
    this.currentPage = 1;

    this.loadProducts();
  }
}
