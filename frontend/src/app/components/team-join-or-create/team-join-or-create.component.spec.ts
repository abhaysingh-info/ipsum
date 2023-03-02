import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamJoinOrCreateComponent } from './team-join-or-create.component';

describe('TeamJoinOrCreateComponent', () => {
  let component: TeamJoinOrCreateComponent;
  let fixture: ComponentFixture<TeamJoinOrCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TeamJoinOrCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamJoinOrCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
