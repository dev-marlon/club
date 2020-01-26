import { TestBed } from '@angular/core/testing';

import { InMemoryMembersService } from './in-memory-members.service';

describe('InMemoryMembersService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: InMemoryMembersService = TestBed.get(
            InMemoryMembersService
        );
        expect(service).toBeTruthy();
    });
});
