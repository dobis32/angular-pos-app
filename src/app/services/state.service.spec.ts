import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';
import { Subject } from 'rxjs';
import { MockSubject } from '../../mocks/MockSubject';

describe('StateService', () => {
	let service: StateService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ { provide: Subject, useClass: MockSubject } ]
		});
		service = TestBed.inject(StateService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
