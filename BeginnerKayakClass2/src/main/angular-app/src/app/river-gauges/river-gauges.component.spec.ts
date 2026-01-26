import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiverGaugesComponent } from './river-gauges.component';

describe('RiverGaugesComponent', () => {
  let component: RiverGaugesComponent;
  let fixture: ComponentFixture<RiverGaugesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiverGaugesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiverGaugesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
