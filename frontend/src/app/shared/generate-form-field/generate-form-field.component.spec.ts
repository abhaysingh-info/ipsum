import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFormFieldComponent } from './generate-form-field.component';

describe('GenerateFormFieldComponent', () => {
  let component: GenerateFormFieldComponent;
  let fixture: ComponentFixture<GenerateFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GenerateFormFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
