import { Component, inject } from '@angular/core';
import { forkJoin } from 'rxjs';

import { DashboardService } from '../../core/services/dashboard.service';
import { LayoutComponent } from '../../shared/layout/layout';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [LayoutComponent, AsyncPipe],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  private dashboardService = inject(DashboardService);

  dashboardData$ = forkJoin({
    stats: this.dashboardService.getStats(),

    lowStockProducts: this.dashboardService.getLowStockProducts(),

    recentLogs: this.dashboardService.getRecentLogs(),
  });
}
