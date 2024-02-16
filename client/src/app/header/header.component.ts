import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'headers1',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor() { }

  // ngOnInit(): void {
  //   document.getElementById('menu-icon')?.addEventListener('click', this.toggleNavbar.bind(this));
  // }
  // toggleNavbar() {
  //   const navbar = document.querySelector('.navbar');
  //   if (navbar) {
  //     navbar.classList.toggle('expand');
  //   }
  // }



  @Output() openLoginModalEvent = new EventEmitter<void>();

  openLoginModal() {
    this.openLoginModalEvent.emit();
  }

}
