import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { MaterialModule } from '../material/material.module';
import { EditComponent } from './components/edit/edit.component';
import { FilterComponent } from './components/filter/filter.component';
import { PageMembersRoutingModule } from './page-members-routing.module';
import { PageMembersComponent } from './page-members.component';
import { FakeMembersService } from './services/fake-members.service';
import { MembersService } from './services/members.service';

@NgModule({
    declarations: [PageMembersComponent, EditComponent, FilterComponent],
    imports: [
        CommonModule,
        MaterialModule,
        PageMembersRoutingModule,
        AngularFirestoreModule,
        ReactiveFormsModule,
    ],
    providers: [
        environment.production
            ? MembersService
            : { provide: MembersService, useClass: FakeMembersService },
    ],
})
export class PageMembersModule {}
