import { Component, OnInit, Inject } from '@angular/core';
import {Authservice} from '../../personal/services/auth.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private auth: Authservice, private router: Router) { }

  ngOnInit() {  
    // Load CSS and Script
    this.document.body.classList.add('fixed-left'); 
    this.loadScript('../../../assets/js/modernizr.min.js');
    this.loadScript('../../../assets/js/jquery.min.js');    
    this.loadScript('../../../assets/js/popper.min.js');
    this.loadScript('../../../assets/js/bootstrap.min.js');
    this.loadScript('../../../assets/js/detect.js');
    this.loadScript('../../../assets/js/fastclick.js');
    this.loadScript('../../../assets/js/jquery.blockUI.js');
    this.loadScript('../../../assets/js/waves.js');
    this.loadScript('../../../assets/js/jquery.nicescroll.js');
    this.loadScript('../../../assets/js/jquery.slimscroll.js');
    this.loadScript('../../../assets/js/jquery.scrollTo.min.js');
    this.loadScript('../../../assets/plugins/jquery-knob/jquery.knob.js');
    this.loadScript('../../../assets/plugins/morris/morris.min.js');
    this.loadScript('../../../assets/plugins/raphael/raphael-min.js');
    this.loadScript('../../../assets/pages/jquery.dashboard.js');
    this.loadScript('../../../assets/js/jquery.core.js');
    this.loadScript('../../../assets/js/jquery.app.js');
    this.loadScript('../../../assets/pages/jquery.inbox.js');
    this.loadScript('../../../assets/plugins/summernote/summernote-bs4.min.js');
    this.loadScript('../../../assets/plugins/custombox/dist/custombox.min.js');
    this.loadScript('../../../assets/plugins/custombox/dist/legacy.min.js');
    this.loadScript('../../../assets/js/jquery.app.js');
    this.loadScript('../../../assets/js/jquery.core.js');

    this.loadCSS('../../../assets/plugins/morris/morris.css');
    this.loadCSS('../../../assets/css/bootstrap.min.css');
    this.loadCSS('../../../assets/css/icons.css');
    this.loadCSS('../../../assets/css/style.css');
    this.loadCSS('../../../assets/plugins/custombox/dist/custombox.min.css');
    this.loadCSS('../../../assets/plugins/summernote/summernote-bs4.css');

    // check token  
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  public loadCSS(url: string) {
    const body = <HTMLDivElement>document.body;
    const element = document.createElement('link');
    element.rel = "stylesheet";
    element.href = url;
    body.appendChild(element);
  }
  logOut()
  {
   this.auth.logout();
  }
  clickMail(){
    this.router.navigate(["/admin"]);
  }

}
