import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Validation } from './validations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationform!: FormGroup;
  validation:Validation=new Validation();
  @Input() showModal: boolean = false;
  @Output() switchToLoginClicked = new EventEmitter<void>();
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
    this.registrationform = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(5)]],
     
      email: ['', [Validators.required, this.validation.emailValidator]],
     
      password: ['', [Validators.required, Validators.minLength(8),this.passwordValidator]],

     
    });
  }
  get f() {
    return this.registrationform.controls;
  }
  switchToLogin() {
    this.switchToLoginClicked.emit();
  }
  
  
  
  }
  

