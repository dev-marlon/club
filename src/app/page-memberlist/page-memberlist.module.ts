import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { EditComponent } from './components/edit/edit.component';
import { PageMemberlistRoutingModule } from './page-memberlist-routing.module';
import { PageMemberlistComponent } from './page-memberlist.component';
import { MembersService } from './services/members.service';

@NgModule({
    declarations: [PageMemberlistComponent, EditComponent],
    imports: [
        CommonModule,
        MaterialModule,
        PageMemberlistRoutingModule,
        AngularFirestoreModule,
        ReactiveFormsModule,
    ],
    providers: [MembersService],
})
export class PageMemberlistModule {}
