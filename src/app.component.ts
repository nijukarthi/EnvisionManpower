import { Auth } from '@/service/auth/auth';
import { Loader } from '@/service/loader/loader';
import { Shared } from '@/service/shared';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

    constructor(private spinner: Loader,private cdr: ChangeDetectorRef, private authService: Auth, private router: Router){
        this.spinner.isLoading.subscribe((res)=>{
            setTimeout(()=>{
                this.loading = res;
                this.cdr.detectChanges();
            })
        })
    }

    ngOnInit(): void {
        this.authService.checkSessionAndNavigate().subscribe();

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
