import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientsService } from './services/patients.service';
import { LocalstorageService } from '../services/localstorage/localstorage.service';
import Swal from 'sweetalert2'

const CELLPHONE = '(00) 0 0000-0000';
const LANDLINE= '(00) 0000-0000';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['name', 'email', 'cpf', 'action'];

  patients = new MatTableDataSource<any>([]);

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
    ])
  });

  allCities = [];

  allStates = [];

  phoneMask = LANDLINE;
  previusLength = 0;

  constructor(
    private patientsService: PatientsService,
    private localStorageService: LocalstorageService
  ) { }

  ngOnInit(): void {

    this.getPatients();
    this.getAllStates();
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

  getPatients() {

    this.patientsService.getPatients(this.localStorageService.getLocalStorage('user').user.company).subscribe((patients) => {
      this.patients.data = patients.data;
    });
  }

  getCitiesByState(state) {

    state ? this.patientsService.getCitiesByState(state).subscribe((cities) => {
      this.allCities = cities.data;
    }): null;
  }

  getAllStates() {

    this.patientsService.getAllStates().subscribe((states) => {
      this.allStates = states.data;
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
      this.patientsService.updatePatient(this.form.value).subscribe((patient) => {
        this.clear();
        formDirective.resetForm();
        this.getPatients();
      });
    }else{

      this.form.value.company = this.localStorageService.getLocalStorage('user').user.company;
      this.patientsService.createPatient(this.form.value).subscribe((patient) => {
        this.clear();
        formDirective.resetForm();
        this.getPatients();
      });
    }
  }

  clear() {

    this.form.reset();
    this.form.markAsPristine();
  }

  edit(patient) {

    patient = {
      ...patient,
      city: patient.city.id,
      state: patient.city.state.id
    };
    this.form.patchValue(patient);
    this.form.controls['password'].disable();
    this.form.controls['re_password'].disable();
  }

  delete(patient) {

    Swal.fire({
      title: `Deseja deletar o pacient ${patient.firstName}?`,
      text: 'O pacient perderá acesso ao sistema!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, tenho certeza!',
      cancelButtonText: 'Não, pensarei melhor'
    }).then((result) => {
      if (result.value) {
        this.patientsService.deletePatient(patient.id).subscribe((patient) => {
          this.getPatients();
          Swal.fire(
            'Deletado!',
            'Paciente deletado com sucesso.',
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
