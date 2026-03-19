import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../model/user.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public apiUrl = environment.apiUrl;
  public staffUser = false;
  public currentUser!: UserModel;
  public impersonated = false;
  public dateJoined!: any;

  constructor(
    protected httpClient: HttpClient,
    private router: Router,
    private toasterService: ToastrService,
  ) {
    this.currentUser = this.getCurrentUserDetails();
  }

  login(loginModel: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const body = {
      email: loginModel.email,
      password: loginModel.password,
    };

    return this.httpClient.post(`${this.apiUrl}/auth/login`, body, { headers });
  }

  register(registerModel: any): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/auth/register`,
      JSON.stringify(registerModel),
      this.httpOptions,
    );
  }

  refresh(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/user/details`, {});
  }

  isLoggedIn() {
    const token_obj = JSON.parse(localStorage.getItem('user')!);
    if (token_obj) {
      return true;
    }
    return false;
  }

  /**
   * A function to get saved token in local storage
   * @return A token
   */
  getToken() {
    const token_obj = localStorage.getItem('bearer')!;

    if (token_obj) {
      const currentTime = Math.round(new Date().getTime() / 1000);
      const jwtToken = token_obj.split('.')[1];
      const expTime = JSON.parse(atob(jwtToken)).exp;

      if (expTime <= currentTime) {
        this.toasterService.success(
          'Session Expired',
          'Login with your credentials to continue',
        );
        this.logout();
        window.location.reload();
      }
      return token_obj;
    }
    return null;
  }

  saveTokens(tokendata: any) {
    localStorage.setItem('user', JSON.stringify(tokendata));
  }

  saveBearer(bearer: any) {
    localStorage.setItem('bearer', bearer);
  }

  getCurrentUserDetails() {
    const loggedInUser = JSON.parse(localStorage.getItem('user')!);

    if (loggedInUser != null) {
      return {
        id: loggedInUser.id,
        email: loggedInUser.email,
        lastname: loggedInUser.firstName,
        firstname: loggedInUser.firstName,
      } as UserModel;
    }
    return {} as UserModel;
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('bearer');
    this.router.navigate(['/']);
  }
}
