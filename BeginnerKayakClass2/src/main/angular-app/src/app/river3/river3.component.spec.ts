import { ComponentFixture, TestBed } from '@angular/core/testing';

import { River3Component } from './river3.component';

describe('River3Component', () => {
  let component: River3Component;
  let fixture: ComponentFixture<River3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [River3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(River3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
