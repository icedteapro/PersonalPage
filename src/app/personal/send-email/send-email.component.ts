import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { email } from '../models/email.model';
import { ToastrService } from 'ngx-toastr';
import { SendEmailservice } from '../services/sendmail.service'
import { ReCaptchaV3Service, ScriptService } from 'ngx-captcha';
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  constructor(private toastr: ToastrService, public sendemailtService: SendEmailservice, private reCaptchaV3Service: ReCaptchaV3Service, private scriptService: ScriptService) {

  }

  ngOnInit() {
  }

  sendEmail(form: NgForm) {

    let emailmodel: email[] = [];
    emailmodel = form.value;

    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var result = !emailReg.test(form.value.email);

    if (form.invalid || result) {

      this.toastr.error('Please enter information!!!');
      return;

    } else {

      const SiteKey = '6LdmD4EUAAAAAII-0UF9e2ysaJ7GdVsEZ2U5ffKL';

      this.scriptService.cleanup();

      this.reCaptchaV3Service.execute(SiteKey, 'homepage', (token) => {
        this.sendemailtService.sendEmail(emailmodel)
          .subscribe(res => {
            if (res === 'OK') {
              this.toastr.success('Send email Successfully');
              form.resetForm();
            } else {
              this.toastr.error('send email failed !!!');
            }
          });
      },
        {
          useGlobalDomain: false
        });

    }
  }

}
