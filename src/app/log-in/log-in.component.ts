import { Component, OnInit } from '@angular/core';
import {TileServiceService} from '../tile-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private service: TileServiceService, private router: Router) { }

  ngOnInit() {
  }

  logIn(author, password) {

    this.service.validateUser(author, password)
      .subscribe((data) => {
        if (data)
          this.router.navigate(['home']);
      });

  }

}
