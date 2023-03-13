import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMitComponent } from './about-mit.component';

describe('AboutMitComponent', () => {
  let component: AboutMitComponent;
  let fixture: ComponentFixture<AboutMitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AboutMitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
