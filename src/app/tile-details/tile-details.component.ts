import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TileServiceService} from '../tile-service.service';
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-tile-details',
  templateUrl: './tile-details.component.html',
  styleUrls: ['./tile-details.component.css']
})
export class TileDetailsComponent implements OnInit, OnDestroy {

  id: number;
  sub: any;
  tile: object = {};
  updateDiv: boolean;
  hasAcess: boolean;
  loggedIn: boolean;
  userInfo: any;
  voted: boolean;


  constructor(private route: ActivatedRoute, private tileService: TileServiceService,
              private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    this.updateDiv = false;
    this.voted = false;
    this.hasAcess = false;
    this.userInfo = JSON.parse(this.tileService.getCurUserInfo());
    this.loggedIn = true;
    if (  this.userInfo === null) {
      this.loggedIn = false;
    }


    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      console.log('id: ' + this.id);

      this.tileService.getTileData(this.id)
        .subscribe((data) => {
          this.tile = data;
          console.log( this.tile);
          if (this.userInfo != null && data.author === this.userInfo.author)
            this.hasAcess = true;

          if (this.userInfo != null && this.userInfo.favourites.indexOf('' + this.tile['id']) > -1) {
            this.voted = true;
          } else {
            this.voted = false;
          }
        });
    });
  }

  alterUpdate() {
    this.updateDiv = !this.updateDiv;
  }

  updateData(title, info, author, id) {

    const data = {
      'title': title,
      'info': info,
      'author': author
    };

    this.tileService.updateData(data, id)
      .subscribe((resp) => {
        this.tile = resp;
      });
  }

  logOut() {
    this.tileService.logOut();
    console.log('logging Out');
    this.toastr.success('logout successfull!!');
  }

  upVote() {
    console.log('' + this.tile['id']);
    console.log(this.tile['id']);
    this.tile['likes'] = this.tile['likes'] + 1;
    const data = {
      'likes': this.tile['likes']
    };
    this.tileService.updateData(data, this.tile['id'])
      .subscribe(( data1) => {
        console.log(data1);
      });

    console.log(this.userInfo.favourites);
    this.userInfo.favourites.push('' + this.tile['id'] );
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    console.log(this.userInfo.favourites);
    let self = this;
    const userData = {
      'favourites': self.userInfo.favourites
    };
    console.log(userData);
    this.tileService.updateFavourites(userData, this.userInfo.id )
      .subscribe( () => {

      });

    this.voted = true;
  }

  downVote() {
    console.log('' + this.tile['id']);
    console.log(this.tile['id']);
    this.tile['likes'] = this.tile['likes'] - 1;
    const data = {
      'likes': this.tile['likes']
    };
    this.tileService.updateData(data, this.tile['id'])
      .subscribe(( data1) => {
        console.log(data1);
      });

    console.log(this.userInfo.favourites);
    // this.userInfo.favourites.push('' + this.tile['id'] );

    let index = this.userInfo.favourites.indexOf('' +  this.tile['id'] );    // <-- Not supported in <IE9
    if (index !== -1) {
      this.userInfo.favourites.splice(index, 1);
    }

    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    console.log(this.userInfo.favourites);
    let self = this;
    const userData = {
      'favourites': self.userInfo.favourites
    };
    console.log(userData);
    this.tileService.updateFavourites(userData, this.userInfo.id )
      .subscribe( () => {

      });

    this.voted = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
