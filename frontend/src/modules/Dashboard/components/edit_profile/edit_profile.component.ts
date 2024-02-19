import { Component, Inject, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
// 
import { ConfirmDialogComponent } from "./confirm_dialog/confirm_dialog.component";
import { ProfileService } from "../../services/profile.service";
import { UserProfile } from "../../model/profile";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Validation } from "../../../Login/components/register/validation";
import { DatePipe } from "@angular/common";
import { postfeed } from "../../model/post";

@Component({
  selector: 'edit-profile-component',
  templateUrl: './edit_profile.component.html',
  styleUrls: ['./edit_profile.component.css'],
  providers: [ProfileService]
})
export class EditProfileComponent implements OnInit {
  maxDate: Date;
  editProfileForm!: FormGroup;

  userProfile: UserProfile = {
  };
  selectedFile: any | null = null;
  pictureUploaded: boolean = false;
  caption: string = '';

  @Output() updatedProfile = new EventEmitter<UserProfile>();
  validation: Validation = new Validation();
  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: { userProfile: UserProfile }) {

    this.maxDate = this.validation.gerFormatedDate();
    this.userProfile = { ...data.userProfile };


  }


  // openConfirmDialog(): void {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     width: '400px',
  //     data: {
  //       title: 'Confirm Edit',
  //       message: 'Are you sure you want to edit your profile?',
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result: boolean) => {
  //     if (result) {

  //       this.submitForm();
  //     }
  //   });
  // }
  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      firstname: [this.userProfile.first_name, [Validators.required, this.validation.nameValidator]],
      lastname: [this.userProfile.last_name, [Validators.required, this.validation.nameValidator]],
      email: [this.userProfile.email, [Validators.required, this.validation.emailValidator]],
      phone: [this.userProfile.phone, [Validators.required, this.validation.phoneNumberValidator()]],
      gender: [this.userProfile.gender, Validators.required],
      dateOfBirth: [this.userProfile.date_of_birth],
      location: [this.userProfile.location, Validators.required],
      bio: [this.userProfile.bio],
      profile_pic: [this.userProfile.profile_pic],
    });
  }
  // getFormValues(): void {
  //   // const formValues = this.editProfileForm.value;
  //   // console.log("Form values:", formValues);
  //   console.log("First Name Control Value:", this.editProfileForm.get('firstname')?.value);
  //   // You can further process the form values here as needed
  // }

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

  submitForm(): void {
    const formattedDOB = this.datePipe.transform(this.editProfileForm.get('dateOfBirth')?.value, 'yyyy-MM-dd');
    this.editProfileForm.get('dateOfBirth')?.setValue(formattedDOB);
    this.userProfile = {
      ...this.userProfile,
      first_name: this.editProfileForm.get('firstname')?.value,
      last_name: this.editProfileForm.get('lastname')?.value,
      date_of_birth: this.editProfileForm.get('dateOfBirth')?.value,
      email: this.editProfileForm.get('email')?.value,
      gender: this.editProfileForm.get('gender')?.value,
      location: this.editProfileForm.get('location')?.value,
      bio: this.editProfileForm.get('bio')?.value,
      profile_pic: null
    }
    this.dialogRef.close(this.userProfile);
    this.updatedProfile.emit(this.userProfile);
    this.profileService.updateUserData(this.userProfile);
    // this.profileService.updateUserPic(this.userProfile);
    console.log("4", this.userProfile)
    console.log("Done Updating")

  }
  closeForm(): void {
    this.dialogRef.close();
  }


}