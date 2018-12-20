import {Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {login} from '../models/login.model';
import { ToastrService } from 'ngx-toastr';
import { Register } from '../models/register.model';
import {Authservice} from '../services/auth.service';
declare var $ :any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService, public authService: Authservice) { }
  @ViewChild('elementRegister') eleRegister:ElementRef; 
  @ViewChild('elementLogin') eleLogin:ElementRef; 

  ngOnInit() {
  }
  
  login(form : NgForm )
  {    
    let modelForm: login [] = [];
    modelForm = form.value;
    if (form.invalid) {       
      this.isValidation(form, false); 
      form.resetForm();
      return;
    }else 
    {       
      this.authService.login(modelForm);
    }

  }  
  unlockRegister ()
    {
      this.eleRegister.nativeElement.hidden = false;
        $('#profile-tab').click(); 
    }
  isValidation(form : NgForm, isReg: boolean)
    {
      if(isReg)
      {
        if(form.value.name === "" || form.value.name === null)
         {
          this.toastr.error('Chưa nhập UserName kìa con gà!!!');
         }
         if(form.value.Password === "" || form.value.Password === null)
         {
          this.toastr.error('Lại quên mật khẩu kia!!!');
         }
         if(form.value.rePassword === "" || form.value.rePassword === null)
         {
          this.toastr.error('Nhập sao coi được nha bạn trẻ!!!');
         }
         if(form.value.rePassword !== form.value.Password)
         {
          this.toastr.error('Bớt ba phải đi. Nhập Pass và rePass méo khớp nhé!!!');
         }
      }else
      {
         if(form.value.name === "" || form.value.name === null)
         {
          this.toastr.error('Chưa nhập UserName kìa con gà!!!');
         }
         if(form.value.Password === "" || form.value.Password === null)
         {
          this.toastr.error('Lại quên mật khẩu kia!!!');
         }
      }
    }
  register(form: NgForm)
  {
    if(form.value.name === "" || form.value.name === null || form.value.Password === "" || form.value.Password === null || 
    form.value.rePassword === "" || form.value.rePassword === null  || form.value.rePassword != form.value.Password)
    {
      this.isValidation(form,true);
    }else
    {
      form.value.email = form.value.email === "" ? "none@none.com" : form.value.email;
      form.value.phone = form.value.phone === "" ? "none" : form.value.phone;
      let regmodel : Register[] = [];
      regmodel = form.value;
      this.authService.doRegister(regmodel) .subscribe(res => {
        if (res === 'OK')  {
          this.toastr.success('Register account Successfully');
          form.resetForm();
        } else {
          this.toastr.error('Register account failed !!!');
        }
        }); 
    }
  }

}
