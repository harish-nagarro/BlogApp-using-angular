import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class PostDataService {

  constructor() { }

  private dataObs$ = new Subject();

  getData() {
    console.log('get');
    return this.dataObs$;
  }

  updateData(data: object) {
    this.dataObs$.next(data);
    console.log('this.dataObs$');
    // this.dataObs$.subscribe( ( data1 ) => { console.log(data1); } );

  }
}
