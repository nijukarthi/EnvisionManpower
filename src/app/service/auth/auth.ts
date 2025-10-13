import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  loginUsers(loginUserForm: any){
    return this.http.post(`${this.baseUrl}/api/auth/user/send-otp`, loginUserForm);
  }

  verifyUserOtp(userOtpForm: any){
    return this.http.post(`${this.baseUrl}/api/auth/user/verify-otp`, userOtpForm);
  }

  getAuthToken(){
    return sessionStorage.getItem('token');
  }

  isAuthenticated(){
    const token = this.getAuthToken();
    return !!token;
  }

  fetchUserProfile(){
    return this.http.get(`${this.baseUrl}/api/user/profile`)
  }
}
