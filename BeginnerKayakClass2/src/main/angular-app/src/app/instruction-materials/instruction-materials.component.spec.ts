import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionMaterialsComponent } from './instruction-materials.component';

describe('InstructionMaterialsComponent', () => {
  let component: InstructionMaterialsComponent;
  let fixture: ComponentFixture<InstructionMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructionMaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructionMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
