import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { UserProfile } from '../../../model/profile';
import { UploadHoveerComponent } from './upload_hover/upload_hover.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-upload',
  providers: [ProfileService],
  templateUrl: './upload_post.component.html',
  styleUrl: './upload_post.component.css'
})

export class UploadComponent{
  userData: UserProfile = {};

  constructor(private profileService: ProfileService,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.profileService.getUserData().subscribe((data) => {
      this.userData = data;
   
    });
  }
  displayAlert() {
    alert('Card clicked!'); // Replace this with your desired action
  }

  openDialog(option: string): void {
    const dialogRef = this.dialog.open(UploadHoveerComponent, {
      height:'auto',
      width: '650px',
      data: { option: option }    
    });

    dialogRef.afterClosed().subscribe( {
    });
  }
}