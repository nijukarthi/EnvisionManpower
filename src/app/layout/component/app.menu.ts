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
                        routerLink: ['/home/demand']
                    },
                    {
                        label: 'Demand Approval',
                        icon: 'pi pi-ticket',
                        routerLink: ['/home/approval']
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
                        label: 'Resource Manager Assign',
                        icon: 'pi pi-address-book',
                        routerLink: ['/home/manager']
                    },
                    {
                        label: 'Full Fill Request',
                        icon: 'pi pi-address-book',
                        routerLink: ['/home/fullFill']
                    },
                    {
                        label: 'Full Fill Process',
                        icon: 'pi pi-history',
                        items: [
                            {
                                label: 'Resource Manager',
                                icon: 'pi pi-address-book',
                                routerLink: ['/home/fullfillprocess/resource-manager']
                            },
                            {
                               label: 'Consultancy',
                               icon: 'pi pi-credit-card',
                               routerLink: ['/home/consultancyPage']
                           },
                           {
                               label: 'Guest User',
                               icon: 'pi pi-eraser',
                               routerLink: ['/home/guestUserPage']
                           },
                        ]
                    },
                    // {
                    //     label: 'Interview Management',
                    //     icon: 'pi pi-eject',
                    //     routerLink: ['/home/interviewManagement']
                    // },
                    {
                        label: 'Resource Pool',
                        icon: 'pi pi-server', 
                        items: [
                            {
                                label: 'Consultancy',
                                icon: 'pi pi-briefcase',
                                routerLink: ['/home/consultancies']
                            },
                            {
                                label: 'Candidate',
                                icon: 'pi pi pi-user',
                                items:[
                                    {
                                        label: 'New Candidate',
                                        icon: 'pi pi-file-plus',
                                        items: [
                                            {
                                                label: 'Fixed Cost',
                                                icon: 'pi pi-wallet',
                                                routerLink: ['/home/candidate/new/fixed-cost']
                                            },
                                            {
                                                label: 'Cost Plus',
                                                icon: 'pi pi-receipt',
                                                routerLink: ['/home/candidate/new/cost-plus']
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Existing Candidate',
                                        icon: 'pi pi-folder-plus',
                                        items: [
                                            {
                                                label: 'Fixed Cost',
                                                icon: 'pi pi-wallet',
                                                routerLink: ['/home/candidate/existing/fixed-cost']
                                            },
                                            {
                                                label: 'Cost Plus',
                                                icon: 'pi pi-receipt'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Masters',
                        icon: 'pi pi-database',
                        items: [
                            // {
                            //     label: 'Add Employee',
                            //     icon: 'pi pi-plus',
                            //     items:[
                            //         {
                            //             label: 'New Candidate',
                            //             icon: 'pi pi-file-plus',
                            //             routerLink: ['/home/addEmployee']
                            //         },
                            //         {
                            //             label: 'Existing Candidate',
                            //             icon: 'pi pi-folder-plus',
                            //             routerLink: ['/home/existingEmployee']
                            //         }
                            //     ]
                            // },
                            {
                                label: 'SPN',
                                icon: 'pi pi-warehouse',
                                routerLink: ['/home/spn']
                            },
                            {
                                label: 'Project',
                                icon: 'pi pi-inbox',
                                routerLink: ['/home/projects']
                            },
                            {
                                label: 'User Group',
                                icon: 'pi pi-users',
                                routerLink: ['/home/usergroups']
                            },
                            {
                                label: 'Category',
                                icon: 'pi pi-table',
                                routerLink: ['/home/categories']
                            },
                            {
                                label: 'Department',
                                icon: 'pi pi-sitemap',
                                routerLink: ['/home/departments']
                            },
                            {
                                label: 'Envision Roles',
                                icon: 'pi pi-book',
                                routerLink: ['/home/envisionRoles']
                            },
                            {
                                label: 'Cluster',
                                icon: 'pi pi-shop',
                                routerLink: ['/home/clusters']
                            },
                            {
                                label: 'Users',
                                icon: 'pi pi-user',
                                routerLink: ['/home/users']
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
