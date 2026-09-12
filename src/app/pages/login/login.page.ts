import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { KmpAuthService } from '../../core/auth/kmp-auth';
import { TenantService } from '../../core/tenant/tenant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: KmpAuthService,
    private readonly router: Router,
    private readonly tenantService: TenantService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get currentTenant() {
    return this.tenantService.currentTenant;
  }

  ngOnInit(): void {
    this.tenantService.applyTheme();
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    try {
      const user = await this.authService.login(username, password);

      if (user?.authenticated) {
        this.router.navigate(['/home']);
        return;
      }

      console.warn('Invalid username or password');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}
