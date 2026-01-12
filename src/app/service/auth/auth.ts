import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Apiservice } from '../apiservice/apiservice';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  private sessionTimer!: any;
  private idleTimer!: any;

  private readonly IDLE_TIMEOUT = 15 * 60 * 1000;

  constructor(private apiService: Apiservice, private router: Router){}

  startSessionTimer(expiryTime: number){
    const currentTime = new Date().getTime();
    const remainingTime = expiryTime - currentTime;

    if (remainingTime <= 0) {
      console.log('checking remainingTime');
      this.logout();
      return;
    }

    this.sessionTimer = setTimeout(() => {
      console.log('checking logoutTimer');
      this.logout();
    }, remainingTime);
  }

  startIdleTimer(){
    this.clearIdleTimer();

    this.idleTimer = setTimeout(() => {
      this.logout();
    }, this.IDLE_TIMEOUT);
  }

  resetIdleTimer(){
    this.startIdleTimer();
  }

  clearIdleTimer(){
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
  }

  logout(){
    try {
      this.apiService.logoutUser('');
      this.clearSession();
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }

  clearSession(){
    sessionStorage.clear();
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
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
