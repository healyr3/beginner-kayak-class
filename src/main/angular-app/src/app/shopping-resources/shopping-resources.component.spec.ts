import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingResourcesComponent } from './shopping-resources.component';

describe('ShoppingResourcesComponent', () => {
  let component: ShoppingResourcesComponent;
  let fixture: ComponentFixture<ShoppingResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingResourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
