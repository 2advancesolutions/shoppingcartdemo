import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  loading = false;
  submitted = false;
  failedLoginText: string;
  genders: any = ['Male', 'Female'];
  selectValue: any;
  user: any;
  saveObject: any;

  constructor(private formBuilder: FormBuilder,
              private userProfileService: UserProfileService,
              private profileService: UserProfileService) { }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      gender: ['', Validators.min(1)],
      phonenumber: ['', Validators.required],
      creditcardnumber: ['', Validators.required],
      drugname: ['', Validators.required],
      drugcompany: ['', Validators.required]
    });
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.setFormDefualtValues(this.user);
    this.userProfileService.userProfile$.subscribe(user => {
      if (user !== null) {
        this.setFormDefualtValues(user);
      }
    });
  }

  private setFormDefualtValues(user: any) {
    this.editProfileForm.controls.firstname.setValue(user.firstname);
    this.editProfileForm.controls.lastname.setValue(user.lastname);
    this.editProfileForm.controls.email.setValue(user.email);
    this.editProfileForm.controls.password.setValue(user.password);
    this.editProfileForm.controls.gender.setValue(user.gender);
    this.editProfileForm.controls.phonenumber.setValue(user.phonenumber);
    this.editProfileForm.controls.creditcardnumber.setValue(user.creditcardnumber);
    this.editProfileForm.controls.drugname.setValue(user.drugname);
    this.editProfileForm.controls.drugcompany.setValue(user.drugcompany);

    // dropdown option
    this.selectValue = this.editProfileForm.controls.gender.value;
  }

  get f() { return this.editProfileForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editProfileForm.invalid) {
      return;
    }
    this.loading = true;
    const formData = this.editProfileForm.value;
    this.saveObject = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password ? formData.password : this.user.password,
      gender: formData.gender,
      phonenumber: formData.phonenumber,
      creditcardnumber: formData.creditcardnumber,
      drugname: formData.drugname,
      drugcompany: formData.drugcompany
    };

    this.profileService.updateUserProfile(this.user.id, this.saveObject)
      .pipe(first())
      .subscribe(
        data => {
          this.userProfileService.updateUserProfileCache(this.saveObject);
        },
        error => {
          this.loading = false;
        });
  }

}
