// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

// import { first } from 'rxjs/operators';
// import { LoginRegisterService } from '../../services/login-register.service';
// import { Router } from '@angular/router';
// import { DatePipe } from '@angular/common';


// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css',

// })
// export class RegisterComponent {
//   registerform!:FormGroup;
  
//   constructor(
//     private router: Router,
//     private loginregisterservice:LoginRegisterService,
//     // private formBuilder: FormBuilder, 
//     private datePipe: DatePipe
//     ){}
    
  
//     ngOnInit():void{
//       this.registerform=new FormGroup({
        
//         firstname:new FormControl(''),
//         lastname: new FormControl(''),
//         email:new FormControl(''),
//         phone:new FormControl(''),
//         password:new FormControl(''),
//         gender:new FormControl(),
//         DOB:new FormControl('2024-02-07'),
//         location:new FormControl(''),
        


//       })
//     }
//     get f(){
//       return this.registerform.controls
//     }
//     onsubmit(){
//       const formattedDOB = this.datePipe.transform(this.f['DOB'].value, 'yyyy-MM-dd');
//     this.f['DOB'].setValue(formattedDOB);
//     console.log(formattedDOB);
//       this.loginregisterservice.register(this.f['firstname'].value,
//       this.f['lastname'].value,
//       this.f['email'].value,
//       this.f['phone'].value,this.f['password'].value,this.f['gender'].value,
//       this.f['DOB'].value,
//       this.f['location'].value).pipe(first()).subscribe(data=>{
//         console.log(data);
//         this.router.navigate(['/feed']);
        
//       })
      
//     }
//     }

import {Validation} from "./validation";
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { first, retry } from 'rxjs/operators';
import { LoginRegisterService } from '../../services/login-register.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  maxDate: Date;
  
  confirmPasswordHidden: boolean = true;
  validation:Validation=new Validation();
  constructor(
    private router: Router,
    private loginRegisterService: LoginRegisterService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {


    this.maxDate = this.validation.gerFormatedDate();
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordHidden = !this.confirmPasswordHidden;
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
  


passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = this.registerForm?.get('password')?.value; // Get the value of the password field
    const confirmPassword = this.registerForm?.get('confirmPassword')?.value; 
   

    
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['',[Validators.required,this.validation.nameValidator]],
      lastname: ['', [Validators.required,this.validation.nameValidator]],
      email: ['', [Validators.required, this.validation.emailValidator]],
      phone: ['', [Validators.required, this.validation.phoneNumberValidator()]],
      password: ['', [Validators.required, Validators.minLength(8),this.passwordValidator]],
      gender: ['Male',Validators.required],
      DOB: ['',Validators.required],
      location: ['',Validators.required],
      confirmPassword: ['',[Validators.required,this.passwordMatchValidator()]]
    });
  }


  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formattedDOB = this.datePipe.transform(this.f['DOB'].value, 'yyyy-MM-dd');
    this.f['DOB'].setValue(formattedDOB);
    this.loginRegisterService.register(
      this.f['firstname'].value,
      this.f['lastname'].value,
      this.f['email'].value,
      this.f['phone'].value,
      this.f['password'].value,
      this.f['gender'].value,
      this.f['DOB'].value,
      this.f['location'].value
    ).subscribe(
      data => {
        
        this.router.navigate(['/']);
      },
      error => {
        // Handle error appropriately (e.g., display error message)
        console.error('Registration failed:', error);
      }
    );
  }
}
