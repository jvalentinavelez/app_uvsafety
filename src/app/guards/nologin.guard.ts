import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

import { AngularFireAuth } from "@angular/fire/auth";
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
  constructor(private router : Router,
    private AFauth : AngularFireAuth){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   
      return this.AFauth.authState.pipe(map(auth => {

        if(isNullOrUndefined(auth)){ //Mediante este Guard se permite que si el usuario ya se encuentra registrado, sin cerrar su sesión, pueda ser redirigido siempre al Home, 
          //de lo contrario, permanecerá en el Login
         
         return true;
        }else{
         this.router.navigate(['/home']);
          return false;
        }
 
       }))

  }
  
}
