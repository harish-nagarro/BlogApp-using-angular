import {Injectable, ViewContainerRef} from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operator/map';
import {Router} from '@angular/router';

const BASE_URL = 'https://blooming-dawn-73581.herokuapp.com/tiles/';
const USERS_URL = 'https://blooming-dawn-73581.herokuapp.com/users';
const header = {headers: new Headers( {'Content-Type': 'application/json'})};

@Injectable()
export class TileServiceService {

  demo: number;
  curUserName: string;
  constructor(private http: Http, private router: Router) {
    // this.getCurUser = this.getCurUser.bind(this);
    // this.toastr.setRootViewContainerRef(vcr);

  }

  getData() {
    return this.http.get(BASE_URL).map(res => res.json());
  }

  getTileData(id: number) {
    return this.http.get(BASE_URL + id).map(res => res.json());
  }

  postData( data ) {
    return this.http.post(BASE_URL, data, header).map(res => res.json());
  }

  updateData( data, id ) {
    return this.http.patch(BASE_URL + id, data, header ).map(res => res.json());
  }

  getUsers() {
    return this.http.get(USERS_URL ).map( res => res.json() );
  }

  validateUser(author, password): Observable<boolean> {
    console.log(author + ' ' + password);
    return this.getUsers()
      .map((resp) => {
        console.log(resp);
        for (let i = 0; i < resp.length; i++)
        {

          if ( resp[i].author === author && resp[i].author === author )
          {
            localStorage.setItem('userInfo', JSON.stringify(resp[i]) );
            //localStorage.setItem('author', author );
            this.curUserName = author;
            console.log(this.curUserName);
            return true;
          }
        }
        return false;
      });
  }

  getCurUserInfo() {
    return localStorage.getItem('userInfo');
  }

  logOut() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['home']);
    // this.toastr.success('logout succesful!!');
  }

  updateFavourites(data, id) {
    console.log(data);
    return this.http.patch(USERS_URL + id, data, header ).map(res => res.json());
  }

}
