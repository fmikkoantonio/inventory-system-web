import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../../shared/layout/layout';

@Component({
  selector: 'app-products',
  imports: [FormsModule, RouterLink, LayoutComponent],
  templateUrl: './products.html',
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);

  products: any[] = [];

  currentPage = 1;

  search = '';

  selectedProduct: any = null;

  stockType: 'IN' | 'OUT' = 'IN';

  stockQuantity = 0;

  showStockModal = false;

  isLoading = false;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts(this.currentPage, this.search).subscribe({
      next: (response: any) => {
        this.products = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  nextPage() {
    this.currentPage++;

    this.loadProducts();
  }

  previousPage() {
    if (this.currentPage === 1) return;

    this.currentPage--;

    this.loadProducts();
  }

  deleteProduct(id: string) {
    const confirmed = confirm('Are you sure you want to delete this product?');

    if (!confirmed) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },

      error: (err) => {
        console.error(err);
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
}
