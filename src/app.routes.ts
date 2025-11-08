import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from '@/pages/landing/landing'; 
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from '@/pages/auth/login';
import { Demand } from '@/pages/demand/demand';
import { Approval } from '@/pages/approval/approval';
import { Fullfillreq } from '@/pages/fullfillreq/fullfillreq';
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
import { CandidateFixedCost } from '@/pages/candidate/candidate-fixed-cost/candidate-fixed-cost';
import { CandidateCostPlus } from '@/pages/candidate/candidate-cost-plus/candidate-cost-plus';
import { ConsultancyForm } from '@/pages/consultancy/consultancy-form/consultancy-form';
import { ConsultancyPage } from '@/pages/fullFillProcess/consultancy-page/consultancy-page';
import { GuestUserPage } from '@/pages/fullFillProcess/guest-user-page/guest-user-page';
import { Steps } from '@/pages/fullFillProcess/steps/steps';
import { DemandFullfillment } from '@/pages/fullFillProcess/demand-fullfillment/demand-fullfillment';
import { FixedCostCandidateForm } from '@/pages/candidate/fixed-cost-candidate-form/fixed-cost-candidate-form';
import { CostPlusCandidateForm } from '@/pages/candidate/cost-plus-candidate-form/cost-plus-candidate-form';
import { Interviewer } from '@/pages/interviewer/interviewer';
import { OnboardingTable } from '@/pages/onboarding/onboarding-table/onboarding-table';
import { TrainingTable } from '@/pages/training/training-table/training-table';
import { SitePerformance } from '@/pages/performanceAttendance/site-performance/site-performance';

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
            { path: 'assign-role', component: Fullfillreq, canActivate: [authGuard]},
            { path: 'consultancies', component: ConsultancyTable, canActivate: [authGuard] },
            { path: 'consultancies/new', component: ConsultancyForm, canActivate: [authGuard] },
            { path: 'consultancies/:id', component: ConsultancyForm, canActivate: [authGuard] },
            { path: 'departments', component: DepartmentTable, canActivate: [authGuard] },
            { path: 'spn', component: SpnTable, canActivate: [authGuard] },
            { path: 'categories', component: CategoryTable, canActivate: [authGuard] },
            { path: 'usergroups', component:  UsergroupTable, canActivate: [authGuard] },
            { path: 'users', component: CompanyUsers, canActivate: [authGuard] },
            { path: 'clusters', component: Cluster, canActivate: [authGuard] },
            { path: 'manager', component: ResourceManagerAssign, canActivate: [authGuard] },
            { path: 'projects', component: Project, canActivate: [authGuard]},
            { path: 'envisionRoles', component: Envisionroles, canActivate: [authGuard] },
            { path: 'interviewers', component: Interviewer, canActivate: [authGuard] },
            { path: 'uikit', canActivate: [authGuard], loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation, canActivate: [authGuard] },
            { path: 'consultancyPage', component: ConsultancyPage, canActivate: [authGuard] },
            { path: 'guestUserPage', component: GuestUserPage, canActivate: [authGuard] },
            { path: 'demand-fullfillment', component: DemandFullfillment, canActivate: [authGuard] },
            { path: 'demand-fullfillment/steps', component: Steps, canActivate: [authGuard] },
            { path: 'onboarding', component: OnboardingTable, canActivate: [authGuard] },
            { path: 'training', component: TrainingTable, canActivate: [authGuard] },
            { path: 'site-performance', component: SitePerformance, canActivate: [authGuard] },
            { path: 'candidates/fixed-cost/new', component: FixedCostCandidateForm, canActivate: [authGuard] },
            { path: 'candidates/fixed-cost/:id', component: FixedCostCandidateForm, canActivate: [authGuard] },
            { path: 'candidates/cost-plus/new', component: CostPlusCandidateForm, canActivate: [authGuard] },
            { path: 'candidates/cost-plus/:id', component: CostPlusCandidateForm, canActivate: [authGuard] },
            { path: 'candidate/fixed-cost', component: CandidateFixedCost, canActivate: [authGuard] },
            { path: 'candidate/cost-plus', component: CandidateCostPlus, canActivate: [authGuard] },
            { path: 'pages', canActivate: [authGuard], loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
