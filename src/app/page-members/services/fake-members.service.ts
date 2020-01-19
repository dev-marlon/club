import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { MemberDocumentData } from '../models/member-document-data.interface';
import { Member } from '../models/member.interface';
import { MembersInterface } from './members.interface';

@Injectable({
    providedIn: 'root',
})
export class FakeMembersService implements MembersInterface {
    private members: ReplaySubject<Member[]> = new ReplaySubject<Member[]>();
    public members$: Observable<Member[]> = this.members.asObservable();

    constructor() {
        this.members.next([
            {
                uid: 'asdas',
                firstname: 'dasdas',
                lastname: 'sadasd',
                category: 'dasd',
                userUid: 'dsadas',
            },
            {
                uid: 'asdas',
                firstname: 'dasdas',
                lastname: 'sadasd',
                category: 'dasd',
                userUid: 'dsadas',
            },
            {
                uid: 'asdas',
                firstname: 'dasdas',
                lastname: 'sadasd',
                category: 'dasd',
                userUid: 'dsadas',
            },
        ]);
    }

    public getByUserUid(userUid: string): Observable<Member | undefined> {
        return undefined;
    }

    public update(
        member: Member,
        memberDocumentData: MemberDocumentData
    ): Promise<void> {
        return new Promise<void>(() => {});
    }

    public add(
        memberDocumentData: MemberDocumentData
    ): Promise<DocumentReference | any> {
        return new Promise<any>(() => {});
    }
}
