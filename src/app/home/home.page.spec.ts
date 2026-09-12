import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/lazy';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render clothing categories with icons and colors', () => {
    const native = fixture.nativeElement as HTMLElement;
    const cards = native.querySelectorAll('.category-card');

    expect(cards.length).toBeGreaterThan(0);
    expect(native.querySelector('ion-icon')).toBeTruthy();
  });
});
