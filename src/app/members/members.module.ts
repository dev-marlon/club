import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';

@NgModule({
    declarations: [MembersComponent],
    imports: [CommonModule, MaterialModule, MembersRoutingModule],
})
export class MembersModule {}
