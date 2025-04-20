import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPartComponent } from './test-part.component';

describe('TestPartComponent', () => {
  let component: TestPartComponent;
  let fixture: ComponentFixture<TestPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
