import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

//import { AuthenticationService } from '../services/authentication.service';
import {UserinfoService} from '../services/userinfo.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email : string = "";
  password : string= "";
  confir_password : string="";
  name : string= "";
  skin:string= "";
  gender:string="";
  birthdate:string="";

  disabledButton;

  constructor(
    private toastCtrl: ToastController,
    public afAuth: AngularFireAuth, 
    public user: UserinfoService,
    public afstore: AngularFirestore,
    public router:Router
  ) { }    

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.disabledButton = false;
  }

  async OnSubmitRegister(){
    if(this.name==""){
      this.presentToast("Su nombre es requerido");
    }else if(this.birthdate==""){
      this.presentToast("Su fecha de nacimiento es requerida");
    }else if(this.email==""){
      this.presentToast("Su correo electronico es requerido");
    }else if(this.password==""){
      this.presentToast("Su contraseña es requerida");
    }else if(this.confir_password!=this.password){
      this.presentToast("La contraseña no coincide");
    }else if(this.skin==""){
      this.presentToast("Su tipo de piel es requerido");
    }else if(this.gender==""){
      this.presentToast("Su sexo es requerido");
    }else{
      this.disabledButton=true;
    
      const { email, password, name, skin, gender, birthdate} = this
      try{
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(email,password)
        this.afstore.doc(`users/${res.user.uid}`).set({
          email,
          name,
          skin, 
          gender,
          birthdate
        })
        this.user.setUser({
          email,
          uid: res.user.uid
        })
        this.router.navigate(['/home'])
      } 
      catch(err) {
			  console.dir(err)
  			if(err.code === "auth/email-already-in-use") {
  				this.presentToast("El email que ingresaste ya se encuentra en uso")
          alert('El email que ingresaste ya se encuentra en uso')
        }
        else if(err.code === "auth/weak-password") {
          this.presentToast("La contraseña debe ser de mínimo 6 caracteres")
  				alert('La contraseña debe ser de mínimo 6 caracteres')
        }
		  }
  }
}

async presentToast(a){
  const toast = await this.toastCtrl.create({
    message: a,
    duration: 1500,
    position: 'top'
  });
  toast.present();
}
}
