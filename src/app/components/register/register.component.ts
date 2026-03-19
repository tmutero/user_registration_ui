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
import { CommonModule, NgIf } from '@angular/common';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  hide = true;
  title = 'Register';
  registerForm!: FormGroup;
  userModel!: UserModel;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private titleService = inject(Title);
  public auth = inject(AuthService);
  private toasterService = inject(ToastrService);

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      password: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          if (res != null) {
            this.toasterService.success(
              'Success Message',
              'Registration was successfully please login.',
            );
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.toasterService.warning(
            'Failed to register',
            'Check your username or password if it is correct.',
          );
        },
      });
    }
  }

  onBtnLoginClick() {
    this.router.navigate(['/']);
  }
}
