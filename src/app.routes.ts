import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from '@/pages/landing/landing'; 
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from '@/pages/auth/login';
import { Demand } from '@/pages/demand/demand';
import { Approval } from '@/pages/approval/approval';
import { Fullfillreq } from '@/pages/fullfillreq/fullfillreq';
import { InterviewManagement } from '@/pages/interview-management/interview-management';
import { Register } from '@/pages/auth/register';
import { ConsultancyTable } from '@/pages/consultancy/consultancy-table/consultancy-table';
import { SpnTable } from '@/pages/spn/spn-table/spn-table';
import { DepartmentTable } from '@/pages/department/department-table/department-table';
import { CategoryTable } from '@/pages/category/category-table/category-table';
import { UsergroupTable } from '@/pages/usergroup/usergroup-table/usergroup-table';
import { authGuard } from '@/guards/auth-guard';
import { CompanyUsers } from '@/pages/companyUsers/company-users/company-users';
import { Cluster } from '@/pages/cluster/cluster/cluster';
import { ResourceManagerAssign } from '@/pages/ResourceManagerAssign/resource-manager-assign/resource-manager-assign';
import { Loginpage } from '@/pages/loginpage/loginpage';
import { Envisionroles } from '@/pages/envisionroles/envisionroles';
import { Project } from '@/pages/project/project/project';
import { AddEmployee } from '@/pages/add-employee/add-employee';
import { ExistingEmployee } from '@/pages/existing-employee/existing-employee';
import { NewCandidateFixedCost } from '@/pages/new-candidate-fixed-cost/new-candidate-fixed-cost';
import { ExistingCandidateFixedCost } from '@/pages/existing-candidate-fixed-cost/existing-candidate-fixed-cost';
import { NewCandidateCostPlus } from '@/pages/new-candidate-cost-plus/new-candidate-cost-plus';

export const appRoutes: Routes = [
    {
        path:'',
        component:Loginpage
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'home',
        component: AppLayout,
        children: [
            { 
                path: 'demand', 
                component: Demand, 
                canActivate: [authGuard]
            },
            { 
                path: 'approval', 
                component: Approval,
                canActivate: [authGuard]
            },
            { path: 'fullFill', component: Fullfillreq, canActivate: [authGuard]},
            { path: 'interviewManagement', component: InterviewManagement, canActivate: [authGuard]},
            { path: 'consultancies', component: ConsultancyTable, canActivate: [authGuard] },
            { path: 'departments', component: DepartmentTable, canActivate: [authGuard] },
            { path: 'spn', component: SpnTable, canActivate: [authGuard] },
            { path: 'categories', component: CategoryTable, canActivate: [authGuard] },
            { path: 'usergroups', component:  UsergroupTable, canActivate: [authGuard] },
            { path: 'users', component: CompanyUsers, canActivate: [authGuard] },
            { path: 'clusters', component: Cluster, canActivate: [authGuard] },
            { path: 'manager', component: ResourceManagerAssign, canActivate: [authGuard] },
            { path: 'projects', component: Project, canActivate: [authGuard]},
            { path: 'envisionRoles', component: Envisionroles, canActivate: [authGuard] },
            { path: 'uikit', canActivate: [authGuard], loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation, canActivate: [authGuard] },
            { path: 'addEmployee', component: AddEmployee, canActivate: [authGuard] },
            { path: 'existingEmployee', component: ExistingEmployee, canActivate: [authGuard] },
            { path: 'candidate/new/fixed-cost', component: NewCandidateFixedCost, canActivate: [authGuard] },
            { path: 'candidate/new/cost-plus', component: NewCandidateCostPlus, canActivate: [authGuard] },
            { path: 'candidate/existing/fixed-cost',component: ExistingCandidateFixedCost, canActivate: [authGuard] },
            { path: 'pages', canActivate: [authGuard], loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
