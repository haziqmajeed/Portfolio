import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitProductComponent } from './submit-product.component';

describe('SubmitProductComponent', () => {
  let component: SubmitProductComponent;
  let fixture: ComponentFixture<SubmitProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
