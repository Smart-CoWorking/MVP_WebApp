import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkmenuComponent } from './coworkmenu.component';

describe('CoworkmenuComponent', () => {
  let component: CoworkmenuComponent;
  let fixture: ComponentFixture<CoworkmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoworkmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoworkmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
