import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { Apiservice } from '@/service/apiservice/apiservice';
import { UserGroups } from '@/models/usergroups/usergroups.enum';

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

    loggedInUserDetails:any = "";
    adminUser:boolean = false;
    departmentUser:boolean = false;
    clusterUser:boolean = false;
    siteInchargeUser:boolean = false;
    projectManagerUser:boolean = false;
    resourceManagerUser:boolean = false;
    consultancyUser = false;
    guestUser = false;

    constructor(private apiService: Apiservice) { }

    ngOnInit() {
       
        this.fetchUserProfile();
    }

    fetchUserProfile(){
        this.apiService.fetchUserProfile('').subscribe({
            next: val => {
                console.log(val);
                this.loggedInUserDetails = val.data;
                if(this.loggedInUserDetails){
                    if(this.loggedInUserDetails.userGroupId === UserGroups.ADMIN && this.loggedInUserDetails.userGroupName == 'Admin'){
                        this.adminUser = true;
                    } else if(this.loggedInUserDetails.userGroupId === UserGroups.DEPARTMENTHEAD && this.loggedInUserDetails.userGroupName == 'Department Head'){
                        this.departmentUser = true;
                    }else if(this.loggedInUserDetails.userGroupId == UserGroups.CLUSTERHEAD && this.loggedInUserDetails.userGroupName == 'Cluster Head'){
                        this.clusterUser = true;
                    }else if(this.loggedInUserDetails.userGroupId == UserGroups.SITEINCHARGE && this.loggedInUserDetails.userGroupName == 'Site Incharge'){
                        this.siteInchargeUser = true;
                    }else if(this.loggedInUserDetails.userGroupId == UserGroups.PROJECTMANAGER && this.loggedInUserDetails.userGroupName == 'Project Manager'){
                        this.projectManagerUser = true;
                    }else if(this.loggedInUserDetails.userGroupId === UserGroups.RESOURCEMANAGER && this.loggedInUserDetails.userGroupName == 'Resource Manager'){
                        this.resourceManagerUser = true;
                    }else if (this.loggedInUserDetails.userGroupId === UserGroups.CONSULTANCY && this.loggedInUserDetails.userGroupName === 'Consultancy Vendor') {
                        this.consultancyUser = true
                    } else if (this.loggedInUserDetails.userGroupId === UserGroups.GUESTUSER) {
                        this.guestUser = true;
                    }
                }

                this.menuPage();
            },
            error: err => {
                console.log(err);
            }
        })
    }

    menuPage(){
        try{
            this.model = [
                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    routerLink: ['/pages'],
                    items: [
                        {
                            label: 'Manpower Request',
                            icon: 'pi pi-calendar',
                            routerLink: ['/home/demand'],
                            visible: !!this.adminUser || !!this.siteInchargeUser
                        },
                        {
                            label: 'Manpower Approval',
                            icon: 'pi pi-ticket',
                            routerLink: ['/home/approval'],
                            visible: this.adminUser || this.departmentUser || this.clusterUser
                        },
                        {
                            label: 'Manpower Management',
                            icon: 'pi pi-briefcase',
                            items: [
                                {
                                    label: 'Assign Resource Manager',
                                    icon: 'pi pi-address-book',
                                    routerLink: ['/home/manager'],
                                    visible: this.adminUser
                                },
                                {
                                    label: 'Assign Standard Role',
                                    icon: 'pi pi-address-book',
                                    routerLink: ['/home/assign-role'],
                                    visible: this.adminUser || this.resourceManagerUser
                                },
                                {
                                    label: 'Manpower Fulfillment',
                                    icon: 'pi pi-history',
                                    routerLink: ['/home/demand-fullfillment'],
                                    visible: this.consultancyUser || this.adminUser || this.resourceManagerUser || this.guestUser
                                },
                                {
                                    label: 'PO & Demand Map',
                                    icon: 'pi pi-file-import', 
                                    routerLink: ['/home/po-assign'],
                                    visible: this.adminUser || this.resourceManagerUser
                                },
                                {
                                    label: 'Onboarding',
                                    icon: 'pi pi-graduation-cap',
                                    routerLink: ['/home/onboarding'],
                                    visible: this.adminUser || this.resourceManagerUser
                                },
                                {
                                    label: 'On-roll Employees',
                                    icon: 'pi pi-user',
                                    routerLink: ['/home/onroll-employees'],
                                    visible: this.adminUser || this.resourceManagerUser
                                },
                                {
                                    label: 'Training',
                                    icon: 'pi pi-warehouse',
                                    routerLink: ['/home/training'],
                                    visible: this.adminUser || this.resourceManagerUser
                                }
                            ],
                            visible: this.adminUser || this.consultancyUser || this.resourceManagerUser || this.guestUser
                        },
                        {
                            label: 'Performance & Attendance',
                            icon: 'pi pi-chart-bar',
                            items: [
                                {
                                    label: 'Attendance',
                                    icon: 'pi pi-book',
                                    routerLink: ['/home/attendance'],
                                    visible: this.adminUser || this.siteInchargeUser || this.resourceManagerUser
                                },
                                {
                                    label: 'Site Performance',
                                    icon: 'pi pi-map',
                                    routerLink: ['/home/site-performance'],
                                    visible: this.adminUser || this.siteInchargeUser || this.resourceManagerUser
                                },
                                {
                                    label: 'Transfer',
                                    icon: 'pi pi-file-export',
                                    routerLink: ['/home/transfer'],
                                    visible: this.adminUser || this.siteInchargeUser || this.departmentUser || this.clusterUser
                                },
                                {
                                    label: 'Resignation',
                                    icon: 'pi pi-file-excel',
                                    routerLink: ['/home/terminate'],
                                    visible: this.adminUser || this.siteInchargeUser || this.departmentUser || this.clusterUser
                                }
                            ],
                                visible: this.adminUser || this.siteInchargeUser || this.departmentUser || this.clusterUser || this.resourceManagerUser
                        },  
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
                                    visible: this.adminUser 
                                },
                                {
                                    label: 'Invoice Disbursement',
                                    icon: 'pi pi-file-o',
                                    routerLink: ['/home/invoice-disbursement'],
                                    visible: this.adminUser
                                }
                            ],
                                visible: this.adminUser || this.consultancyUser
                        },        
                        {
                            label: 'Resource Pool',
                            icon: 'pi pi-server', 
                            items: [
                                {
                                    label: 'Consultancy',
                                    icon: 'pi pi-briefcase',
                                    routerLink: ['/home/consultancies'],
                                    visible: this.resourceManagerUser || this.adminUser 
                                },
                                {
                                    label: 'Candidate',
                                    icon: 'pi pi pi-user',
                                    items:[
                                        {
                                            label: 'Fixed Cost',
                                            icon: 'pi pi-wallet',
                                            routerLink: ['/home/candidate/fixed-cost'],
                                            visible: this.adminUser || this.consultancyUser
                                        },
                                        {
                                            label: 'Cost Plus',
                                            icon: 'pi pi-receipt',
                                            routerLink: ['/home/candidate/cost-plus'],
                                            visible: this.adminUser || this.consultancyUser
                                        }
                                    ],
                                    visible: this.adminUser || this.consultancyUser
                                }
                            ],
                                visible: this.adminUser || this.consultancyUser || this.resourceManagerUser
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
                            ],
                                visible: this.adminUser
                        },
                        {
                            label: 'Logout',
                            icon: 'pi pi-sign-out',
                            routerLink: ['/']
                        },

                    ]
                },
            ];
        }
        catch(e){

        }
    }

}
