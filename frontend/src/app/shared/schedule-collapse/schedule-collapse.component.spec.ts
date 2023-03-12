import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCollapseComponent } from './schedule-collapse.component';

describe('ScheduleCollapseComponent', () => {
  let component: ScheduleCollapseComponent;
  let fixture: ComponentFixture<ScheduleCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ScheduleCollapseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
