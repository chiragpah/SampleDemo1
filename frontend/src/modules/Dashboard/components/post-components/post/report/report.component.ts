// report.component.ts

import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../../../../services/profile.service';
import { UserProfile } from '../../../../model/profile';
import { ReportService } from '../../../../services/report.service';
import { Report } from '../../../../model/report';
import { PostId } from '../../../../model/postid';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [ProfileService, ReportService],
})
export class ReportComponent {
  userData: UserProfile = {};
  reportUploaded: boolean = false;
  selectedReason: string = '';
  postId: number;

  report: Report[] = [
    { value: 'Inappropriate Content', viewValue: 'Inappropriate Content' },
    { value: 'Spam', viewValue: 'Spam' },
    { value: 'Harassment', viewValue: 'Harassment' },
    { value: 'Violence', viewValue: 'Violence' }
  ];

  constructor(
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<ReportComponent>,
    private reportService: ReportService,
    private cdr: ChangeDetectorRef,

    @Inject(MAT_DIALOG_DATA) public data: PostId
  ) {
    this.postId = data.postId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.profileService.getUserData().subscribe((data) => {
      this.userData = data;
    });
  }

  submitReport(): void {
    if (this.selectedReason) {
      this.reportService.reportPost(this.postId, this.selectedReason).subscribe(
        (response) => {
          this.reportUploaded = true;
          this.cdr.detectChanges();
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error submitting report:', error);
        }
      );
    }
  }
}
