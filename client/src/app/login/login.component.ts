import { Component, Output, EventEmitter } from '@angular/core';

import { authService } from '../services/auth.service'
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: any = {}
  constructor(private auth: authService) { }
  onSubmit() {


    this.auth.login("http://localhost:3000/login", this.loginData).subscribe(response => {


      console.log(response);
      // Reset the form after successful registration
      this.loginData = {};
    },
      error => {
        console.error('Login failed:', error);
      }


    )


  }
  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }
}
