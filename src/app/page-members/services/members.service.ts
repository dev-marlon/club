import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
    CollectionReference,
    DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberDocumentData } from '../models/member-document-data.interface';
import { Member } from '../models/member.interface';
import { MembersInterface } from './members.interface';

@Injectable({
    providedIn: 'root',
})
export class MembersService implements MembersInterface {
    private membersCollection: AngularFirestoreCollection<Member>;
    public members$: Observable<Member[]>;

    constructor(private angularFireStore: AngularFirestore) {
        this.membersCollection = this.angularFireStore.collection('members');
        this.members$ = this.membersCollection.valueChanges();
    }

    public getByUserUid(userUid: string): Observable<Member | undefined> {
        return this.angularFireStore
            .collection('members', (ref: CollectionReference) =>
                ref.where('userUid', '==', userUid).limit(1)
            )
            .snapshotChanges()
            .pipe(
                map((result: any) => {
                    if (result[0] === undefined) {
                        return;
                    }

                    const member = result[0].payload.doc.data();
                    member.uid = result[0].payload.doc.id;

                    return member;
                })
            );
    }

    public update(
        member: Member,
        memberDocumentData: MemberDocumentData
    ): Promise<void> {
        const userRef: AngularFirestoreDocument<MemberDocumentData> = this.angularFireStore.doc(
            `members/${member.uid}`
        );

        return userRef.set(memberDocumentData);
    }

    public add(
        memberDocumentData: MemberDocumentData
    ): Promise<DocumentReference> {
        return this.angularFireStore
            .collection('members')
            .add(memberDocumentData);
    }
}
