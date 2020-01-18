import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './page-authenticate/guards/auth.guard';
import {
    PageAuthenticateComponent,
    PageAuthenticateConfig,
} from './page-authenticate/page-authenticate.component';

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
        } as PageAuthenticateConfig,
    },
    {
        path: 'members',
        canActivate: [AuthGuard],
        loadChildren: './page-members/page-members.module#PageMembersModule',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
