import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(page = 1, search = '') {
    return this.http.get(`${environment.apiUrl}/products?page=${page}&search=${search}`);
  }

  createProduct(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/products`, formData);
  }

  getProductById(id: string) {
    return this.http.get(`${environment.apiUrl}/products/${id}`);
  }

  updateProduct(id: string, formData: FormData) {
    return this.http.put(`${environment.apiUrl}/products/${id}`, formData);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }

  updateStock(productId: string, type: 'IN' | 'OUT', quantity: number) {
    return this.http.post(`${environment.apiUrl}/stock/${productId}`, {
      type,
      quantity,
    });
  }
}
