import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from '@/pages/landing/landing'; 
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from '@/pages/auth/login';
import { Demand } from '@/pages/demand/demand';
import { Approval } from '@/pages/approval/approval';
import { Fullfillreq } from '@/pages/fullfillreq/fullfillreq';
import { InterviewManagement } from '@/pages/interview-management/interview-management';
import { Register } from '@/pages/auth/register';

export const appRoutes: Routes = [
    {
        path:'',
        component:Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'Dashboard',
        component: AppLayout,
        children: [
            { path: 'demand', component: Demand },
            { path: 'approval', component: Approval },
            { path: 'fullFill', component: Fullfillreq },
            { path: 'interviewManagement', component: InterviewManagement },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
