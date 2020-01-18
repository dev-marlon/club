import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { EditComponent } from './components/edit/edit.component';
import { PageMembersRoutingModule } from './page-members-routing.module';
import { PageMembersComponent } from './page-members.component';
import { MembersService } from './services/members.service';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
    declarations: [PageMembersComponent, EditComponent, FilterComponent],
    imports: [
        CommonModule,
        MaterialModule,
        PageMembersRoutingModule,
        AngularFirestoreModule,
        ReactiveFormsModule,
    ],
    providers: [MembersService],
})
export class PageMembersModule {}
