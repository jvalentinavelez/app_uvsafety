import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthenticationService } from '../services/authentication.service';
import {UserinfoService} from '../services/userinfo.service';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string = "";
  name:string = "";
  password: string = "";
  piel:string = "";

  constructor(
    public afAuth: AngularFireAuth,
    public user: UserinfoService,
    public router: Router) { }

  ngOnInit() {
  }
  async onSubmitLogin() {
		const { email, password, name, piel } = this
		try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
       if (res.user){
         this.user.setUser({
           email,
           uid: res.user.uid
         })
       }
        this.router.navigate(['/home'])
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				alert('Los datos son incorrectos o no existe el usuario')
      }
      else if(err.code === "auth/wrong-password") {
				alert('Los datos son incorrectos o no existe el usuario')
			}
		}
	}
  onRegister()
  {
      this.router.navigate(['/register']);
  }
}
