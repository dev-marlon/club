import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { MembersComponent } from './members.component';

const routes: Routes = [
    {
        path: '',
        component: MembersComponent,
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
export class MembersRoutingModule {}
