import { ComponentFixture, TestBed } from '@angular/core/testing';

import { River2Component } from './river2.component';

describe('River2Component', () => {
  let component: River2Component;
  let fixture: ComponentFixture<River2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [River2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(River2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
