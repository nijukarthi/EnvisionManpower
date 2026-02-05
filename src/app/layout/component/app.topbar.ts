import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Apiservice } from '@/service/apiservice/apiservice';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Auth } from '@/service/auth/auth';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, DrawerModule, ButtonModule, AvatarModule, AvatarGroupModule],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <img src="assets/images/envision-group-vector-logo.png" alt="Logo" height="20" width="150">       
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <!-- <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button> -->
                    <button type="button" class="layout-topbar-action" (click)="openProfile()">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <p-drawer [(visible)]="showProfileDrawer" position="right">
        <div class="flex items-center justify-center">
            <div class="flex flex-col items-center">
                <p-avatar [label]="getAvatarLabel(userDetails?.userName)" [style]="getAvatarStyle(userDetails?.userName)"
                     shape="circle" style="width: 6rem; height: 6rem; font-size: 2.5rem" />
                <h6>{{ userDetails?.userName }}</h6>
                <p [style]="layoutService.isDarkTheme() ? 'margin-top: -10px; color: #99a1af' : 'margin-top: -10px; color: #6a7282'">
                    {{ userDetails?.email }}
                </p>
                <p [style]="layoutService.isDarkTheme() ? 'margin-top: -10px; color: #99a1af' : 'margin-top: -10px; color: #6a7282'">
                    {{ userDetails?.userGroupName }}
                </p>
            </div>
        </div>
        <ng-template #footer>
            <button pButton pRipple type="button" 
                [style]="getLogoutButtonStyle()"
                (click)="logoutUser()">
                <i pButtonIcon class="pi pi-sign-out"></i>
                <span pButtonLabel style="font-weight: 700;">Logout</span>
            </button>
        </ng-template>
    </p-drawer>
    `
})
export class AppTopbar implements OnInit {
    items!: MenuItem[];

    showProfileDrawer = false;

    userDetails: any;

    constructor(public layoutService: LayoutService, private apiService: Apiservice, private router: Router, private authService: Auth) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    ngOnInit(): void {
        this.fetchUserProfile();
    }

    openProfile(){
        try {
            this.showProfileDrawer = true;
        } catch (error) {
            console.log(error);
        }
    }

    fetchUserProfile(){
        try {
            this.apiService.fetchUserProfile('').subscribe({
                next: val => {
                    console.log(val);
                    this.userDetails = val.data;
                },
                error: err => {
                    console.log(err);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    getAvatarLabel(name?: string){
        if(!name) return '';

        const parts = name.trim().split(' ');
        const first = parts[0]?.charAt(0) || '';
        const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';

        return (first + last).toUpperCase();
    }

    getAvatarStyle(name?: string){
        const colors = [
            { bg: '#ece9fc', text: '#2a1261' },
            { bg: '#dee9fc', text: '#1a2551' },
            { bg: '#e6f7f2', text: '#065f46' },
            { bg: '#fff7ed', text: '#9a3412' },
            { bg: '#fef2f2', text: '#991b1b' },
            { bg: '#f0fdfa', text: '#115e59' }
        ];

        if(!name) return {};

        const hash = name
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);

        const index = hash % colors.length;

        return {
            'background-color': colors[index].bg,
            'color': colors[index].text
        };
    }

    logoutUser(){
        try {
            this.authService.logout('manual');
            this.router.navigate(['/']);
        } catch (error) {
            console.log(error);
        }
    }

    getLogoutButtonStyle() {
        const isDark = this.layoutService.isDarkTheme();

        return {
            width: '100%',
            border: 'none',
            fontSize: '15px',
            backgroundColor: isDark ? '#2A1C1C' : '#FEF2F2',
            color: isDark ? '#FCA5A5' : '#F15C5C'
        };
    }

}
