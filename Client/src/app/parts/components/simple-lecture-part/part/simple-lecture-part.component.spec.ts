import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLecturePartComponent } from './simple-lecture-part.component';

describe('SimpleLectionPartComponent', () => {
  let component: SimpleLecturePartComponent;
  let fixture: ComponentFixture<SimpleLecturePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleLecturePartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleLecturePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
