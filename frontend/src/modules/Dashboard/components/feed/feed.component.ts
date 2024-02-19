import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  providers: [AuthService]
})
export class FeedComponent{
  constructor(private authService : AuthService){}

  ngOnInit(){
    this.authService.checkTokenAndNavigate();
  }
}