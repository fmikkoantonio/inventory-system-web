import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../../../shared/layout/layout';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LayoutComponent,
    RouterLink,

    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './add-product.html',
})
export class AddProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  selectedFile: File | null = null;

  categories: any[] = [];

  isLoading = false;

  imagePreview: string | null = null;

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

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    this.isLoading = true;

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

        this.selectedFile = null;

        this.imagePreview = null;

        this.isLoading = false;
      },

      error: (err) => {
        console.error(err);

        this.isLoading = false;
      },
    });
  }
}
