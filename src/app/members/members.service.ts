import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
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
}
