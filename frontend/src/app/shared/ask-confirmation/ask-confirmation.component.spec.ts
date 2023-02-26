import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskConfirmationComponent } from './ask-confirmation.component';

describe('AskConfirmationComponent', () => {
  let component: AskConfirmationComponent;
  let fixture: ComponentFixture<AskConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AskConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
