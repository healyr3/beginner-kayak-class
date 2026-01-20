import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubTripsComponent } from './club-trips.component';

describe('ClubTripsComponent', () => {
  let component: ClubTripsComponent;
  let fixture: ComponentFixture<ClubTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubTripsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
