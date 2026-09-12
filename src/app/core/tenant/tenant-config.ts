import tenantDefinitions from '../../../../tenants/tenants.json';

export type TenantKey = keyof typeof tenantDefinitions;

export interface TenantCategory {
  name: string;
  items: number;
  icon: string;
  color: string;
}

export interface TenantConfig {
  key: TenantKey;
  appName: string;
  displayName: string;
  bundleId: string;
  logo: string;
  apiBaseUrl: string;
  features: {
    loyaltyProgram: boolean;
    expressCheckout: boolean;
  };
  splashBackground: string;
  splashAccent: string;
  colors: {
    primary: string;
    primaryStrong: string;
    background: string;
    surface: string;
    muted: string;
    categoryMen: string;
    categoryWomen: string;
    categoryKids: string;
    categoryAccessories: string;
    categoryFootwear: string;
    categorySale: string;
  };
  categories: TenantCategory[];
}

export const TENANT_CONFIGS = Object.fromEntries(
  Object.entries(tenantDefinitions).map(([key, tenant]) => [key, { key, ...tenant }]),
) as Record<TenantKey, TenantConfig>;

export const TENANT_KEYS = Object.keys(TENANT_CONFIGS) as TenantKey[];
