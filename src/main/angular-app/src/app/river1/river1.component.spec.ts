import { ComponentFixture, TestBed } from '@angular/core/testing';

import { River1Component } from './river1.component';

describe('River1Component', () => {
  let component: River1Component;
  let fixture: ComponentFixture<River1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [River1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(River1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
