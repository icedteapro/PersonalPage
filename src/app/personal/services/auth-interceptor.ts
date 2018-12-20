import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Authservice} from './auth.service'


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth: Authservice) { }

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const auth = this.auth.getToken();
        const authRequest = req.clone({             
            headers: req.headers.set('Authorization', 'Your token ' + auth)
        });       
        return next.handle(authRequest);
    }
}