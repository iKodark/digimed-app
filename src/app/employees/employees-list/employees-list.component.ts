import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesListService } from './services/employees-list.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

const CELLPHONE = '(00) 0 0000-0000';
const LANDLINE= '(00) 0000-0000';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['name', 'email', 'cpf', 'role', 'action'];

  employees = new MatTableDataSource<any>([]);

  form = new FormGroup({
    id: new FormControl(''),
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
    city: new FormControl({value:'', disabled: true}, [
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
    role: new FormControl('', [
      Validators.required,
    ]),
  }, {
    validators: this.password.bind(this)
  });

  allCities = [];

  allStates = [];

  allRoles = [];

  phoneMask = LANDLINE;
  previusLength = 0;

  constructor(
    public employeesListService: EmployeesListService,
    public localStorageService: LocalstorageService
  ) { }

  ngOnInit(): void {

    this.getEmployees();
    this.getAllStates();
    this.getAllRoles();
  }

  //MASKstart
  onPhoneChanged() {
    if (this.form.get('phone').value?.length <= 10 && this.phoneMask === CELLPHONE) {
      this.phoneMask = LANDLINE;
    }
    else if (this.form.get('phone').value?.length === 10 && this.phoneMask === LANDLINE && this.previusLength === 10) {
      
      this.phoneMask = CELLPHONE;
    }
 
    this.previusLength = this.form.get('phone').value?.length;
  }
  //MASKend

  debug(){
    console.log(this.form.value);
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: re_password } = formGroup.get('re_password');
    if(password !== re_password){
      formGroup.get('re_password').setErrors({ NoPassswordMatch: true });
    }
  }

  getEmployees() {

    this.employeesListService.getEmployees(this.localStorageService.getLocalStorage('user').user.company).subscribe((employees) => {
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

  getAllRoles() {
    this.employeesListService.getAllRoles().subscribe((roles) => {
      this.allRoles = roles.data;
    });
  }

  displayFnState(value?: number) {
    
    if(value){
      this.form.controls['city'].enable();
      return this.allStates.find(_ => _.id === value).name;
    }
  }

  displayFnCity(value?: number) {
      
    return value ? this.allCities.find(_ => _.id === value)?.name || '' : undefined;
  }

  submit(formDirective) {

    if(this.form.value.id){
      this.employeesListService.updateEmployee(this.form.value).subscribe((employee) => {
        this.clear();
        formDirective.resetForm();
        this.getEmployees();
      });
    }else{

      this.form.value.company = this.localStorageService.getLocalStorage('user').user.company;
      this.employeesListService.createEmployee(this.form.value).subscribe((employee) => {
        this.clear();
        formDirective.resetForm();
        this.getEmployees();
      });
    }
  }

  clear() {

    this.form.reset();
    this.form.markAsPristine();
    this.form.controls['password'].enable();
    this.form.controls['re_password'].enable();
  }

  edit(employee) {

    employee = {
      ...employee,
      city: employee.city.id,
      state: employee.city.state.id,
      role: employee.roles_id
    };
    this.form.patchValue(employee);
    this.form.controls['password'].disable();
    this.form.controls['re_password'].disable();
  }

  delete(employee) {

    Swal.fire({
      title: `Deseja deletar o usuário ${employee.firstName}?`,
      text: 'O usuário perderá acesso ao sistema!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, tenho certeza!',
      cancelButtonText: 'Não, pensarei melhor'
    }).then((result) => {
      if (result.value) {
        this.employeesListService.deleteEmployee(employee.id).subscribe((employee) => {
          this.getEmployees();
          Swal.fire(
            'Deletado!',
            'Usuário deletado com sucesso.',
            'success'
          )
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado!',
          'Ação cancelada.',
          'error'
        )
      }
    })
  }

}

