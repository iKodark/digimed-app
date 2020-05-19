import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public show: boolean = false;

  public message: String = '';

  public result: String = '';

  constructor() { }

  public notify(message: String, time, result) {

    this.show = true;
    this.message = message;
    this.result = result;
    
    setTimeout(() => {
      this.show = false;
    }, time);
  }
}
