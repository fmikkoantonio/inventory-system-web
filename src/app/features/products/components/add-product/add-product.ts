import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.html',
})
export class AddProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  selectedFile: File | null = null;

  categories: any[] = [];

  productForm = this.fb.group({
    name: ['', Validators.required],
    sku: ['', Validators.required],
    description: [''],
    quantity: [0, Validators.required],
    price: [0, Validators.required],
    category: [''],
  });

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
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

    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.productForm.reset();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
