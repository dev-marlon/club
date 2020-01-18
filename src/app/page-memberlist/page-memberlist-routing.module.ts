import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { PageMemberlistComponent } from './page-memberlist.component';

const routes: Routes = [
    {
        path: '',
        component: PageMemberlistComponent,
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
export class PageMemberlistRoutingModule {}
