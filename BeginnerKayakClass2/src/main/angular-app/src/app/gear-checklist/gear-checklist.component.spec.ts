import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearChecklistComponent } from './gear-checklist.component';

describe('GearChecklistComponent', () => {
  let component: GearChecklistComponent;
  let fixture: ComponentFixture<GearChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearChecklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GearChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
