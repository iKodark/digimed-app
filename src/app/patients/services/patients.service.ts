import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private apiService: ApiService
  ) { }

  getPatients(company) {

    return this.apiService.get(`patients/${company}`);
  }

  createPatient(data) {

    return this.apiService.post(`patient`, data);
  }

  updatePatient(data) {

    return this.apiService.put(`patient`, data);
  }

  deletePatient(id) {

    return this.apiService.delete(`patient/${id}`);
  }

  getCitiesByState(state) {

    return this.apiService.get(`cities/${state}`);
  }

  getAllStates() {

    return this.apiService.get(`states`);
  }
}
