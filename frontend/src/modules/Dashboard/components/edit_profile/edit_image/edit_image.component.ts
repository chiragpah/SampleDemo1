import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfile } from '../../../model/profile';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit_image.component.html',
  providers: [ ProfileService],
})
export class EditImageComponent {
  userData: UserProfile = {};
  selectedFile: any | null = null;
  pictureUploaded: boolean = false;
  caption: string = '';
  constructor(
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<EditImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
  ) {}

  onNoClick(): void {
    
    // Logic to save the edited image
    // You can call a service or perform any necessary operations here
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
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
  getObjectURL(file: Blob): string {
    return URL.createObjectURL(file);
  }
  
  updateImage(): void {
      if (this.selectedFile) {
      // Handle image or video creation
      this.profileService.updateProfilePic( this.selectedFile).subscribe(
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
