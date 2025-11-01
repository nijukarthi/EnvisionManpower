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
                        label: 'Demand Request',
                        icon: 'pi pi-calendar',
                        routerLink: ['/home/demand']
                    },
                    {
                        label: 'Demand Approval',
                        icon: 'pi pi-ticket',
                        routerLink: ['/home/approval']
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
        ];

        if (this.loggedUserGroupId === 360) {
            this.model = this.model
            .map(group => {
                if (group && group.label === 'Pages' && group.items) {
                    return {
                        ...group,
                        items: group.items.filter(
                            item =>
                                item?.label === 'Full Fill Process' ||
                                item?.label === 'Resource Pool' || 
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
