import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public _auth: AuthService) {
  }


  logout() {
    this._auth.logout();
  }
}