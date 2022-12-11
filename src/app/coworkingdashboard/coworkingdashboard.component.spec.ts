import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkingdashboardComponent } from './coworkingdashboard.component';

describe('CoworkingdashboardComponent', () => {
  let component: CoworkingdashboardComponent;
  let fixture: ComponentFixture<CoworkingdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoworkingdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoworkingdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
