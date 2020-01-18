import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { PageMembersComponent } from './page-members.component';

const routes: Routes = [
    {
        path: '',
        component: PageMembersComponent,
    },
    {
        path: 'edit',
        component: EditComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PageMembersRoutingModule {}
