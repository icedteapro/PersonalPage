import { Component, OnInit } from '@angular/core';
import {Authservice} from './personal/services/auth.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PersonalPage';
  constructor(private authService: Authservice) {}
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
