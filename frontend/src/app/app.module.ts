import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from '../modules/Login/login.module';
import { DashboardModule } from '../modules/Dashboard/dashboard.module';
import { FreindsModule } from '../modules/Friends/friends.module';
import { mapToCanActivate } from '@angular/router';
import { FriendProfileComponent } from './shared/friend-profile/component/friend-profile/friend_profile.component';
import { FriendProfileModule } from './shared/friend-profile/friend-profile.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    DashboardModule,
    FreindsModule,
    FriendProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

