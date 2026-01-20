import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {MainNavComponent} from "./main-nav/main-nav.component";
import {HomeComponent} from "./home/home.component";
import {ClassroomComponent} from "./classroom/classroom.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, ClassroomComponent, RouterOutlet, MatButtonModule, MainNavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'paddle-whitewater';
}

