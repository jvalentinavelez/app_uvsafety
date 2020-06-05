import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from "@angular/router";
import { auth } from 'firebase/app'


interface user{
  email: string,
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  private user: user
  constructor(
    private afAuth : AngularFireAuth, 
    private router : Router, 
  ) { }
  setUser(user:user){
    this.user = user
  }
  getUID(){
    if(!this.user){
      if (this.afAuth.auth.currentUser){
        const user = this.afAuth.auth.currentUser
        this.setUser({
          email: user.email,
          uid: user.uid
        })
        return user.uid
      }
    } else{
      return this.user.uid
    }
  }
  getEmail(): string {
		return this.user.email
	}

	reAuth(email: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password))
	}
	updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword)
  }
  updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail)
	}
  logout(){
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
}
