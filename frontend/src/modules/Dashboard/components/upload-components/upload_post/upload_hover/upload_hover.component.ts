import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../../../../services/profile.service';
import { UserProfile } from '../../../../model/profile';
import { UploadPostService } from '../../../../services/uploadpost.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-upload-hover',
  templateUrl: './upload_hover.html',
  styleUrls: ['./upload_hover.component.css'],
  providers: [UploadPostService, AuthService, ProfileService],
})
export class UploadHoveerComponent {
  userData: UserProfile = {};
  selectedFile: any | null = null;
  pictureUploaded: boolean = false;
  caption: string = '';
  option: string;


  constructor(
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<UploadHoveerComponent>,
    private postService: UploadPostService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { option: string }
  ) {
    this.option = data.option;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.profileService.getUserData().subscribe((data) => {
      this.userData = data;
    });
  }
  isFileUploadOption(): boolean {
    return this.option === 'photo' || this.option === 'video' ||this.option==='audio';
  }

  showFileUploadSection(): boolean {
    return this.option === 'Article' || this.option === 'photo' || this.option === 'video'|| this.option=== 'audio';
  }

  getAcceptFileType(): string {
    return this.option === 'photo' ? 'image/*' : (this.option === 'video' ? 'video/*' : 'audio/*');
  }

  getUploadOptionText(): string {
    return this.option === 'photo' ? 'Image' : (this.option === 'video' ? 'Video' : 'Audio');
  }



  onFileChange(event: any): void {
    const file: File | null = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const binaryString = atob(e.target.result.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryString.length; i++) {
          uint8Array[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: file.type });

        this.selectedFile = blob;
        this.pictureUploaded = true;
        this.cdr.detectChanges(); // Detect changes here
        console.log('Selected File:', this.selectedFile);
      };
      reader.readAsDataURL(file);
    }
  }
  shouldEnablePostButton(): boolean {
    if (this.isFileUploadOption()) {
      // For photo or video upload, enable the button if a file is selected
      return this.pictureUploaded;
    } else if (this.option === 'Article') {
      // For articles, enable the button if the caption is not empty
      return this.caption.trim() !== '';
    } else {
      // For other cases, enable the button
      return true;
    }
  }
  getObjectURL(file: Blob): string {
    return URL.createObjectURL(file);
  }

  createPost(): void {
    if (this.option === 'Article') {
      // Handle article creation
      this.postService.createPostWithMedia(this.caption, 'Text', null, this.option).subscribe(
        (response) => {
          console.log('Article created successfully:', response);
          this.dialogRef.close(); // Close the dialog after posting
        },
        (error) => {
          console.error('Error creating article:', error);
        }
      );
    } else if (this.isFileUploadOption() && this.selectedFile) {
      // Handle image or video creation
      this.postService.createPostWithMedia(this.caption, 'Text', this.selectedFile, this.option).subscribe(
        (response) => {
          console.log('Post created successfully:', response);
          this.dialogRef.close(); // Close the dialog after posting
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    }
  }
}