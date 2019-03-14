import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MaterialModule } from '../material/material.module';
import { EditComponent } from './components/edit/edit.component';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { MembersService } from './members.service';

@NgModule({
    declarations: [MembersComponent, EditComponent],
    imports: [
        CommonModule,
        MaterialModule,
        MembersRoutingModule,
        AngularFirestoreModule,
    ],
    providers: [MembersService],
})
export class MembersModule {}
