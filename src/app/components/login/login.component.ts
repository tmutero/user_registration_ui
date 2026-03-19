import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonModule, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  hide = true;
  title = 'Login';
  loginForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private titleService = inject(Title);
  public auth = inject(AuthService);
  private toasterService = inject(ToastrService);

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['home']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res) {
          const token = res.token;

          if (!token) {
            this.toasterService.error(
              'Login succeeded but no token was returned',
            );
            return;
          }
          this.auth.saveTokens(res);
          this.auth.saveBearer(token);

          this.router.navigateByUrl('/home');
        }
      },
      error: (error) => {
        console.error(error);
        this.toasterService.warning(
          'Failed to login',
          'Check your username or password if it is correct.',
        );
      },
    });
  }

  onBtnRegisterClick() {
    this.router.navigate(['/register']);
  }
}
