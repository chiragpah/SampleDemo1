import { FormControl } from "@angular/forms";

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
     

     
      
}