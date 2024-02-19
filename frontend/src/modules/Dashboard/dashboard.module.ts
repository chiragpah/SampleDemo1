// dashboard
import { NgModule } from '@angular/core';
import { HeadFootModule } from '../../app/shared/header-footer/headfoot.module';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditProfileComponent } from './components/edit_profile/edit_profile.component';
import { ConfirmDialogComponent } from './components/edit_profile/confirm_dialog/confirm_dialog.component';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './services/message.service';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeedComponent } from './components/feed/feed.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { MyFriendCardComponent } from './components/my-friend-card/my-friend-card.component';
import { MyFriendListComponent } from './components/my-friend-list/my-friend-list.component';
import { FeedCardComponent } from './components/profile/feed-card/feed-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './components/post-components/post/post.component';
import { ReportComponent } from './components/post-components/post/report/report.component';
import { UploadComponent } from './components/upload-components/upload_post/upload_post.component';
import { UploadHoveerComponent } from './components/upload-components/upload_post/upload_hover/upload_hover.component';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { SuggestCardComponent } from './components/suggest-card/suggest-card.coponent';
import { SuggestListComponent } from './components/suggested/suggested-list.component';
import { EditImageComponent } from './components/edit_profile/edit_image/edit_image.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ConfirmDialogComponent,
    FeedComponent,
    ProfileCardComponent,
    MyFriendCardComponent,
    MyFriendListComponent,
    PostComponent,
    ReportComponent,
    UploadComponent,
    UploadHoveerComponent,
    FeedCardComponent,
    SuggestCardComponent,
    SuggestListComponent,
    EditImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatCardActions,
    MatIconModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    HeadFootModule,
    MatGridListModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTooltipModule,
    MatMenuModule,
    ReactiveFormsModule,
    BrowserModule,
    MatExpansionModule
  ],
  exports: [
    HeadFootModule,
    ProfileComponent,
    ProfileCardComponent,
    EditProfileComponent,
    ConfirmDialogComponent,
    FeedCardComponent,
    EditImageComponent
  ],
  providers: [
    provideClientHydration(),
    HttpErrorHandler,
    MessageService
  ],

})
export class DashboardModule { }
