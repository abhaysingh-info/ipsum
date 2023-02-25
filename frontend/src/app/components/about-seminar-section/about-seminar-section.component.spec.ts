import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSeminarSectionComponent } from './about-seminar-section.component';

describe('AboutSeminarSectionComponent', () => {
  let component: AboutSeminarSectionComponent;
  let fixture: ComponentFixture<AboutSeminarSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AboutSeminarSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSeminarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
