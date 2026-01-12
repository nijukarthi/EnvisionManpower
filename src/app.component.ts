import { Auth } from '@/service/auth/auth';
import { Loader } from '@/service/loader/loader';
import { Shared } from '@/service/shared';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule,Shared],
    template: `
    <router-outlet></router-outlet>
    <div class="global-loader" *ngIf="loading">
        <p-progressSpinner strokeWidth="3" fill="transparent"></p-progressSpinner>
    </div>
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

    constructor(private spinner: Loader,private cdr: ChangeDetectorRef, private authService: Auth){
        this.spinner.isLoading.subscribe((res)=>{
            setTimeout(()=>{
                this.loading = res;
                this.cdr.detectChanges();
            })
        })
    }

    ngOnInit(): void {
        const token = sessionStorage.getItem('token');

        if (token) {
            this.authService.startIdleTimer();
        }
    }

    @HostListener('document:mousemove')
    @HostListener('document:keydown')
    @HostListener('document:click')
    @HostListener('document:scroll')
    @HostListener('document:touchStart')
    userActivity(){
        const token = sessionStorage.getItem('token');

        if (token) {
            this.authService.resetIdleTimer();
        }
    }

}
