import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourceEditComponent } from './cource-edit.component';

describe('CourceEditComponent', () => {
  let component: CourceEditComponent;
  let fixture: ComponentFixture<CourceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourceEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
