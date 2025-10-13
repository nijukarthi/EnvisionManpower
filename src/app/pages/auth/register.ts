import { Component, inject, OnInit } from "@angular/core";
import { InputOtpModule } from "primeng/inputotp";
import { ButtonModule } from "primeng/button";
import { InputNumberModule } from "primeng/inputnumber";
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Auth } from "@/service/auth/auth";

@Component({
    selector: 'app-register',
    imports: [InputOtpModule, ButtonModule, InputNumberModule, RouterModule, ReactiveFormsModule],
    template: `
    <ng-container>
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
            <div class="grid grid-cols-1">
                <div class="bg-surface-0 dark:bg-surface-900 p-12 rounded-3xl">
                    <h5 class="font-medium">Confirm you are you</h5>
                    <p>We sent an email with a verification code to abc&#64;gmail.com</p>
                    <p>Enter it below to confirm your email.</p>
                    <form [formGroup]="userOtpForm" (ngSubmit)="verifyOtp()">
                        <div class="grid grid-cols-1 gap-1">
                            <div class="col-span-1 grid">
                                <label for="v-code" class="text-lg">Verification code</label>
                                <p-inputotp id="v-code" formControlName="otp" [length]="6" [mask]="true" [integerOnly]="true" size="large" style="--p-inputotp-gap: 1.5rem;" />
                            </div>

                            <button type="submit" pButton>
                                <span pButtonLabel>Verify</span>
                            </button>
                            <p-button label="Resend Code" variant="outlined" severity="secondary" styleClass="w-full mt-2" />
                            <h6 class="font-light">Didn't get the code?</h6>
                            <ul class="list-disc list-inside leading-relaxed -mt-3">
                                <li>Codes can take up to 5 minutes to arrive.</li>
                                <li>Check your spam folder.</li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </ng-container>`
})

export class Register implements OnInit {
    otpTimeLeft = '';

    private router = inject(Router);
    private fb = inject(FormBuilder);
    private authService = inject(Auth);

    userOtpForm = this.fb.group({
        email: [''],
        otp: [0]
    })

    ngOnInit(): void {
        const nav = this.router.getCurrentNavigation();
        console.log(history.state);
        this.otpTimeLeft = history.state.otpTimeLeft;
        console.log('OTP Time Left:', this.otpTimeLeft);
    }

    fetchUserProfile(){
        this.authService.fetchUserProfile().subscribe({
            next: val => {
                console.log(val);
                this.router.navigate(['/home/demand']);
            },
            error: err => {
                console.log(err);
            }
        })
    }

    verifyOtp(){
        this.userOtpForm.patchValue({
            email: 'ari.g@cloute.co.in'
        })
        console.log(this.userOtpForm.value);

        this.authService.verifyUserOtp(this.userOtpForm.value).subscribe({
            next: (val: any) => {
                console.log(val);
                sessionStorage.setItem('token', val.token);
                this.fetchUserProfile();
            },
            error: err => {
                console.log(err);
            }
        })
    }
}   