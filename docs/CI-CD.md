# Tenant mobile builds on GitHub Actions

Run **Actions → Build tenant mobile app → Run workflow**, then choose one tenant. The workflow builds that tenant's Angular assets, updates Cordova metadata in the disposable CI checkout, and uploads both Android and iOS artifacts.

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

Native icons and splash assets currently come from the shared Cordova `resources/` directory. Add tenant-specific resource generation before release if each store app needs its own launcher icon or native splash screen.
