import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(
    public apiService: ApiService
  ) { }

  getUsers(client) {

    return this.apiService.get(`clients/${client}`);
  }
}
