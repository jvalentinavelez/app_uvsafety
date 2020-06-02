import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-uvinfo',
  templateUrl: './uvinfo.page.html',
  styleUrls: ['./uvinfo.page.scss'],
})
export class UvinfoPage implements OnInit {

  constructor(private router: Router) {}
  returnhome(){
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
