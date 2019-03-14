import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'firebase';
import { AuthService } from '../../../user/auth.service';
import { MembersService } from '../../members.service';
import { Member } from '../../models/member.interface';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
    private user: User | null;

    public memberForm: FormGroup = new FormGroup({
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', Validators.required),
    });

    constructor(
        private authService: AuthService,
        private membersService: MembersService
    ) {
        this.authService.user.subscribe((user: User | null) => {
            this.user = user;
        });
    }

    public ngOnInit(): void {
        this.membersService.getMember('fff').subscribe((foo: Member) => {
            console.log(foo);
        });
    }
}
