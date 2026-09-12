import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { TENANT_CONFIGS, TenantConfig, TenantKey } from './tenant-config';

@Injectable({ providedIn: 'root' })
export class TenantService {
  get currentTenantKey(): TenantKey {
    return this.resolveTenantKey();
  }

  get currentTenant(): TenantConfig {
    return TENANT_CONFIGS[this.currentTenantKey];
  }

  get apiBaseUrl(): string {
    return this.currentTenant.apiBaseUrl;
  }

  isFeatureEnabled(feature: keyof TenantConfig['features']): boolean {
    return this.currentTenant.features[feature];
  }

  resolveTenantKey(): TenantKey {
    const tenantKey = (environment.tenantKey || 'siemens').toLowerCase() as TenantKey;
    return TENANT_CONFIGS[tenantKey] ? tenantKey : 'siemens';
  }

  setTenant(_tenantKey: TenantKey): void {
    // build-time tenant configuration only; no runtime tenant selection
  }

  applyTheme(): void {
    const tenant = this.currentTenant;
    const root = document.documentElement;

    root.style.setProperty('--app-primary', tenant.colors.primary);
    root.style.setProperty('--app-primary-strong', tenant.colors.primaryStrong);
    root.style.setProperty('--app-background', tenant.colors.background);
    root.style.setProperty('--app-surface', tenant.colors.surface);
    root.style.setProperty('--app-muted', tenant.colors.muted);
    root.style.setProperty('--app-category-men', tenant.colors.categoryMen);
    root.style.setProperty('--app-category-women', tenant.colors.categoryWomen);
    root.style.setProperty('--app-category-kids', tenant.colors.categoryKids);
    root.style.setProperty('--app-category-accessories', tenant.colors.categoryAccessories);
    root.style.setProperty('--app-category-footwear', tenant.colors.categoryFootwear);
    root.style.setProperty('--app-category-sale', tenant.colors.categorySale);
    root.style.setProperty('--tenant-splash-background', tenant.splashBackground);
    root.style.setProperty('--tenant-splash-accent', tenant.splashAccent);
    document.title = tenant.appName;

    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) {
      favicon.href = tenant.logo;
      favicon.type = 'image/svg+xml';
    }
  }
}
