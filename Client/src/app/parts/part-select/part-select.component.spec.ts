import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartSelectComponent } from './part-select.component';

describe('PartSelectComponent', () => {
  let component: PartSelectComponent;
  let fixture: ComponentFixture<PartSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
