import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TabsModule } from 'primeng/tabs';
import { InputNumberModule } from "primeng/inputnumber";
import { InputOtpModule } from "primeng/inputotp";
import { Shared } from '@/service/shared';
import { Auth } from '@/service/auth/auth';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [Shared, ReactiveFormsModule, PasswordModule, FormsModule, RouterModule, RippleModule, TabsModule, InputNumberModule, InputOtpModule],
    template: `
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-5">
                           <img src="assets/images/envision-group-vector-logo.png" alt="Logo" height="10" width="150" class="shrink-0 mx-auto">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">ENVISION MANPOWER TOOL</div>
                            <span class="text-muted-color font-medium">Sign in to continue</span>
                        </div>

                        <p-tabs value="0" styleClass="w-full">
                            <p-tablist class="flex justify-between w-full">
                                <p-tab class="flex-1 text-center text-lg leading-relaxed" value="0">Company User</p-tab>
                                <p-tab class="flex-1 text-center text-lg leading-relaxed" value="1">Guest User</p-tab>
                            </p-tablist>
                            <p-tabpanels>
                                <p-tabpanel value="0">
                                    <form [formGroup]="loginUserForm" (ngSubmit)="onSubmitUsers()">
                                        <div class="grid grid-cols-1 gap-1">
                                            <div class="grid col-span-1">
                                                <label for="email" class="text-surface-900 dark:text-surface-0 text-lg">Email</label>
                                                <input pInputText type="email" formControlName="email" id="email" placeholder="Email Address" class="md:w-100" />
                                            </div>

                                            <button type="submit" pButton class="mt-3">
                                                <span pButtonLabel>Sign in</span>
                                            </button>
                                        </div>
                                    </form>
                                </p-tabpanel>
                                <p-tabpanel value="1">
                                    <div class="grid grid-cols-1 gap-1">
                                        <label for="contact" class="text-surface-900 dark:text-surface-0 text-lg">Mobile Number</label>
                                        <p-inputnumber inputId="contact" [useGrouping]="false" [maxlength]="10" placeholder="Enter Mobile Number" class="md:w-100" />

                                        <p-button routerLink="/register" label="Sign in" styleClass="mt-2 w-full" />
                                    </div>
                                </p-tabpanel>
                            </p-tabpanels>
                        </p-tabs>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login implements OnInit {
    private fb = inject(FormBuilder);
    private authService = inject(Auth);
    private router = inject(Router);

    enteredLoginUserEmail = '';
    otpTimeLeft = '';

    loginUserResponse: any;

    loginUserForm = this.fb.group({
        email: ['']
    })

    ngOnInit(): void {
        sessionStorage.clear();
    }

    otpTimer(expireByString: string){
        const expireBy = new Date(expireByString).getTime();
        console.log("expireBy:", expireBy);

        const interval = setInterval(() => {
            const currentTime = Date.now();

            const diffMs = expireBy - currentTime;

            if (diffMs <= 0) {
                clearInterval(interval);
                this.otpTimeLeft = '00:00';
                return;
            }

            const totalSeconds = Math.floor(diffMs / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            this.otpTimeLeft = `${this.pad(minutes)}:${this.pad(seconds)}`;
        }, 1000)
    }

    pad(num: number): string{
        return num < 10 ? '0' + num : '' + num;
    }

    onSubmitUsers(){
        console.log(this.loginUserForm.value);
        this.enteredLoginUserEmail = this.loginUserForm.get('email')?.value ?? '';
        this.authService.loginUsers(this.loginUserForm.value).subscribe({
            next: val => {
                console.log(val);
                this.loginUserResponse = val;
                this.otpTimer(this.loginUserResponse.expireBy);
                this.router.navigate(['/register'], {
                    state: {otpTimeLeft: this.otpTimeLeft}
                });
            },
            error: err => {
                console.log(err);
            }
        })
    }
}
