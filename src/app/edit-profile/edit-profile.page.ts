import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserinfoService } from '../services/userinfo.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
	sub
	email: string
  name: string
  spf: number

	password: string
	newpassword: string

	busy: boolean = false

  constructor(
    private afs: AngularFirestore,
		private router: Router,
		private alertController: AlertController,
		private user: UserinfoService) {
		this.mainuser = afs.doc(`users/${user.getUID()}`)
		this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.email = event.email
      this.name = event.name
      this.spf = event.spf
		})
  }

  ngOnInit() {
  }

  ngOnDestroy() {
		this.sub.unsubscribe()
  }
  //Se crea la alerta para indicar si se actualizó perfil o si se presentaron errores
  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			subHeader: content,
			buttons: ['OK']
		})

		await alert.present()
  }

  async updateDetails() {
		this.busy = true
		//Error si no se ingresa la contraseña
		if(!this.password) {
			this.busy = false
			return this.presentAlert('¡Error!', '¡Debes ingresar tu contraseña')
		}

		try {
			await this.user.reAuth(this.user.getEmail(), this.password)
		} catch(error) {//Error si se ingresa una contraseña incorrecta
			this.busy = false
			return this.presentAlert('¡Error!', '¡Contraseña equivocada!')
		}

		if(this.newpassword) { //Permite actualizar la contraseña
			await this.user.updatePassword(this.newpassword)
    } //Si el email ingresado es diferente al email guardado en la base de datos, se actualizará el email
    if(this.email !== this.user.getEmail()) { 
			await this.user.updateEmail(this.email)
			this.mainuser.update({
				email: this.email
			})
    }
    
    this.mainuser.update({name: this.name})
    this.mainuser.update({spf: this.spf})

		this.password = ""
		this.newpassword = ""
		this.busy = false

		await this.presentAlert('¡Listo!', '¡Tu perfil se actualizó!')

		this.router.navigate(['profile'])
  }
  returnhome(){
    this.router.navigate(['home']);
  }
  returnprofile(){
    this.router.navigate(['profile']);
  }

}
