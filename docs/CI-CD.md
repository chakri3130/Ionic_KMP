# Tenant mobile builds on GitHub Actions

Run **Actions → Build tenant mobile app → Run workflow**, then select a tenant, deployment environment, and platform. `development` and `staging` receive distinct bundle IDs (for example, `com.athena.kmp.dev`), so they cannot overwrite a production installation.

## Required GitHub secrets

Android uses one signing key for all tenants unless your release policy requires separate keys.

- `ANDROID_KEYSTORE_BASE64`: base64-encoded `.jks` or `.keystore` file
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

iOS signing uses [fastlane match](https://docs.fastlane.tools/actions/match/) and needs one provisioning profile per bundle ID. Create and register each Apple App ID first: `com.siemens.kmp`, `com.climatix.kmp`, `com.cateroillar.kmp`, and `com.athena.kmp`.

- `MATCH_GIT_URL`: SSH URL of the private fastlane-match certificates repository
- `MATCH_SSH_PRIVATE_KEY`: deploy key permitted to read that repository
- `MATCH_PASSWORD`: password used to encrypt the match repository

Before the first CI build, a Mac with the Apple signing account must create each profile in the match repository. Example:

```bash
bundle install
bundle exec fastlane match appstore app_identifier:com.athena.kmp
```

Repeat for every tenant bundle ID. The workflow uses `readonly: true`, so CI can consume profiles but cannot create or change signing assets.

## Tenant source of truth

`tenants/tenants.json` is the single tenant source of truth. It contains native app identity, Angular branding and content, API base URL, and feature flags. `src/app/core/tenant/tenant-config.ts` only provides TypeScript types and a typed adapter; do not add tenant values there.

Each tenant's `environments` section sets the API URL, native bundle-ID suffix, display-name suffix, and iOS export method. Replace the `*.example.com` API URLs before deployment. Create matching Apple App IDs and Fastlane Match profiles for development and staging IDs as well as production.

Each tenant must also supply `resources/tenants/<tenant>/icon.png` and `splash.png`. See `resources/tenants/README.md` for the required source dimensions. The build generates platform-specific Android and iOS assets from those masters.

Native icons and splash assets currently come from the shared Cordova `resources/` directory. Add tenant-specific resource generation before release if each store app needs its own launcher icon or native splash screen.
