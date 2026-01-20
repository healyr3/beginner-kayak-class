import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmericanWhitewaterComponent } from './american-whitewater.component';

describe('AmericanWhitewaterComponent', () => {
  let component: AmericanWhitewaterComponent;
  let fixture: ComponentFixture<AmericanWhitewaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmericanWhitewaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmericanWhitewaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
