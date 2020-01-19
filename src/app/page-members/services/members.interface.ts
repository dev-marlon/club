import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MemberDocumentData } from '../models/member-document-data.interface';
import { Member } from '../models/member.interface';

export interface MembersInterface {
    members$: Observable<Member[]>;
    getByUserUid: (userUid: string) => Observable<Member | undefined>;
    update: (
        member: Member,
        memberDocumentData: MemberDocumentData
    ) => Promise<void>;
    add: (memberDocumentData: MemberDocumentData) => Promise<DocumentReference>;
}
