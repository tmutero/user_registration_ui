import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: any;
  dateJoined = 'March 2026';
  title = 'Home';

  private router = inject(Router);
  private titleService = inject(Title);
  public auth = inject(AuthService);
  private toaster = inject(ToastrService);

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.user = this.auth.getCurrentUserDetails();
  }
  onLogoutClick() {
    this.auth.logout();
  }

  onRefreshClick() {
    this.auth.refresh().subscribe({
      next: (res) => {
        if (res != null) {
          this.toaster.success(
            'Success Message',
            'User details refreshed successfully.',
          );
        }
      },
      error: (error) => {
        this.toaster.warning(
          'Failed to refresh',
          'Try to logout and login again',
        );
      },
    });
  }
}
