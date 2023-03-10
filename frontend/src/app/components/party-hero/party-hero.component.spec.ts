import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHeroComponent } from './party-hero.component';

describe('PartyHeroComponent', () => {
  let component: PartyHeroComponent;
  let fixture: ComponentFixture<PartyHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PartyHeroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
