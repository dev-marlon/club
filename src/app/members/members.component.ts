import { Component, OnInit } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Member {
    firstname: string;
    lastname: string;
    userUid: string;
}

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
    private membersCollection: AngularFirestoreCollection<Member>;
    public members: Observable<Member[]>;

    constructor(private angularFireStore: AngularFirestore) {
        this.membersCollection = this.angularFireStore.collection(
            'members'
            // (ref: CollectionReference) => ref.where('firstname', '==', 'Marlon')
        );

        this.members = this.membersCollection.valueChanges();
    }

    public ngOnInit(): void {}
}
