import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public apiService: ApiService
  ) { }

  login(data) {

    return this.apiService.post(`login`, data);
  }
}
