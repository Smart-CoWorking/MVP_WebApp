import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkformComponent } from './coworkform.component';

describe('CoworkformComponent', () => {
  let component: CoworkformComponent;
  let fixture: ComponentFixture<CoworkformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoworkformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoworkformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
