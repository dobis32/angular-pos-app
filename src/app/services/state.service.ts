import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MockTabData } from '../mock-data';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	private tabsArray: Array<any>;
	constructor(private tabSubject: Subject<any>) {
		this.setTabs(MockTabData);
	}

	setTabs(data) {
		this.tabsArray = data;
		this.tabSubject.next(this.tabsArray);
	}

	getTabs() {
		return this.tabSubject;
	}
}
