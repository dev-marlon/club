import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRoutes } from './business-domain/page-routes.enum';
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
        path: PageRoutes.Authenticate,
        component: PageAuthenticateComponent,
        data: {
            defaultRedirectToOnSuccess: PageRoutes.Members,
        } as PageAuthenticateConfig,
    },
    {
        path: PageRoutes.Members,
        canActivate: [AuthGuard],
        loadChildren: './page-members/page-members.module#PageMembersModule',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
