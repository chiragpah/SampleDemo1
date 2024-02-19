import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './componenet/confirmation-dialog/confirmation-dialog.component';
import { SnackbarComponent } from './componenet/snacbar/snackbar.component';

@NgModule({
    declarations: [
        ConfirmationDialogComponent,
        SnackbarComponent
    ],
    imports: [
        // Other modules
        MatButtonModule,
        MatDialogModule,
        CommonModule,
    ],
    providers: [],
    exports: [
        ConfirmationDialogComponent,
        SnackbarComponent
    ]
})
export class NotificationModule { }
