import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from '../../../user/auth.service';
import { MembersService } from '../../members.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
    private user: User | null;

    constructor(
        private authService: AuthService,
        private membersService: MembersService
    ) {
        this.authService.user.subscribe((user: User | null) => {
            this.user = user;
        });
    }

    public ngOnInit(): void {
        this.membersService.getMember('fff').subscribe((foo: any) => {
            console.log(foo);
        });
    }
}
