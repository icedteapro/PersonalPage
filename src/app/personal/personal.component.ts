import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadScript('../../assets/js/jquery-2.1.3.min.js');    
    this.loadScript('../../assets/js/modernizr.custom.js');
    this.loadScript('../../assets/js/bootstrap.min.js');
    this.loadScript('../../assets/js/pages-switcher.js');
    this.loadScript('../../assets/js/imagesloaded.pkgd.min.js');
    this.loadScript('../../assets/js/validator.js');
    this.loadScript('../../assets/js/jquery.shuffle.min.js');
    this.loadScript('../../assets/js/masonry.pkgd.min.js');
    this.loadScript('../../assets/js/owl.carousel.min.js');
    this.loadScript('../../assets/js/jquery.magnific-popup.min.js');
    this.loadScript('../../assets/js/main.js');

    this.loadCSS('../../assets/css/bootstrap.min.css');
    this.loadCSS('../../assets/css/animate.css');
    this.loadCSS('../../assets/css/animations.css');
    this.loadCSS('../../assets/css/owl.carousel.css');
    this.loadCSS('../../assets/css/magnific-popup.css');    
    this.loadCSS('../../assets/css/main.css');
    this.loadCSS('../../assets/css/toastr.css');

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
