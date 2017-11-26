import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {TileServiceService} from '../tile-service.service';
import {Router} from '@angular/router';
import {PostDataService} from '../post-data.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  curUserinfo: any;
  constructor(private request: TileServiceService, private router: Router,
              private postDataService: PostDataService, private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.curUserinfo = JSON.parse(this.request.getCurUserInfo());
    if (this.curUserinfo === null) {
      this.router.navigate(['/logIn']);
    }
  }

  postData(title, info, category, author) {
    console.log(category);
    console.log('here it is');
      const data = {
        'title': title,
        'info': info,
        'category': category,
        'author': author,
        'likes': 0
      };

      this.request.postData(data)
        .subscribe( (res) => {
           console.log(res);
           this.postDataService.updateData( res );
        });

      this.router.navigateByUrl('/');
  }

  logOut() {
    console.log('logging out');
    this.toastr.success('logout succesful!!');

    this.request.logOut();
    // this.toastr.success('logout succesful!!');
  }
}
