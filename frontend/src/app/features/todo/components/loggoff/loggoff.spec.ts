import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loggoff } from './loggoff';

describe('Loggoff', () => {
  let component: Loggoff;
  let fixture: ComponentFixture<Loggoff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loggoff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loggoff);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
