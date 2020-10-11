import { Injectable, OnInit } from '@angular/core';
import { Observer } from '../util/observer';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	private activeTabIndex: number;
	private allTabsArray: Array<any>;
	private allTabsObservers: Array<Observer>;
	private activeTabObservers: Array<Observer>;

	constructor() {
		this.activeTabIndex = undefined;
		this.allTabsArray = new Array();
		this.allTabsObservers = new Array();
		this.activeTabObservers = new Array();
	}

	allTabsSubscribe(cb: Function) {
		let obs = new Observer(cb);
		console.log('new all tab sub', obs);
		this.allTabsObservers.push(obs);
	}

	activeIndexSubscribe(cb: Function) {
		let obs = new Observer(cb);
		console.log('new active index sub', obs);
		this.activeTabObservers.push(obs);
	}

	addTab(data: any) {
		this.allTabsArray.push(data);
		console.log('tab data observers', this.allTabsObservers);
		this.refreshAllTabsObservers();
	}

	activateTab(index: number) {
		this.activeTabIndex = index;
		this.refreshActiveIndexObservers();
	}

	updateTab(index: number, data: any) {
		this.allTabsArray[index] = data;
		this.refreshAllTabsObservers();
	}

	refreshAllTabsObservers() {
		this.allTabsObservers.forEach((obs) => {
			console.log('refreshing obs', obs);
			obs.next(this.allTabsArray);
		});
	}

	refreshActiveIndexObservers() {
		this.activeTabObservers.forEach((obs) => {
			obs.next(this.activeTabIndex);
		});
	}
}
