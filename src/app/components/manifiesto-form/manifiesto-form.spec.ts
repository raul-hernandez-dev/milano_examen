import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifiestoForm } from './manifiesto-form';

describe('ManifiestoForm', () => {
  let component: ManifiestoForm;
  let fixture: ComponentFixture<ManifiestoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifiestoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
