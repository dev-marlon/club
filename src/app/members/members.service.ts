import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    CollectionReference,
    DocumentChangeAction,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Member } from './models/member.interface';

@Injectable({
    providedIn: 'root',
})
export class MembersService {
    private membersCollection: AngularFirestoreCollection<Member>;
    public members$: Observable<Member[]>;

    constructor(private angularFireStore: AngularFirestore) {
        this.membersCollection = this.angularFireStore.collection(
            'members'
            // (ref: CollectionReference) => ref.where('firstname', '==', 'Marlon')
        );

        this.members$ = this.membersCollection.valueChanges();
    }

    public getMember(userUid: string): Observable<any> {
        return this.angularFireStore
            .collection('members', (ref: CollectionReference) =>
                ref
                    .where('user_uid', '==', '7oSfwCgU4Rexy5YMXf8IjfTMJJp2')
                    .limit(1)
            )
            .valueChanges();
    }
}
