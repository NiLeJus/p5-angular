import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { P5SketchComponent } from "../sketch/sketch.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, P5SketchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'p5-angular-test';
}
