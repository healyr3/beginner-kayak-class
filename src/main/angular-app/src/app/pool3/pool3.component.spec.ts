import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pool3Component } from './pool3.component';

describe('Pool3Component', () => {
  let component: Pool3Component;
  let fixture: ComponentFixture<Pool3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pool3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Pool3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
