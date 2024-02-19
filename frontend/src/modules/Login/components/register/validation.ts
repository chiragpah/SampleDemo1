import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class Validation{
    nameValidator(control: FormControl) {
        // Password should contain at least 1 uppercase letter and 1 special character
        
        const namePattern: RegExp = /^[a-zA-Z\s]*$/;
        if (namePattern.test(control.value) ) {
          
          return null;
        } 
        
          // console.log(control.value)
          return { 
            invalidName: true 
          }; // Invalid password
        
      }
      emailValidator(control:FormControl){
        // Email Regex Expression for validation
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (emailRegex.test(control.value) ) {
          
          return null;
        } 
        
          // console.log(control.value)
          return { 
            invalidEmail: true 
          };
      }
      
      passwordValidator(control: FormControl) {
        // Password should contain at least 1 uppercase letter and 1 special character
        
        const passwordRegex :RegExp= /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (passwordRegex.test(control.value) || control.value == '') {
          
          return null // Valid password
        } 
        
          console.log(control.value)
          return { 
            invalidPassword: true 
          }; // Invalid password
        
      }
      phoneNumberValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const phoneNumber: string = control.value;
          const numericRegex: RegExp = /^[0-9]*$/;
          if (phoneNumber !== '' && ( !numericRegex.test(phoneNumber) || phoneNumber.length !== 10)) {
            return { invalidPhoneNumber: true };
          }
          return null; // Return null if validation succeeds
        };
      }

      gerFormatedDate():Date{
        let today = new Date();
let dd :string= String(today.getDate()).padStart(2, '0');
let mm :string= String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy:number = today.getFullYear();
 let finalDate = `${mm}-${dd}-${yyyy}`;
 return new Date(finalDate);
    // this.maxDate = new Date(finalDate);

      }
      
}