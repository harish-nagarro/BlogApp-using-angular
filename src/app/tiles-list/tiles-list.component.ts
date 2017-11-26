import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tiles-list',
  templateUrl: './tiles-list.component.html',
  styleUrls: ['./tiles-list.component.css']
})
export class TilesListComponent {

  @Input('tilesList') tilesData;

  constructor(private router: Router) {
    // console.log(this.tilesData);
  }

  tileDetail(tile) {
    console.log(tile);
    this.router.navigateByUrl('/tile/' + tile.id);
  }


}
