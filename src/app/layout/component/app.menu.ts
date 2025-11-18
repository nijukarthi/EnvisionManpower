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

    loggedUserGroupId = Number(sessionStorage.getItem('userGroupId'));

    ngOnInit() {
        this.model = [
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Manpower Request',
                        icon: 'pi pi-calendar',
                        routerLink: ['/home/demand']
                    },
                    {
                        label: 'Manpower Approval',
                        icon: 'pi pi-ticket',
                        routerLink: ['/home/approval']
                    },
                    {
                        label: 'Manpower Management',
                        icon: 'pi pi-briefcase',
                        items: [
                            {
                                label: 'Assign Resource Manager',
                                icon: 'pi pi-address-book',
                                routerLink: ['/home/manager']
                            },
                            {
                                label: 'Assign Standard Role',
                                icon: 'pi pi-address-book',
                                routerLink: ['/home/assign-role']
                            },
                            {
                                label: 'Manpower Fullfillment',
                                icon: 'pi pi-history',
                                routerLink: ['/home/demand-fullfillment']
                            },
                            {
                                label: 'Onboarding',
                                icon: 'pi pi-graduation-cap',
                                routerLink: ['/home/onboarding']
                            },
                            {
                                label: 'On-roll Employees',
                                icon: 'pi pi-user',
                                routerLink: ['/home/onroll-employees']
                            },
                            {
                                label: 'Training',
                                icon: 'pi pi-warehouse',
                                routerLink: ['/home/training']
                            }
                        ]
                    },
                    {
                        label: 'Performance & Attendance',
                        icon: 'pi pi-chart-bar',
                        items: [
                            {
                                label: 'Attendance',
                                icon: 'pi pi-book'
                            },
                            {
                                label: 'Site Performance',
                                icon: 'pi pi-map',
                                routerLink: ['/home/site-performance']
                            },
                            {
                                label: 'Transfer',
                                icon: 'pi pi-hourglass',
                                routerLink: ['/home/transfer']
                            },
                            {
                                label: 'Resignation',
                                icon: 'pi pi-file-excel',
                                routerLink: ['/home/terminate']
                            }
                        ]
                    },  
                    {
                        label: 'Accounts Payable',
                        icon: 'pi pi-money-bill',
                        items: [
                            {
                                label: 'PO Creation',
                                icon: 'pi pi-file-check'
                            },
                            {
                                label: 'Invoice Submission',
                                icon: 'pi pi-check-circle',
                                routerLink: ['/home/invoice-submission']
                            },
                            {
                                label: 'Invoice Receipt',
                                icon: 'pi pi-receipt',
                                routerLink: ['/home/invoice-receipt']
                            },
                            {
                                label: 'Invoice Disbursement',
                                icon: 'pi pi-file-o',
                                routerLink: ['/home/invoice-disbursement']
                            }
                        ]
                    },        
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
                                        label: 'Fixed Cost',
                                        icon: 'pi pi-wallet',
                                        routerLink: ['/home/candidate/fixed-cost']
                                    },
                                    {
                                        label: 'Cost Plus',
                                        icon: 'pi pi-receipt',
                                        routerLink: ['/home/candidate/cost-plus']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Masters',
                        icon: 'pi pi-database',
                        items: [
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
                                label: 'Interviewer',
                                icon: "pi pi-address-book",
                                routerLink: ['/home/interviewers']
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
        ];

        if (this.loggedUserGroupId === 360) {
            this.model = this.model
            .map(group => {
                if (group && group.label === 'Pages' && group.items) {
                    return {
                        ...group,
                        items: group.items.filter(
                            item =>
                                item?.label === 'Manpower Management' ||
                                item?.label === 'Resource Pool' || 
                                item.label === 'Performance & Attendance' ||
                                item.label === 'Accounts Payable' ||
                                item?.label === 'Logout'
                        ),
                    };
                }
                return group;
            })
            .filter((group): group is MenuItem => group !== null && group !== undefined);
        } else {
            this.model = this.model;
        }
    }

}
