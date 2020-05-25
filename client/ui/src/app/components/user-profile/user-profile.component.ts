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
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  failedLoginText: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
    this.loginForm.controls.firstname.setValue(user.firstname);
    this.loginForm.controls.lastname.setValue(user.lastname);
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
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
