import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-club-trips',
  standalone: true,
    imports: [CommonModule, RouterLink],
  templateUrl: './club-trips.component.html',
  styleUrl: './club-trips.component.css'
})
export class ClubTripsComponent {

}
