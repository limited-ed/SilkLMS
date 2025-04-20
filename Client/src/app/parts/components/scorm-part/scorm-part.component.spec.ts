import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScormPartComponent } from './scorm-part.component';

describe('ScormPartComponent', () => {
  let component: ScormPartComponent;
  let fixture: ComponentFixture<ScormPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScormPartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScormPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
