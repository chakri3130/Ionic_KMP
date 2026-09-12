import { Component } from '@angular/core';

import { TenantService } from './core/tenant/tenant.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private readonly tenantService: TenantService) {
    this.tenantService.applyTheme();
  }
}
