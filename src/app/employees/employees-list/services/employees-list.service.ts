import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesListService {

  constructor(
    public apiService: ApiService
  ) { }

  getEmployees(company) {

    return this.apiService.get(`employees/${company}`);
  }

  getCitiesByState(state) {

    return this.apiService.get(`cities/${state}`);
  }

  getAllStates() {

    return this.apiService.get(`states`);
  }

  getAllRoles() {

    return this.apiService.get('roles');
  }

  createEmployee(data) {

    return this.apiService.post(`employee`, data);
  }

  updateEmployee(data) {

    return this.apiService.put(`employee`, data);
  }

  deleteEmployee(id) {

    return this.apiService.delete(`employee/${id}`);
  }
}
