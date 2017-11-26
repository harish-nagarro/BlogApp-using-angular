import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {TileServiceService} from '../tile-service.service';
import {PostDataService} from '../post-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tiles: Object[];
  loggedIn: boolean;
  loggedInUser: string;
  userInfo: any;
  curPosts: string  ;
  sub: any;
  favourites: Array<string>;

  constructor(private request: TileServiceService, private postDataService: PostDataService
    , private router: Router, private route: ActivatedRoute, private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.curPosts = 'all';
    console.log('IN' + this.curPosts);
    console.log('check here');
    this.sub = this.route.params.subscribe(params => {
      // this.id = +params['id'];
      console.log('id: ' + params['id']);
      this.curPosts = params['id'];


      this.userInfo = JSON.parse(this.request.getCurUserInfo());

      this.loggedIn = true;
      if (  this.userInfo === null) {
        this.loggedIn = false;
      } else {
        const self = this;
        this.favourites = this.userInfo.favourites;
        this.request.getTileData( parseInt (this.userInfo.id) )
          .subscribe((data) => {
            self.loggedInUser = data.author;
          });
      }

      console.log('come here');

      this.request.getData()
        .subscribe((data) => {
          this.tiles = data;
          console.log(data);
        });

      this.postDataService.getData()
        .subscribe( data => {
          console.log(data);
          this.tiles.push(data);
        });

    });
  }

  logOut() {
    this.loggedIn = false;
    this.request.logOut();

    this.toastr.success('logout succesful!!');

  }

  showAllPosts() {
    this.router.navigate(['home/all']);
  }

  showMyPosts() {
    this.router.navigate(['home/myPosts']);
  }

  popular() {
    this.router.navigate(['home/popular']);
  }

  showFavourites() {
    this.router.navigate(['home/favourites']);
  }

  categories(category) {
    this.router.navigate(['home/' + category]);

  }

}
