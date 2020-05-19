import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { NotificationService } from '../../utilities/notification/services/notification.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required
    ]),
  });

  constructor(
    public loginService: LoginService,
    public notifyService: NotificationService,
    public localStorageService: LocalstorageService,
    public router: Router,
  ) { }

  ngOnInit(): void {

  }

  submit() {

    this.loginService.login(this.form.value).subscribe(
      (response) => {
        this.notifyService.notify('Autenticado com sucesso', 2000, 'success');
        this.localStorageService.setLocalStorage('user', JSON.stringify(response.data));
        this.router.navigate(['/dashboard'])
      },
      (err) => {
        this.notifyService.notify('Dados de autenticação inválidos!', 2000, 'error');
      }
    );
  }

}
