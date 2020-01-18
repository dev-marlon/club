import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginConfig } from './page-authenticate/components/login/login.component';
import { AuthGuard } from './page-authenticate/guards/auth.guard';
import { PageAuthenticateComponent } from './page-authenticate/page-authenticate.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'members',
    },
    {
        path: 'authenticate',
        component: PageAuthenticateComponent,
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
