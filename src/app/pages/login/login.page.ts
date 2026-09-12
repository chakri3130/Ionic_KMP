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

  async onLogin() {
    this.router.navigate(['/home']);
  }
}
