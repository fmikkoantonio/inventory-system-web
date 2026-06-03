import { Component, inject } from '@angular/core';
import { forkJoin, tap } from 'rxjs';

import { DashboardService } from '../../core/services/dashboard.service';
import { LayoutComponent } from '../../shared/layout/layout';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  imports: [LayoutComponent, AsyncPipe, BaseChartDirective, DecimalPipe],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  private dashboardService = inject(DashboardService);

  public pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  pieChartLabels: string[] = [];

  pieChartData: number[] = [];

  dashboardData$ = forkJoin({
    stats: this.dashboardService.getStats(),
    lowStockProducts: this.dashboardService.getLowStockProducts(),
    recentLogs: this.dashboardService.getRecentLogs(),
    inventoryValueByCategory: this.dashboardService.getInventoryValueByCategory(),
  }).pipe(
    tap((data: any) => {
      this.pieChartLabels = data.inventoryValueByCategory.map((item: any) => item._id);

      this.pieChartData = data.inventoryValueByCategory.map((item: any) => item.value);
    }),
  );
}
