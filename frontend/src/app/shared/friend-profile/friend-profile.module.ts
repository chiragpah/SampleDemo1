import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from '@angular/material/menu';
import { FriendProfileComponent } from "./component/friend-profile/friend_profile.component";
import { HeadFootModule } from "../header-footer/headfoot.module";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";

@NgModule({
    declarations: [
        FriendProfileComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatBadgeModule,
        RouterModule,
        MatMenuModule,
        HeadFootModule,
        MatCardModule,
        MatGridListModule,
    ],
    exports: [
        FriendProfileComponent
    ]
})
export class FriendProfileModule { }