import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './user/components/login/login.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'members',
        canActivate: [AuthGuard],
        component: MembersComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
