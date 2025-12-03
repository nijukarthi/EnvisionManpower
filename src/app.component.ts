import { Loader } from '@/service/loader/loader';
import { Shared } from '@/service/shared';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule,Shared],
    template: `
    <router-outlet></router-outlet>
    <div class="global-loader" *ngIf="loading">
        <p-progressSpinner strokeWidth="8" fill="transparent"></p-progressSpinner>
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
export class AppComponent {
    loading:boolean = false;
    constructor(private spinner:Loader,private cdr:ChangeDetectorRef){
        this.spinner.isLoading.subscribe((res)=>{
            setTimeout(()=>{
                this.loading = res;
                this.cdr.detectChanges();
            })
        })
    }

}
