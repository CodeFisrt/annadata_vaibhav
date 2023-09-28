import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFarmerComponent } from './add-new-farmer.component';

describe('AddNewFarmerComponent', () => {
  let component: AddNewFarmerComponent;
  let fixture: ComponentFixture<AddNewFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewFarmerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
