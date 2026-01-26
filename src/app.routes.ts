import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from '@/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
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
import { Steps } from '@/pages/fullFillProcess/steps/steps';
import { DemandFullfillment } from '@/pages/fullFillProcess/demand-fullfillment/demand-fullfillment';
import { FixedCostCandidateForm } from '@/pages/candidate/fixed-cost-candidate-form/fixed-cost-candidate-form';
import { CostPlusCandidateForm } from '@/pages/candidate/cost-plus-candidate-form/cost-plus-candidate-form';
import { Interviewer } from '@/pages/interviewer/interviewer';
import { OnboardingTable } from '@/pages/onboarding/onboarding-table/onboarding-table';
import { TrainingTable } from '@/pages/training/training-table/training-table';
import { SitePerformance } from '@/pages/performanceAttendance/site-performance/site-performance';
import { InvoiceSubmission } from '@/pages/accounts-payable/invoice-submission/invoice-submission';
import { InvoiceReceipt } from '@/pages/accounts-payable/invoice-receipt/invoice-receipt';
import { InvoiceDisbursement } from '@/pages/accounts-payable/invoice-disbursement/invoice-disbursement';
import { OnRollEmployees } from '@/pages/on-roll-employees/on-roll-employees';
import { Transfer } from '@/pages/performanceAttendance/transfer/transfer';
import { Terminate } from '@/pages/performanceAttendance/terminate/terminate';
import { TransferForm } from '@/pages/performanceAttendance/transfer-form/transfer-form';
import { InvoiceSubmissionForm } from '@/pages/accounts-payable/invoice-submission-form/invoice-submission-form';
import { AttendanceTable } from '@/pages/performanceAttendance/attendance-table/attendance-table';
import { PoAssignTable } from '@/pages/po-assign-table/po-assign-table';
import { PoAssignForm } from '@/pages/po-assign-form/po-assign-form';
import { PoAssignEditForm } from '@/pages/po-assign-edit-form/po-assign-edit-form';
import { ActivityLog } from '@/pages/audit-log/activity-log';
import { SessionLog } from '@/pages/audit-log/session-log/session-log';

export const appRoutes: Routes = [
    {
        path: '',
        component: Loginpage
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
                path: 'manpower-request',
                component: Demand,
                canActivate: [authGuard]
            },
            {
                path: 'manpower-approval',
                component: Approval,
                canActivate: [authGuard]
            },
            {
                path: 'assign-role',
                component: Fullfillreq,
                canActivate: [authGuard]
            },
            {
                path: 'consultancies',
                component: ConsultancyTable,
                canActivate: [authGuard]
            },
            {
                path: 'consultancies/new',
                component: ConsultancyForm,
                canActivate: [authGuard]
            },
            { path: 'consultancies/:id', component: ConsultancyForm, canActivate: [authGuard] },
            { path: 'departments', component: DepartmentTable, canActivate: [authGuard] },
            { path: 'spn', component: SpnTable, canActivate: [authGuard] },
            { path: 'categories', component: CategoryTable, canActivate: [authGuard] },
            { path: 'usergroups', component: UsergroupTable, canActivate: [authGuard] },
            { path: 'users', component: CompanyUsers, canActivate: [authGuard] },
            { path: 'clusters', component: Cluster, canActivate: [authGuard] },
            { path: 'assign-resource-manager', component: ResourceManagerAssign, canActivate: [authGuard] },
            { path: 'projects', component: Project, canActivate: [authGuard] },
            { path: 'envision-roles', component: Envisionroles, canActivate: [authGuard] },
            { path: 'interviewers', component: Interviewer, canActivate: [authGuard] },
            { path: 'uikit', canActivate: [authGuard], loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation, canActivate: [authGuard] },
            { path: 'manpower-fulfillment', component: DemandFullfillment, canActivate: [authGuard] },
            { path: 'manpower-fulfillment/steps', component: Steps, canActivate: [authGuard] },
            { path: 'po-assign', component: PoAssignTable, canActivate: [authGuard] },
            { path: 'po-assign/new', component: PoAssignForm, canActivate: [authGuard] },
            { path: 'po-assign/:id', component: PoAssignEditForm, canActivate: [authGuard] },
            { path: 'onboarding', component: OnboardingTable, canActivate: [authGuard] },
            { path: 'onroll-employees', component: OnRollEmployees, canActivate: [authGuard] },
            { path: 'training', component: TrainingTable, canActivate: [authGuard] },
            { path: 'attendance', component: AttendanceTable, canActivate: [authGuard] },
            { path: 'site-performance', component: SitePerformance, canActivate: [authGuard] },
            { path: 'transfer/update', component: TransferForm, canActivate: [authGuard] },
            { path: 'transfer', component: Transfer, canActivate: [authGuard] },
            { path: 'resignation', component: Terminate, canActivate: [authGuard] },
            { path: 'invoice-submission', component: InvoiceSubmission, canActivate: [authGuard] },
            { path: 'invoice-submission/new', component: InvoiceSubmissionForm, canActivate: [authGuard] },
            { path: 'invoice-submission/:id', component: InvoiceSubmissionForm, canActivate: [authGuard] },
            { path: 'invoice-receipt', component: InvoiceReceipt, canActivate: [authGuard] },
            { path: 'invoice-disbursement', component: InvoiceDisbursement, canActivate: [authGuard] },
            { path: 'candidates/fixed-cost/new', component: FixedCostCandidateForm, canActivate: [authGuard] },
            { path: 'candidates/fixed-cost/:id', component: FixedCostCandidateForm, canActivate: [authGuard] },
            { path: 'candidates/cost-plus/new', component: CostPlusCandidateForm, canActivate: [authGuard] },
            { path: 'candidates/cost-plus/:id', component: CostPlusCandidateForm, canActivate: [authGuard] },
            { path: 'candidates/fixed-cost', component: CandidateFixedCost, canActivate: [authGuard] },
            { path: 'candidates/cost-plus', component: CandidateCostPlus, canActivate: [authGuard] },
            { path: 'activity-logs', component: ActivityLog, canActivate: [authGuard] },
            { path: 'session-logs', component: SessionLog, canActivate: [authGuard] },
            { path: 'pages', canActivate: [authGuard], loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
