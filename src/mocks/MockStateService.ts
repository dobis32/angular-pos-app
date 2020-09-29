import { Subject } from 'rxjs';
import { MockTabData } from './mock-data';

export class MockStateService {
	public tabsArray: Array<any>;

	constructor(public tabsSubject: Subject<any>) {
		this.setTabs(MockTabData);
		this.tabsSubject = new Subject();
	}

	setTabs(data: any) {
		this.tabsArray = data;
	}

	getTabs() {
		return this.tabsSubject;
	}

	refresh() {
		this.tabsSubject.next(this.tabsArray);
	}
}
