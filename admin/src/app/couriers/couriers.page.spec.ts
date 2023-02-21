import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CouriersPage } from './couriers.page';

describe('CouriersPage', () => {
  let component: CouriersPage;
  let fixture: ComponentFixture<CouriersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouriersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CouriersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
