import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private http = inject(HttpClient);

  getLogs() {
    return this.http.get(`${environment.apiUrl}/inventory-logs`);
  }
}
