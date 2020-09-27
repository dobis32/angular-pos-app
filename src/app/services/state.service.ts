import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MockTabData } from '../mock-data';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	private tabsArray: Array<any>;
	constructor(private tabsSubject: Subject<any>) {
		this.setTabs(MockTabData);
	}

	setTabs(data) {
		this.tabsArray = data;
	}

	getTabs() {
		return this.tabsSubject;
	}

	refresh() {
		this.tabsSubject.next(this.tabsArray);
	}
}
