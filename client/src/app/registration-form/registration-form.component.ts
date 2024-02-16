import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  formData: any = {};

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log(this.formData);
    
    this.http.post<any>('http://localhost:3000/register', this.formData)
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Reset the form after successful registration
          this.formData = {};
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
  }
}
