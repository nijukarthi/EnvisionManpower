import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TabsModule } from 'primeng/tabs';
import { InputNumberModule } from "primeng/inputnumber";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, TabsModule, InputNumberModule],
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
                                    <div class="grid grid-cols-1 gap-1">
                                        <label for="email" class="text-surface-900 dark:text-surface-0 text-lg">Email</label>
                                        <input pInputText type="email" id="email" placeholder="Email Address" class="md:w-100" />

                                        <p-button label="Sign in" styleClass="w-full mt-2" routerLink="/Dashboard/demand" />
                                    </div>
                                </p-tabpanel>
                                <p-tabpanel value="1">
                                    <div class="grid grid-cols-1 gap-1">
                                        <label for="contact" class="text-surface-900 dark:text-surface-0 text-lg">Mobile Number</label>
                                        <p-inputnumber inputId="contact" [useGrouping]="false" [maxlength]="10" placeholder="Enter Mobile Number" class="md:w-100" />

                                        <p-button label="Sign in" styleClass="mt-2 w-full" />
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
export class Login {
    email: string = '';

    password: string = '';

    checked: boolean = false;
}
