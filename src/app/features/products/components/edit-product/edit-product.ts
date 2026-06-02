import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.html',
})
export class EditProductComponent implements OnInit {
  private fb = inject(FormBuilder);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private productService = inject(ProductService);

  private categoryService = inject(CategoryService);

  productId = '';

  categories: any[] = [];

  selectedFile: File | null = null;

  productForm = this.fb.group({
    name: ['', Validators.required],

    sku: ['', Validators.required],

    description: [''],

    price: [0, Validators.required],

    category: ['', Validators.required],
  });

  ngOnInit() {
    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.productId = id;

    this.loadProduct();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: any) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (product: any) => {
        this.productForm.patchValue({
          name: product.name,

          sku: product.sku,

          description: product.description,

          price: product.price,

          category: product.category?._id,
        });
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const formData = new FormData();

    Object.entries(this.productForm.getRawValue()).forEach(([key, value]) => {
      formData.append(key, String(value ?? ''));
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.updateProduct(this.productId, formData).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
