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
		})
  }

  ngOnInit() {
  }

  ngOnDestroy() {
		this.sub.unsubscribe()
  }
  
  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }
  //uploadName(){
    //this.mainuser.update({name})
  //}

  async updateDetails() {
		this.busy = true

		if(!this.password) {
			this.busy = false
			return this.presentAlert('Error!', 'You have to enter a password')
		}

		try {
			await this.user.reAuth(this.user.getEmail(), this.password)
		} catch(error) {
			this.busy = false
			return this.presentAlert('Error!', 'Wrong password!')
		}

		if(this.newpassword) {
			await this.user.updatePassword(this.newpassword)
    }
    if(this.email !== this.user.getEmail()) {
			await this.user.updateEmail(this.email)
			this.mainuser.update({
				email: this.email
			})
		}

		this.password = ""
		this.newpassword = ""
		this.busy = false

		await this.presentAlert('¡Listo!', '¡Tu perfil se actualizó!')

		this.router.navigate(['profile'])
  }
  returnhome(){
    this.router.navigate(['home']);
  }

}
