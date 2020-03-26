import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesListService } from './services/employees-list.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface Employee {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  cpf: string;
  companyId: number;
  cityId: number;
}

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['name', 'email', 'cpf'];

  employees = new MatTableDataSource<Employee>([]);

  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    cpf: new FormControl('', [
      Validators.required      
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    state: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    re_password: new FormControl('', [
      
    ]),
  }, {
    validators: this.password.bind(this)
  });

  allCities = [];

  allStates = [];

  constructor(
    public employeesListService: EmployeesListService
  ) { }

  ngOnInit(): void {

    this.getEmployees();
    this.getAllStates();
  }

  debug(){
    console.log(this.form.get('re_password'));
    
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: re_password } = formGroup.get('re_password');
    if(password !== re_password){
      formGroup.get('re_password').setErrors({ NoPassswordMatch: true });
    }
  }

  getEmployees() {

    this.employeesListService.getEmployees(5).subscribe((employees) => {
      this.employees.data = employees.data;
    });
  }

  getCitiesByState(state) {

    state ? this.employeesListService.getCitiesByState(state).subscribe((cities) => {
      this.allCities = cities.data;
    }): null;
  }

  getAllStates() {

    this.employeesListService.getAllStates().subscribe((states) => {
      this.allStates = states.data;
    });
  }

  displayFnState(value?: number) {
    return value ? this.allStates.find(_ => _.id === value).name : undefined;
  }

  displayFnCity(value?: number) {
    return value ? this.allCities.find(_ => _.id === value).name : undefined;
  }

  submit() {

    this.form.value.company = 5;
    this.employeesListService.createEmployee(this.form.value).subscribe((employee) => {
      console.log(employee);
    });
  }

}

