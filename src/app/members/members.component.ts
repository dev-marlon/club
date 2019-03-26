import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
        this.members$ = this.membersService.members$.pipe(
            map((members: Member[]) =>
                members.sort((a: Member, b: Member) =>
                    a.lastname < b.lastname ? -1 : 1
                )
            )
        );
    }
}
