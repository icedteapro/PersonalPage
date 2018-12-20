import { Injectable } from '@angular/core';
import { login } from '../models/login.model';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.model';
import { Register } from '../models/register.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class Authservice {
    private token: string;
    private isAuthenticated = false;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

    getToken()
    {
        return this.token;
    }
    getIsAuth() {
        return this.isAuthenticated;
   }
   

    getAuthStatusListener()
    {
        return this.authStatusListener.asObservable();
    }

    doRegister(Register) {
        return this.http.post<Message>('http://localhost:3000/api/user', Register).pipe(
            map(res => {
                return res.message;
            }), catchError(error => of(`Bad Promise: ${error}`))
        );
    }
    login(login) {
        this.http.post<{ token: string; expiresIn: number  }>('http://localhost:3000/api/user/login', login)
            .subscribe(res => {              
                const token = res.token;
                this.token = token;
                if(token)
                { 
                    const expiresInDuration = res.expiresIn;   
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    console.log(expirationDate);
                    this.saveAuthData(token, expirationDate);
                    this.router.navigate(["/admin"]);
                }                
            }, err => {
              this.toastr.error("Sai Something :)) ");              
            })    
    }
    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
          return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
          this.token = authInformation.token;
          this.isAuthenticated = true;
          this.setAuthTimer(expiresIn / 1000);
          this.authStatusListener.next(true);
        }
      }
    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate([""]);
      }
      
      private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
      }
      private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
      }
    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
      }
      private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if (!token || !expirationDate) {
          return;
        }
        return {
          token: token,
          expirationDate: new Date(expirationDate)
        }
      }

}