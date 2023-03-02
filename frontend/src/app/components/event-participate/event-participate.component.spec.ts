import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParticipateComponent } from './event-participate.component';

describe('EventParticipateComponent', () => {
  let component: EventParticipateComponent;
  let fixture: ComponentFixture<EventParticipateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EventParticipateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventParticipateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
