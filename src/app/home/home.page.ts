import { Component, OnInit } from '@angular/core';

import { TenantService } from '../core/tenant/tenant.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  categories: Array<{ name: string; items: number; icon: string; color: string }> = [];

  constructor(private readonly tenantService: TenantService) {}

  ngOnInit(): void {
    this.categories = this.tenantService.currentTenant.categories;
  }
}
