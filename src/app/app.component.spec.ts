import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StateService } from './services/state.service';
import { Subject } from 'rxjs';
import { MockSubject } from '../mocks/MockSubject';
describe('AppComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ AppComponent ],
				providers: [ StateService, { provide: Subject, useClass: MockSubject } ]
			}).compileComponents();
		})
	);

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
