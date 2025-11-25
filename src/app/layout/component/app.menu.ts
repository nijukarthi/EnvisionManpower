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
                        if(this.loggedInUserDetails.userGroupId == 301 && this.loggedInUserDetails.userGroupName == 'Admin'){
                            this.adminUser = true;
                        } else if(this.loggedInUserDetails.userGroupId == 316 && this.loggedInUserDetails.userGroupName == 'Department Head'){
                            this.departmentUser = true;
                        }else if(this.loggedInUserDetails.userGroupId == 311 && this.loggedInUserDetails.userGroupName == 'Cluster Head'){
                            this.clusterUser = true;
                        }else if(this.loggedInUserDetails.userGroupId == 306 && this.loggedInUserDetails.userGroupName == 'Site Incharge'){
                            this.siteInchargeUser = true;
                        }else if(this.loggedInUserDetails.userGroupId == 321 && this.loggedInUserDetails.userGroupName == 'Project Manager'){
                            this.projectManagerUser = true;
                        }else if(this.loggedInUserDetails.userGroupId == 326 && this.loggedInUserDetails.userGroupName == 'Resource Manager'){
                            this.resourceManagerUser = true;
                        }else if (this.loggedInUserDetails.userGroupId === UserGroups.CONSULTANCY) {
                            this.consultancyUser = true
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
                                routerLink: ['/home/manager']
                            },
                            {
                                label: 'Assign Standard Role',
                                icon: 'pi pi-address-book',
                                routerLink: ['/home/assign-role']
                            },
                            {
                                label: 'Manpower Fulfillment',
                                icon: 'pi pi-history',
                                routerLink: ['/home/demand-fullfillment'],
                                visible: this.consultancyUser || this.adminUser
                            },
                            {
                                label: 'PO & Demand Map',
                                icon: 'pi pi-file-import', 
                                routerLink: ['/home/po-assign']
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
                        ],
                        visible: this.adminUser || this.consultancyUser
                    },
                    {
                        label: 'Performance & Attendance',
                        icon: 'pi pi-chart-bar',
                        items: [
                            {
                                label: 'Attendance',
                                icon: 'pi pi-book',
                                routerLink: ['/home/attendance']
                            },
                            {
                                label: 'Site Performance',
                                icon: 'pi pi-map',
                                routerLink: ['/home/site-performance']
                            },
                            {
                                label: 'Transfer',
                                icon: 'pi pi-file-export',
                                routerLink: ['/home/transfer']
                            },
                            {
                                label: 'Resignation',
                                icon: 'pi pi-file-excel',
                                routerLink: ['/home/terminate']
                            }
                        ],
                         visible: this.adminUser
                    },  
                    {
                        label: 'Accounts Payable',
                        icon: 'pi pi-money-bill',
                        items: [
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
                        ],
                         visible: this.adminUser
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
                        ],
                         visible: this.adminUser
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

            }catch(e){

            }
        }

}
