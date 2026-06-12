import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { registrationAPI } from '../../constant/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;
  toastVisible = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private toastrService: ToastrService) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
     
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required],
      role:['',Validators.required],
      status:[ ,Validators.required]
    }, {
      validators: this.mustMatch('password', 'confirmpassword')
    });
  }

  ngOnInit(): void { }

  get f() { return this.registrationForm.controls; }

  onSubmit() {
    console.log('submit clicked');
    this.submitted = true;
    console.log('Form Vlaue:', this.registrationForm.value);
    console.log('Form Valid:',this.registrationForm.valid);
    if(this.registrationForm.invalid){
      console.log('form invalid');
      return;
    
    }

    this.http.post<{ responseMessage: string }>('https://globalsumi.com/party-api/user/register', {
      username: this.registrationForm.value.firstName,
      email:this.registrationForm.value.email,
      password:this.registrationForm.value.password,
      role:'User',
      status:false
    })
    .subscribe(
      response => {
        if (response.responseMessage === 'Registration successful') {
          this.registrationForm.reset();
          this.submitted = false;
          this.toastrService.success('Registration successful!');
        } else {
          this.toastrService.error(response.responseMessage);
        }
      },
      error => {
        this.toastVisible = true;
        if (error.error && error.error.responseMessage === 'Email already in use') {
          this.toastrService.error('This email is already registered. Please try a different email.');
        } else {
          this.toastrService.error('An error occurred during registration. Please try again later.');
        }
      }
    );
    
  }
  // closeToast() {
  //   this.toastVisible = false;
  // }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
