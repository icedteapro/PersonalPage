import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadScript('../../assets/notfound/js/jquery-1.11.1.min.js'); 
    this.loadScript('../../assets/notfound/js/pace.min.js');   
    this.loadScript('../../assets/notfound/js/jquery-migrate-1.2.1.min.js');
    this.loadScript('../../assets/notfound/js/fontsmoothie.min.js');
    this.loadScript('../../assets/notfound/js/plax.js');
    this.loadScript('../../assets/notfound/js/script.js');
    this.loadCSS('../../assets/notfound/css/animate.css');
    this.loadCSS('../../assets/notfound/css/stylesheet.css');

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
}
