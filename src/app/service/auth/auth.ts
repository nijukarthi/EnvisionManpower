import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Apiservice } from '../apiservice/apiservice';
import { Router } from '@angular/router';
import { catchError, of, Subject, tap } from 'rxjs';
import { UserGroups } from '@/models/usergroups/usergroups.enum';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  private loggedIn = false;

  private logoutChannel = new BroadcastChannel('auth-events');

  private sessionExpiredSubject = new Subject<'idle' | 'session' | 'manual'>();
  sessionExpired$ = this.sessionExpiredSubject.asObservable();

  private idleTimer!: any;

  private readonly IDLE_TIMEOUT = 30 * 60 * 1000;

  constructor(private apiService: Apiservice, private router: Router){
    this.logoutChannel.onmessage = (event) => {
      if (event.data?.type === 'LOGOUT') {
        this.handleExternalLogout(event.data.reason);
      }
    }
  }

  startIdleTimer(){
    this.clearIdleTimer();

    this.idleTimer = setTimeout(() => {
      if(!this.loggedIn) return;

      this.logout('idle'); 
      this.notifySessionExpired('idle');

    }, this.IDLE_TIMEOUT);
  }

  resetIdleTimer(){
    this.startIdleTimer();
  }

  clearIdleTimer(){
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }

  notifyUnauthorized(){
    this.notifySessionExpired('session');
  }

  private notifySessionExpired(reason: 'idle' | 'session' | 'manual'){
    this.sessionExpiredSubject.next(reason);
  }

  logout(reason = 'manual'){
    try {
      this.apiService.logoutUser('').subscribe();
    } catch (error) {
      console.log(error);
    }   
    this.clearSession();

    this.logoutChannel.postMessage({
      type: 'LOGOUT',
      reason
    });
  }

  clearSession(){
    this.loggedIn = false;
    sessionStorage.clear();
 
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
  }

  checkSessionAndNavigate(){
    return this.apiService.fetchUserProfile('').pipe(
      tap(val => {
        this.loggedIn = true;

        sessionStorage.setItem("userName", val.data.userName);
        sessionStorage.setItem("userGroupId", val.data.userGroupId);
        sessionStorage.setItem("userEmail", val.data.email);
        sessionStorage.setItem("userId", val.data.userId);

        this.startIdleTimer();

        switch(val.data.userGroupId){
          case UserGroups.CLUSTERHEAD:
          case UserGroups.DEPARTMENTHEAD:
            this.router.navigate(['/home/manpower-approval']);
            break;

          case UserGroups.CONSULTANCY:
            this.router.navigate(['/home/consultancies']);
            break;

          case UserGroups.GUESTUSER:
            this.router.navigate(['/home/manpower-fulfillment']);
            break;

          default:
            this.router.navigate(['/home/manpower-request']);
        }
      }),
      catchError(err => {
        this.loggedIn = false;

        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/']);
        }

        return of(null);
      })
    )
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  private handleExternalLogout(reason: 'idle' | 'session' | 'manual'){
    this.clearSession();

    this.sessionExpiredSubject.next(reason);
  }
}
