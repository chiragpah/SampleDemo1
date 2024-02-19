import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';


import { ProfileComponent } from '../modules/Dashboard/components/profile/profile.component';
import { LoginComponent } from '../modules/Login/components/login/login.component';
import { RegisterComponent } from '../modules/Login/components/register/register.component';
import { FeedComponent } from '../modules/Dashboard/components/feed/feed.component';
import { FriendListComponent } from '../modules/Friends/component/friend-list/friend-list.component';
import { FriendProfileComponent } from './shared/friend-profile/component/friend-profile/friend_profile.component';


const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'friends', component: FriendListComponent },
  { path: 'friends-profile', component: FriendProfileComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }