import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {NologinGuard} from './guards/nologin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate:[AuthGuard]},
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'uvinfo',
    loadChildren: () => import('./uvinfo/uvinfo.module').then( m => m.UvinfoPageModule)
  },
  {
    path: 'reminders',
    loadChildren: () => import('./reminders/reminders.module').then( m => m.RemindersPageModule)
  },
  {
    path: 'ginfo',
    loadChildren: () => import('./ginfo/ginfo.module').then( m => m.GinfoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule), canActivate:[NologinGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule), canActivate:[NologinGuard]
  },  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
