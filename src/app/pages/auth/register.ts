import { Component } from "@angular/core";
import { InputOtpModule } from "primeng/inputotp";
import { ButtonModule } from "primeng/button";
import { InputNumberModule } from "primeng/inputnumber";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-register',
    imports: [InputOtpModule, ButtonModule, InputNumberModule, RouterModule],
    template: `
    <ng-container>
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
            <div class="grid grid-cols-1">
                <div class="bg-surface-0 dark:bg-surface-900 p-12 rounded-3xl">
                    <h5 class="font-medium">Confirm you are you</h5>
                    <p>We sent an email with a verification code to abc&#64;gmail.com</p>
                    <p>Enter it below to confirm your email.</p>
                    <div class="grid grid-cols-1 gap-1">
                        <label for="v-code" class="text-lg">Verification code</label>
                        <p-inputotp id="v-code" [length]="6" [mask]="true" [integerOnly]="true" size="large" style="--p-inputotp-gap: 1.5rem;" />
                        <p-button label="Verify" styleClass="w-full mt-2" routerLink="/home/demand" />
                        <p-button label="Resend Code" variant="outlined" severity="secondary" styleClass="w-full mt-2" />
                        <h6 class="font-light">Didn't get the code?</h6>
                        <ul class="list-disc list-inside leading-relaxed -mt-3">
                            <li>Codes can take up to 5 minutes to arrive.</li>
                            <li>Check your spam folder.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </ng-container>`
})

export class Register {

}