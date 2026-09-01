import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { Apiservice } from '@/service/apiservice/apiservice';
import { UserGroups } from '@/models/usergroups/usergroups.enum';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>

                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {
    model: MenuItem[] = [];

    loggedUserGroupId = Number(sessionStorage.getItem('userGroupId'));

    loggedInUserDetails: any = '';

    adminUser = false;
    departmentUser = false;
    clusterUser = false;
    siteInchargeUser = false;
    projectManagerUser = false;
    resourceManagerUser = false;
    consultancyUser = false;
    guestUser = false;
    readonlyAdmin = false;
    dprTeam = false;
    serviceManagerTeam = false;

    constructor(
        private apiService: Apiservice,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.fetchUserProfile();
    }

    fetchUserProfile(): void {
        this.apiService.fetchUserProfile('').subscribe({
            next: (val) => {
                this.loggedInUserDetails = val?.data;

                if (this.loggedInUserDetails) {
                    // ADMIN

                    if (this.loggedInUserDetails.userGroupId === UserGroups.ADMIN && this.loggedInUserDetails.userGroupName === 'Admin') {
                        this.adminUser = true;
                    }

                    // DEPARTMENT HEAD
                    else if (this.loggedInUserDetails.userGroupId === UserGroups.DEPARTMENTHEAD && this.loggedInUserDetails.userGroupName === 'Department Head') {
                        this.departmentUser = true;
                    }

                    // CLUSTER HEAD
                    else if (this.loggedInUserDetails.userGroupId === UserGroups.CLUSTERHEAD && this.loggedInUserDetails.userGroupName === 'Cluster Head') {
                        this.clusterUser = true;
                    }

                    // SITE INCHARGE
                    else if (this.loggedInUserDetails.userGroupId === UserGroups.SITEINCHARGE && this.loggedInUserDetails.userGroupName === 'Site Incharge') {
                        this.siteInchargeUser = true;
                    }

                    // PROJECT MANAGER
                    else if (this.loggedInUserDetails.userGroupId === UserGroups.PROJECTMANAGER && this.loggedInUserDetails.userGroupName === 'Project Manager') {
                        this.projectManagerUser = true;
                    }

                    // RESOURCE MANAGER
                    else if (this.loggedInUserDetails.userGroupId === UserGroups.RESOURCEMANAGER && this.loggedInUserDetails.userGroupName === 'Resource Manager') {
                        this.resourceManagerUser = true;
                    }

                    // CONSULTANCY
                    else if (this.loggedInUserDetails.userGroupId === UserGroups.CONSULTANCY && this.loggedInUserDetails.userGroupName === 'Consultancy Vendor') {
                        this.consultancyUser = true;
                    }

                    // READ ONLY ADMIN
                    else if (this.loggedInUserDetails.userGroupId === UserGroups.READONLYADMIN && this.loggedInUserDetails.userGroupName === 'Read Only Admin') {
                        this.readonlyAdmin = true;
                    }

                    // GUEST USER
                    else if (this.loggedInUserDetails.userGroupId === UserGroups.GUESTUSER) {
                        this.guestUser = true;
                    }

                    // DPR TEAM
                    else if (this.loggedInUserDetails.userGroupId === UserGroups.DPRMANAGEMENTTEAM) {
                        this.dprTeam = true;
                    }

                    // SERVICE MANAGER
                    else if (this.loggedInUserDetails.userGroupId === UserGroups.SERVICEMANAGER) {
                        this.serviceManagerTeam = true;
                    }
                }

                // Build menu after user permissions are loaded
                this.menuPage();
            },

            error: (err) => {
                console.error('Failed to fetch user profile:', err);
            }
        });
    }

    menuPage(): void {
        try {
            this.model = [
                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    routerLink: ['/pages'],

                    items: [
                        // DASHBOARD
                        // ADMIN ONLY

                        {
                            label: 'Dashboard',
                            icon: 'pi pi-objects-column',
                            routerLink: ['/home/dashboard'],
                            visible: this.adminUser
                        },

                        // MANPOWER REQUEST

                        {
                            label: 'Manpower Request',
                            icon: 'pi pi-calendar',
                            visible: this.adminUser || this.siteInchargeUser || this.serviceManagerTeam,

                            command: () => this.router.navigate(['/home/manpower-request'])
                        },

                        // MANPOWER APPROVAL

                        {
                            label: 'Manpower Approval',
                            icon: 'pi pi-ticket',
                            visible: this.adminUser || this.departmentUser || this.clusterUser || this.siteInchargeUser || this.serviceManagerTeam,

                            command: () => this.router.navigate(['/home/manpower-approval'])
                        },

                        // MANPOWER MANAGEMENT

                        {
                            label: 'Manpower Management',
                            icon: 'pi pi-briefcase',

                            items: [
                                {
                                    label: 'Assign Resource Manager',
                                    icon: 'pi pi-address-book',
                                    routerLink: ['/home/assign-resource-manager'],
                                    visible: this.adminUser || this.serviceManagerTeam
                                },

                                {
                                    label: 'Assign Standard Role',
                                    icon: 'pi pi-address-book',
                                    routerLink: ['/home/assign-role'],
                                    visible: this.adminUser || this.resourceManagerUser || this.serviceManagerTeam
                                },

                                {
                                    label: 'Manpower Fulfillment',
                                    icon: 'pi pi-history',
                                    routerLink: ['/home/manpower-fulfillment'],
                                    visible: this.consultancyUser || this.adminUser || this.resourceManagerUser || this.guestUser || this.serviceManagerTeam
                                },

                                {
                                    label: 'PO & Demand Map',
                                    icon: 'pi pi-file-import',
                                    routerLink: ['/home/po-assign'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin || this.serviceManagerTeam
                                },

                                {
                                    label: 'Onboarding',
                                    icon: 'pi pi-graduation-cap',
                                    routerLink: ['/home/onboarding'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin || this.serviceManagerTeam
                                },

                                {
                                    label: 'On-roll Employees',
                                    icon: 'pi pi-user',
                                    routerLink: ['/home/onroll-employees'],
                                    visible: this.adminUser || this.resourceManagerUser || this.siteInchargeUser || this.clusterUser || this.departmentUser || this.readonlyAdmin || this.serviceManagerTeam
                                },

                                {
                                    label: 'Change Consultancy Request',
                                    icon: 'pi pi-user',
                                    routerLink: ['/home/consultancy-request'],
                                    visible: this.adminUser || this.resourceManagerUser
                                },

                                {
                                    label: 'Training',
                                    icon: 'pi pi-warehouse',
                                    routerLink: ['/home/training'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin || this.serviceManagerTeam
                                }
                            ],

                            visible: this.adminUser || this.consultancyUser || this.resourceManagerUser || this.guestUser || this.siteInchargeUser || this.clusterUser || this.departmentUser || this.readonlyAdmin || this.serviceManagerTeam
                        },

                        // PERFORMANCE & ATTENDANCE

                        {
                            label: 'Performance & Attendance',
                            icon: 'pi pi-chart-bar',

                            items: [
                                {
                                    label: 'Attendance',
                                    icon: 'pi pi-book',
                                    routerLink: ['/home/attendance'],
                                    visible: this.adminUser || this.siteInchargeUser || this.resourceManagerUser || this.clusterUser || this.departmentUser || this.consultancyUser || this.readonlyAdmin || this.serviceManagerTeam
                                },

                                {
                                    label: 'Site Performance',
                                    icon: 'pi pi-map',
                                    routerLink: ['/home/site-performance'],
                                    visible: this.adminUser || this.siteInchargeUser || this.resourceManagerUser || this.clusterUser || this.departmentUser || this.consultancyUser || this.readonlyAdmin || this.serviceManagerTeam
                                },

                                {
                                    label: 'Transfer',
                                    icon: 'pi pi-file-export',
                                    routerLink: ['/home/transfer'],
                                    visible: this.adminUser || this.siteInchargeUser || this.departmentUser || this.clusterUser || this.consultancyUser || this.resourceManagerUser || this.readonlyAdmin || this.serviceManagerTeam
                                },

                                {
                                    label: 'Resignation',
                                    icon: 'pi pi-file-excel',
                                    routerLink: ['/home/resignation'],
                                    visible: this.adminUser || this.siteInchargeUser || this.departmentUser || this.clusterUser || this.consultancyUser || this.resourceManagerUser || this.readonlyAdmin || this.serviceManagerTeam
                                }
                            ],

                            visible: this.adminUser || this.siteInchargeUser || this.departmentUser || this.clusterUser || this.resourceManagerUser || this.consultancyUser || this.readonlyAdmin || this.serviceManagerTeam
                        },

                        // ACCOUNTS PAYABLE

                        {
                            label: 'Accounts Payable',
                            icon: 'pi pi-money-bill',

                            items: [
                                {
                                    label: 'Invoice Submission',
                                    icon: 'pi pi-check-circle',
                                    routerLink: ['/home/invoice-submission'],
                                    visible: this.consultancyUser
                                },

                                {
                                    label: 'Invoice Receipt',
                                    icon: 'pi pi-receipt',
                                    routerLink: ['/home/invoice-receipt'],
                                    visible: this.adminUser || this.readonlyAdmin
                                },

                                {
                                    label: 'Invoice Disbursement',
                                    icon: 'pi pi-file-o',
                                    routerLink: ['/home/invoice-disbursement'],
                                    visible: this.adminUser || this.readonlyAdmin
                                }
                            ],

                            visible: this.adminUser || this.consultancyUser || this.readonlyAdmin
                        },

                        // RESOURCE POOL

                        {
                            label: 'Resource Pool',
                            icon: 'pi pi-server',

                            items: [
                                {
                                    label: 'Consultancy',
                                    icon: 'pi pi-briefcase',
                                    routerLink: ['/home/consultancies'],
                                    visible: this.resourceManagerUser || this.adminUser || this.readonlyAdmin
                                },

                                {
                                    label: 'Candidate',
                                    icon: 'pi pi-user',

                                    items: [
                                        {
                                            label: 'Fixed Cost',
                                            icon: 'pi pi-wallet',
                                            routerLink: ['/home/candidates/fixed-cost'],
                                            visible: this.consultancyUser
                                        },

                                        {
                                            label: 'Cost Plus',
                                            icon: 'pi pi-receipt',
                                            routerLink: ['/home/candidates/cost-plus'],
                                            visible: this.consultancyUser
                                        }
                                    ],

                                    visible: this.consultancyUser
                                }
                            ],

                            visible: this.adminUser || this.consultancyUser || this.resourceManagerUser || this.readonlyAdmin
                        },

                        // MASTERS

                        {
                            label: 'Masters',
                            icon: 'pi pi-database',

                            items: [
                                {
                                    label: 'SPN',
                                    icon: 'pi pi-warehouse',
                                    routerLink: ['/home/spn'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin
                                },

                                {
                                    label: 'Project',
                                    icon: 'pi pi-inbox',
                                    routerLink: ['/home/projects'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin || this.serviceManagerTeam
                                },

                                {
                                    label: 'User Group',
                                    icon: 'pi pi-users',
                                    routerLink: ['/home/usergroups'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin
                                },

                                {
                                    label: 'Category',
                                    icon: 'pi pi-table',
                                    routerLink: ['/home/categories'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin
                                },

                                {
                                    label: 'Department',
                                    icon: 'pi pi-sitemap',
                                    routerLink: ['/home/departments'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin
                                },

                                {
                                    label: 'Envision Roles',
                                    icon: 'pi pi-book',
                                    routerLink: ['/home/envision-roles'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin
                                },

                                {
                                    label: 'Cluster',
                                    icon: 'pi pi-shop',
                                    routerLink: ['/home/clusters'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin
                                },

                                {
                                    label: 'Users',
                                    icon: 'pi pi-user',
                                    routerLink: ['/home/users'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin
                                },

                                {
                                    label: 'Interviewer',
                                    icon: 'pi pi-address-book',
                                    routerLink: ['/home/interviewers'],
                                    visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin
                                }
                            ],

                            visible: this.adminUser || this.resourceManagerUser || this.readonlyAdmin || this.serviceManagerTeam
                        },

                        // DAILY PROGRESS REPORT

                        {
                            label: 'Daily Progress Report',
                            icon: 'pi pi-chart-bar',

                            items: [
                                {
                                    label: 'Inputs',
                                    icon: 'pi pi-sign-in',

                                    items: [
                                        {
                                            label: 'Site Wise DPR',
                                            icon: 'pi pi-map-marker',
                                            routerLink: ['/home/dpr-project-details']
                                        },

                                        {
                                            label: 'Customer',
                                            icon: 'pi pi-user',
                                            routerLink: ['/home/customer']
                                        }
                                    ]
                                },

                                {
                                    label: 'Summary',
                                    icon: 'pi pi-file',

                                    items: [
                                        {
                                            label: 'Customer Wise DPR',
                                            icon: 'pi pi-file-check',
                                            routerLink: ['/home/customer-wise-dpr']
                                        }
                                    ]
                                }
                            ],

                            visible: this.adminUser || this.dprTeam
                        },

                        // AUDIT LOGS

                        {
                            label: 'Audit Logs',
                            icon: 'pi pi-file',

                            items: [
                                {
                                    label: 'Session Logs',
                                    icon: 'pi pi-warehouse',
                                    routerLink: ['/home/session-logs']
                                },

                                {
                                    label: 'Activity Logs',
                                    icon: 'pi pi-inbox',
                                    routerLink: ['/home/activity-logs']
                                }
                            ],

                            visible: this.adminUser || this.resourceManagerUser
                        }
                    ]
                }
            ];
        } catch (e) {
            console.error('Menu creation error:', e);
        }
    }
}
