import { Component, OnInit, inject } from '@angular/core';
import { ActivityService } from '../../core/services/activity.service';
import { LayoutComponent } from '../../shared/layout/layout';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.html',
  imports: [LayoutComponent, TableModule, TagModule, DatePipe],
})
export class ActivityComponent implements OnInit {
  private activityService = inject(ActivityService);

  logs: any[] = [];

  ngOnInit() {
    this.activityService.getLogs().subscribe({
      next: (response: any) => {
        this.logs = response;
      },
      error: console.error,
    });
  }
}
