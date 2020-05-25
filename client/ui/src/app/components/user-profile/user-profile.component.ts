import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

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
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
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
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.loading = false;
        });
  }

}
