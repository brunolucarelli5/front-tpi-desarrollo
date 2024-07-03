import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  url = 'http://localhost:3000';

  constructor( private router: Router) {}

  canActivate(
  ) {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['iniciar-sesion']);
      return false;
    }
  }
}
