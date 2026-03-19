import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
user: any;
  dateJoined = 'March 2026';

  constructor(public auth: AuthService, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUserDetails();
  }
  onLogoutClick() {
    this.auth.logout();
  }

  onRefreshClick(){
     this.auth.refresh().subscribe({
        next: (res) => {

          if (res != null) {
            this.toaster.success(
              'Success Message',
              'User details refreshed successfully.'
            );
           
          }
        },
        error: (error) => {
          this.toaster.warning(
            'Failed to refresh',
            'Try to logout and login again'
          );
        },
      });
  }
  
}
