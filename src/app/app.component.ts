import { Component } from '@angular/core';
import { BuildingViewComponent } from './building-view/building-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aquatech';
  constructor() {
    console.log("Hellooooooo");
  }

}
