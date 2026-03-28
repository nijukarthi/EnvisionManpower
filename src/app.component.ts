import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Auth } from '@/service/auth/auth';
import { Loader } from '@/service/loader/loader';
import { Shared } from '@/service/shared';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule,Shared],
    template: `
    <router-outlet></router-outlet>
    <div class="global-loader" *ngIf="loading">
        <p-progressSpinner strokeWidth="3" fill="transparent"></p-progressSpinner>
    </div>
    <p-dialog header="You have been logged out" [modal]="true" [(visible)]="showSessionPopup" 
       [closable]="false" [style]="{ width: '30rem' }">
        <p>{{ message }}</p>
        <div class="flex justify-end">
            <p-button label="Log in again" (onClick)="confirmLogout()" />
        </div>
    </p-dialog>
    `,
  styles: [`
    .global-loader {
        position: fixed; 
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        
        background: rgba(0,0,0,0.3);
        z-index: 9999;
    }
  `]
})
export class AppComponent implements OnInit {
    loading: boolean = false;
    showSessionPopup = false;

    message = '';

    UserGroups = UserGroups;

    constructor(private spinner: Loader,private cdr: ChangeDetectorRef, private authService: Auth, private router: Router){
        this.spinner.isLoading.subscribe((res)=>{
            setTimeout(()=>{
                this.loading = res;
                this.cdr.detectChanges();
            })
        })
    }

    ngOnInit(): void {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                this.authService.checkSessionAndNavigate().subscribe(val => {
                    if(!val) return;
        
                    if (this.router.url === '/' || this.router.url === ''){
                        console.log('checking app component if condition');
                        switch(val.data.userGroupId){
                            case UserGroups.CLUSTERHEAD:
                            case UserGroups.DEPARTMENTHEAD:
                                this.router.navigate(['/home/manpower-approval']);
                                break;
                
                            case UserGroups.CONSULTANCY:
                                this.router.navigate(['/home/consultancies']);
                                break;
                
                            case UserGroups.READONLYADMIN:
                                this.router.navigate(['/home/onroll-employees']);
                                break;
                
                            case UserGroups.GUESTUSER:
                                this.router.navigate(['/home/manpower-fulfillment']);
                                break;

                            case UserGroups.DPRMANAGEMENTTEAM:
                                this.router.navigate(['/home/dpr-project-details']);
                                break;
                
                            case UserGroups.ADMIN:
                            case UserGroups.SITEINCHARGE:
                            case UserGroups.PROJECTMANAGER:
                            case UserGroups.RESOURCEMANAGER:
                            case UserGroups.ACCOUNTSRECEIVABLETEAM:
                                console.log('consoling default switch case');
                                this.router.navigate(['/home/manpower-request']);
                        }
                    }
                });
            })

        this.authService.sessionExpired$.subscribe(reason => {

            if (this.router.url === '/') {
                return;
            }

            switch(reason) {
                case 'idle':
                    this.message = 'You were logged out due to inactivity.' ;
                    break;

                case 'manual':
                    this.message = 'You have been logged out. This session has ended across all open tabs.';
                    break;

                case 'session':
                default:
                    this.message = 'Your session has expired. Please login again.';
            }

            this.showSessionPopup = true;
        })
    }

    @HostListener('document:keydown')
    @HostListener('document:click')
    @HostListener('document:touchstart')
    userActivity(){
        if (this.router.url === '/') {
            return;
        }
        this.authService.resetIdleTimer();
    }

    confirmLogout(){
        this.showSessionPopup = false;
        this.authService.clearIdleTimer();
        this.router.navigate(['/']);
    }
}
