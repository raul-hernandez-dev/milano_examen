import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifiestosTabla } from './manifiestos-tabla';

describe('ManifiestosTabla', () => {
  let component: ManifiestosTabla;
  let fixture: ComponentFixture<ManifiestosTabla>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifiestosTabla],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosTabla);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
