import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pool1',
  standalone: true,
    imports: [CommonModule, RouterLink],
  templateUrl: './pool1.component.html',
  styleUrl: './pool1.component.css'
})
export class Pool1Component {

}
