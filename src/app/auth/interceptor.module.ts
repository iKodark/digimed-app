import { Injectable, NgModule } from '@angular/core';
import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage/localstorage.service';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {

    constructor(
        private localStorageService: LocalstorageService
    ) { }

    public getToken() {
        let user = this.localStorageService.getLocalStorage('user');

        let token = user ? user.token : '';

        return token;
    }

    intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
    ): Observable<HttpEvent<any>> {
    const dupReq = req.clone({
    headers: req.headers.set('x-access-token', this.getToken()),
    });
 return next.handle(dupReq);
 }
}
    
    
@NgModule({
providers: [
 {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpsRequestInterceptor,
  multi: true,
 },
],
})
    
export class Interceptor {}