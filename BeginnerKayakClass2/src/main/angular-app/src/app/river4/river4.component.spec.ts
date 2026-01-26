import { ComponentFixture, TestBed } from '@angular/core/testing';

import { River4Component } from './river4.component';

describe('River4Component', () => {
  let component: River4Component;
  let fixture: ComponentFixture<River4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [River4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(River4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
