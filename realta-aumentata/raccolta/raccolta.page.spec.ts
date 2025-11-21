import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RaccoltaPage } from './raccolta.page';

describe('RaccoltaPage', () => {
  let component: RaccoltaPage;
  let fixture: ComponentFixture<RaccoltaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RaccoltaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
