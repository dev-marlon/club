import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MembersService } from './members.service';
import { Member } from './models/member.interface';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
})
export class MembersComponent {
    public members$: Observable<Member[]>;

    constructor(private membersService: MembersService) {
        this.members$ = this.membersService.members$;
    }
}
