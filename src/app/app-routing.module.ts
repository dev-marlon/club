import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './user/auth.guard';
import {
    LoginComponent,
    LoginConfig,
} from './user/components/login/login.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'members',
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            defaultRedirectToOnSuccess: 'members',
        } as LoginConfig,
    },
    {
        path: 'members',
        canActivate: [AuthGuard],
        loadChildren: './members/members.module#MembersModule',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
