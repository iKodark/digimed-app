import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage/localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private localStorageService: LocalstorageService,
    private router: Router
  ) { }

  canActivate() {
    if(this.localStorageService.getLocalStorage('user')){
      return true;
    }
    else{
      return this.router.parseUrl("/login");
    }
    
  }

}