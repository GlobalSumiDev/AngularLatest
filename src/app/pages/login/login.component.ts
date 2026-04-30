import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  submitted = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
    //  email: ['', [Validators.required, Validators.email]],
      email:['',Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    /*this.authService.login(this.loginForm.value).subscribe(
      response => {
        this.router.navigate(['/welcome']);  // Navigate to welcome page on success
      },
      error => {
        // Show toaster notification
        this.toastr.error('Please contact support and try again after some time', 'Login Failed');
      }
    );*/
       this.authService.login(this.loginForm.value).subscribe(
  response => {
    // Store user data for React app to access
    localStorage.setItem('userEmail', response.email || response.userEmail);
    
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    
    // Navigate to React app
    this.router.navigate(['/welcomePage']);
  },
  error => {
    console.error('Login failed', error);
    // Handle error
  }
);
  }
}
