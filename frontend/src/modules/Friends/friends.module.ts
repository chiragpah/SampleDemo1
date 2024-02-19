// freinds.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { HttpClientModule } from '@angular/common/http';
import { FriendListComponent } from './component/friend-list/friend-list.component';
import { FreindsCardComponent } from './component/freinds-card/freinds-card.component';
import { DashboardModule } from '../Dashboard/dashboard.module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { PendingRequestCardComponent } from './component/pending-request-card/pending-request-card.component';
import { PendingRequestListComponent } from './component/pending-request-list/pending-request-list.component';
import { NotificationModule } from '../../app/shared/notification/notification.module';

@NgModule({
    declarations: [
        FreindsCardComponent,
        FriendListComponent,
        PendingRequestCardComponent,
        PendingRequestListComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatCardModule,
        HttpClientModule,
        DashboardModule,
        MatIconModule,
        BrowserModule,
        NotificationModule
    ],
    providers: [
        HttpErrorHandler,
        MessageService,
    ],
    exports: [
        FreindsCardComponent,
        FriendListComponent,
        PendingRequestListComponent
    ]
})
export class FreindsModule { }
