import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/login-register.service';
import { ErrorHandlerService } from './errorhandler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginform!: FormGroup;
  errormessage!: string;
  constructor(private loginregisterservice: LoginRegisterService, private router: Router,private errorhandler: ErrorHandlerService){}

  
  ngOnInit():void{
    // console.log("kjbgkvk");
    
    this.loginform=new FormGroup({
      username:new FormControl(''),
      password:new FormControl('')
    })

    this.errorhandler.errorMessage$.subscribe(message=>{
      this.errormessage = message;
    })
  }
  get f(){
    return this.loginform.controls
  }
  onsubmit(event :Event){
    this.loginregisterservice.login(this.f['username'].value,this.f['password'].value).pipe(first()).subscribe(data=>{  
      this.router.navigate(['/feed']);
    },
    error=>{this.errorhandler.setError('Invalid username or password')})
  }
  
}
