import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourceDetailComponent } from './cource-detail.component';

describe('CourceDetailComponent', () => {
  let component: CourceDetailComponent;
  let fixture: ComponentFixture<CourceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourceDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
