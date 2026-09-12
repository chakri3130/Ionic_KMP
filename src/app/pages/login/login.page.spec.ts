import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/lazy';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render username, password, and login button', () => {
    const native = fixture.nativeElement as HTMLElement;
    expect(native.querySelector('ion-input[formControlName="username"]')).toBeTruthy();
    expect(native.querySelector('ion-input[formControlName="password"]')).toBeTruthy();
    expect(native.querySelector('ion-button[type="submit"]')).toBeTruthy();
  });
});
