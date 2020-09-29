import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MockTabData } from '../../mocks/mock-data';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	private tabsArray: Array<any>;
	private activeTabIndex: any;

	constructor(
		private tabsSubject: Subject<any>,
		private activeIndexSubject: Subject<any>,
		private activeTabSubject: Subject<any>
	) {
		this.setTabs(MockTabData);
		this.tabsArray = new Array();
	}

	setTabs(data) {
		this.tabsArray = data;
	}

	getTabs() {
		return this.tabsSubject;
	}

	async addTab(tabData: any) {
		this.tabsArray.push(tabData);
		this.tabsSubject.next(this.tabsArray);
	}

	refresh() {
		this.tabsSubject.next(this.tabsArray);
	}

	setActiveTab(index: number) {
		this.activeTabIndex = index;
		this.activeIndexSubject.next(index);
		this.activeTabSubject.next(this.tabsArray[index]);
	}

	getActiveIndex() {
		return this.activeIndexSubject;
	}
}
