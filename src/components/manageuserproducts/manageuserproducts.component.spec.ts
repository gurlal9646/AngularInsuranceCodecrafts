import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageuserproductsComponent } from './manageuserproducts.component';

describe('ManageuserproductsComponent', () => {
  let component: ManageuserproductsComponent;
  let fixture: ComponentFixture<ManageuserproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageuserproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageuserproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
