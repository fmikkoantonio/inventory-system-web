import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  getCategories() {
    return this.http.get(`${environment.apiUrl}/categories`);
  }

  createCategory(name: string) {
    return this.http.post(`${environment.apiUrl}/categories`, { name });
  }

  updateCategory(id: string, name: string) {
    return this.http.put(`${environment.apiUrl}/categories/${id}`, { name });
  }

  deleteCategory(id: string) {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`);
  }
}
