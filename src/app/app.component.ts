import {Component} from '@angular/core';
import {TileServiceService} from "./tile-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  constructor(public s:TileServiceService) {

  }

}
