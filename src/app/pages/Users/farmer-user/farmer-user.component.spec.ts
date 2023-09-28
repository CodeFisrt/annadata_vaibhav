import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerUserComponent } from './farmer-user.component';

describe('FarmerUserComponent', () => {
  let component: FarmerUserComponent;
  let fixture: ComponentFixture<FarmerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
