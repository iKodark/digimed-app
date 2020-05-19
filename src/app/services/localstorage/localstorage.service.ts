import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalstorageService {

  constructor() { }

  public setLocalStorage(index, value) {
    
    localStorage.setItem(index, value);
  }

  public getLocalStorage(index) {
    return JSON.parse(localStorage.getItem(index));
  }
}
