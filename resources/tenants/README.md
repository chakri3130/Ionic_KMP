# Tenant native-branding assets

Create one folder for each tenant named in `tenants/tenants.json` and add these source files:

```text
resources/tenants/athena/icon.png
resources/tenants/athena/splash.png
```

`icon.png` must be a square 1024 × 1024 PNG. Use an opaque background; iOS does not allow alpha transparency in an app icon.

`splash.png` should be a 2732 × 2732 PNG. Keep important artwork in the centre safe area because mobile screens crop the outer edges differently.

The tenant preparation script copies the selected master images to Cordova's `resources/` directory, then `cordova-res` generates the Android and iOS icon/splash sizes used by that build. Do not manually edit generated files under `resources/android/` or `resources/ios/`.
