import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserinfoService} from '../services/userinfo.service';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string = "";
  password: string = "";


  constructor(
    public afAuth: AngularFireAuth,
    public user: UserinfoService,
    public router: Router) { }

  ngOnInit() {
  }
  async onSubmitLogin() { //Si los datos del usuario se encuentran en la base de datos de Firebase, el usuario podrá ser redirigido al Home
		const { email, password } = this
		try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
       if (res.user){
         this.user.setUser({
           email,
           uid: res.user.uid
         })
       }
        this.router.navigate(['/home'])
		} catch(err) { //Errores en caso de que se ingresen los datos incorrectos de email y contraseña
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
