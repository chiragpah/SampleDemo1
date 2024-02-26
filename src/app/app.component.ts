import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title="app";
  loginModalVisible: boolean = false;
   launchLoginModal() {
    // Logic to display login modal
    console.log('Launching login modal');
  }

  // launchSignupModal() {
  //   // Logic to display signup modal
  //   console.log('Launching signup modal');
  // }
  signupModalVisible: boolean = false;

  constructor() {}

  toggleSignupModal(show: boolean) {
    this.signupModalVisible = show;
  }
  toggleLoginModal(show: boolean) {
    this.loginModalVisible = show;
  }
}
