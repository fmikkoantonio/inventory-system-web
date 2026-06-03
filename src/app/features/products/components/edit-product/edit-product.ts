import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { LayoutComponent } from '../../../../shared/layout/layout';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutComponent,
    RouterLink,

    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    TextareaModule,
  ],
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

  isLoading = false;

  imagePreview: string | null = null;

  currentImage = '';

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
        this.currentImage = product.image;

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

    this.productService.updateProduct(this.productId, formData).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },

      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
