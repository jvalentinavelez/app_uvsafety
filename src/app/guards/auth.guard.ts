import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AFauth : AngularFireAuth,
    private router: Router){}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
        return this.AFauth.authState.pipe(map( auth => { //Mediante este Guard se permite que si el usuario ya se encuentra registrado, sin cerrar su sesión, pueda ser redirigido siempre al Home, 
          //de lo contrario, permanecerá en el Login
  
          if(isNullOrUndefined(auth)){
            this.router.navigate(['/login']);
            return false
          }else{
            return true
          }
        }))
  
    
    }
  
}
