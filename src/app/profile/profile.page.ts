import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import { UserinfoService } from '../services/userinfo.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
   
  mainuser: AngularFirestoreDocument
  sub
  name: string
  skin:string
  gender:string
  email:string
  birthdate:string

  constructor(
    private afAuth : AngularFireAuth, 
    private router: Router,  
    public user: UserinfoService,
    public afs: AngularFirestore,
    ) {
      this.mainuser = afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.name = event.name
        this.email = event.email
        this.skin = event.skin
        this.gender = event.gender
        this.birthdate = event.birthdate
      })
    }
  returnhome(){
    this.router.navigate(['home']);
  }
  Onlogout(){
    this.user.logout();
  }

  ngOnInit(){

    }

}
