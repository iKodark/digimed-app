import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:9000/api';

  // injetando o HttpClient
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalstorageService
  ) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
  }


  get(route): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${route}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  post(route, data): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/${route}`, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  put(route, data): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/${route}`, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  delete(route) {
    return this.httpClient.delete<any>(`${this.url}/${route}`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorData = {
      message: '',
      code: 500
    };
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorData.message = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorData = {
        message: error.message,
        code: error.status
      };
      
    }
    console.log(errorData);
    return throwError(errorData);
  };

}