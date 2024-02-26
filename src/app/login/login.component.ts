import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Validation } from './validations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginform!: FormGroup;
validation:Validation=new Validation();
@Output() launchLogin = new EventEmitter<void>();
@Output() switchToSignupClicked = new EventEmitter<void>();
@Input() showModal: boolean = false;
constructor(
  private router: Router,

  private formBuilder: FormBuilder,
 
) {

}
passwordValidator(control: FormControl) {
  // Password should contain at least 1 uppercase letter and 1 special character
  
  const passwordRegex :RegExp= /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  if (passwordRegex.test(control.value) || control.value == '') {
    
    return null // Valid password
  } 
      
 return { 
      invalidPassword: true 
    }; // Invalid password
  
}
ngOnInit(): void {
  this.loginform = this.formBuilder.group({
   
    email: ['', [Validators.required, this.validation.emailValidator]],
   
    password: ['', [Validators.required, Validators.minLength(8),this.passwordValidator]],
   
  });
}
get f() {
  return this.loginform.controls;
}





LaunchEvent() {
  this.launchLogin.emit();
}
switchToSignup() {
  this.switchToSignupClicked.emit();
}
}
