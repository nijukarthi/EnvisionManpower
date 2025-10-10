import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
           /*  {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            }, */
           /*  {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            }, */
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Demand Request',
                        icon: 'pi pi-calendar',
                        routerLink: ['/Dashboard/demand']
                    },
                    {
                        label: 'Demand Approval',
                        icon: 'pi pi-ticket',
                         routerLink: ['/Dashboard/approval']
                       /*  items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ] */
                    },
                    {
                        label: 'Full Fill Request',
                        icon: 'pi pi-address-book',
                        routerLink: ['/Dashboard/fullFill']
                    },
                    {
                        label: 'Interview Management',
                        icon: 'pi pi-eject',
                        routerLink: ['/Dashboard/interviewManagement']
                    },
                    {
                        label: 'Masters',
                        icon: 'pi pi-database',
                        items: [
                            {
                                label: 'Consultancy',
                                icon: 'pi pi-server',
                            },
                            {
                                label: 'SPN',
                                icon: 'pi pi-warehouse',
                            },
                            {
                                label: 'Project',
                                icon: 'pi pi-inbox'
                            },
                            {
                                label: 'User Group',
                                icon: 'pi pi-users'
                            },
                            {
                                label: 'Category',
                                icon: 'pi pi-table'
                            },
                            {
                                label: 'Department',
                                icon: 'pi pi-sitemap'
                            },
                            {
                                label: 'Users',
                                icon: 'pi pi-user'
                            },
                            {
                                label: 'Guest Users',
                                icon: "pi pi-address-book"
                            }
                        ]
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        routerLink: ['/']
                    },

                ]
            },
        
        /*    {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/primefaces/sakai-ng',
                        target: '_blank'
                    }
                ]
            } */
        ];
    }
}
