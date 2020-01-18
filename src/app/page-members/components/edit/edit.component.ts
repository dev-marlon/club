import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from 'firebase';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../page-authenticate/services/auth.service';

import { MemberDocumentData } from '../../models/member-document-data.interface';
import { Member } from '../../models/member.interface';
import { MembersService } from '../../services/members.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
    private user: User | null;
    private member: Member | undefined;
    private memberServiceSubscription: Subscription;

    public form: FormGroup = new FormGroup({
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', Validators.required),
    });

    constructor(
        private authService: AuthService,
        private membersService: MembersService,
        private snackBar: MatSnackBar
    ) {
        this.authService.user.subscribe((user: User | null) => {
            this.user = user;
        });
    }

    public ngOnInit(): void {
        this.memberServiceSubscription = this.membersService
            .getByUserUid(this.user.uid)
            .subscribe((member: Member) => {
                if (member === undefined) {
                    return;
                }

                this.member = member;

                this.form.patchValue({
                    firstname: member.firstname,
                    lastname: member.lastname,
                });
            });
    }

    public onSubmit(): void {
        if (this.member === undefined) {
            this.addMember().then(() => {
                const snackBarRef = this.snackBar.open(
                    'Eintrag angelegt',
                    null,
                    {
                        duration: 3000,
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom',
                    }
                );
            });

            return;
        }

        this.updateMember().then(() => {
            const snackBarRef = this.snackBar.open(
                'Eintrag aktualisiert',
                null,
                {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                }
            );
        });
    }

    public ngOnDestroy(): void {
        this.memberServiceSubscription.unsubscribe();
    }

    private addMember(): Promise<DocumentReference | void> {
        return this.membersService
            .add({
                firstname: this.form.get('firstname').value,
                lastname: this.form.get('lastname').value,
                userUid: this.user.uid,
            })
            .catch((error: any) => console.log(error));
    }

    private updateMember(): Promise<void> {
        return this.membersService.update(this.member, {
            firstname: this.form.get('firstname').value,
            lastname: this.form.get('lastname').value,
            userUid: this.user.uid,
        } as MemberDocumentData);
    }
}
