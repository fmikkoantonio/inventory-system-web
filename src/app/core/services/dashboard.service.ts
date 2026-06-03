import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import {
  DashboardStats,
  InventoryValueByCategory,
  LowStockProduct,
  RecentLog,
} from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  getStats() {
    return this.http.get<DashboardStats>(`${environment.apiUrl}/dashboard`);
  }

  getLowStockProducts() {
    return this.http.get<LowStockProduct[]>(`${environment.apiUrl}/dashboard/low-stock`);
  }

  getRecentLogs() {
    return this.http.get<RecentLog[]>(`${environment.apiUrl}/dashboard/recent-logs`);
  }

  getInventoryValueByCategory() {
    return this.http.get<InventoryValueByCategory[]>(
      `${environment.apiUrl}/dashboard/inventory-value-by-category`,
    );
  }
}
