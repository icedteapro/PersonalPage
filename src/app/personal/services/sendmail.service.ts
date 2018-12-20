import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { email } from '../models/email.model';
import { map, catchError } from 'rxjs/operators';
import { Message} from '../models/message.model';
import {Register} from '../models/register.model';

@Injectable({ providedIn: 'root' })
export class SendEmailservice {
  private emailmodel: email[] = [];
  private emailsUpdated = new Subject<email[]>();
  constructor(private http: HttpClient) {}


  sendEmail(emailmodel) {
    return this.http.post<Message>('http://localhost:3000/api/sendEmail', emailmodel)
      .pipe(
        map(res => {
          return res.message; }), catchError(error => of(`Bad Promise: ${error}`))
      );
  }
  
  


  getPostUpdateListener() {
    return this.emailsUpdated.asObservable();
  }
}
