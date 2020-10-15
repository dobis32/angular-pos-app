import { Injectable, isDevMode } from '@angular/core';
import { Observer } from '../util/observer';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	private activeTabIndex: number;
	private allTabsArray: Array<any>;
	private allTabsObservers: Array<Observer>;
	private activeIndexObservers: Array<Observer>;
	private activeTabObservers: Array<Observer>;

	constructor() {
		this.activeTabIndex = undefined;
		this.allTabsArray = new Array();
		this.allTabsObservers = new Array();
		this.activeIndexObservers = new Array();
		this.activeTabObservers = new Array();

		this.allTabsArray = [{ name: 'tab1', items: ['item1', 'item2', 'item3'] }, { name: 'tab2', items: ['item1', 'item2']}];
	}

	_getAllTabsObservers() {
		if (isDevMode()) return this.allTabsObservers;
		else {
			console.log(new Error('"_getAllTabsObservers" function can only be used in dev mode'));
			return undefined;
		}
	}

	_getActiveIndexObservers() {
		if (isDevMode()) return this.activeIndexObservers;
		else {
			console.log(new Error('"_getActiveIndexObservers" function can only be used in dev mode'));
			return undefined;
		}
	}

	_getActiveTabObservers() {
		if (isDevMode()) return this.activeTabObservers;
		else {
			console.log(new Error('"_getActiveTabObservers" function can only be used in dev mode'));
			return undefined;
		}
	}

	_getAllTabsArray() {
		if (isDevMode()) return this.allTabsArray;
		else {
			console.log(new Error('"_getAllTabsArray" function can only be used in dev mode'));
			return undefined;
		}
	}

	_getActiveIndex() {
		if (isDevMode()) return this.activeTabIndex;
		else {
			console.log(new Error('"_getActiveIndex" function can only be used in dev mode'));
			return undefined;
		}
	}

	_getActiveTab() {
		if (isDevMode()) return this.allTabsArray[this.activeTabIndex];
		else {
			console.log(new Error('"_getActiveTab" function can only be used in dev mode'));
			return undefined;
		}
	}

	allTabsSubscribe(cb: Function) {
		let obs = new Observer(cb);
		this.allTabsObservers.push(obs);
	}

	activeIndexSubscribe(cb: Function) {
		let obs = new Observer(cb);
		this.activeIndexObservers.push(obs);
	}

	activeTabSubscribe(cb: Function) {
		let obs = new Observer(cb);
		this.activeTabObservers.push(obs);
	}

	addTab(data: any) {
		this.allTabsArray.push(data);
		this.refreshAllTabsObservers();
	}

	activateTab(index: number) {
		this.activeTabIndex = index;
		this.refreshActiveIndexObservers();
		this.refreshActiveTabObservers();
	}

	updateTab(index: number, data: any) {
		this.allTabsArray[index] = data;
		this.refreshAllTabsObservers();
	}

	refreshAllTabsObservers() {
		this.allTabsObservers.forEach((obs) => {
			obs.next(this.allTabsArray);
		});
	}

	refreshActiveIndexObservers() {
		this.activeIndexObservers.forEach((obs) => {
			obs.next(this.activeTabIndex);
		});
	}

	refreshActiveTabObservers() {
		let activeTab = this.allTabsArray[this.activeTabIndex];
		this.activeTabObservers.forEach((obs) => {
			obs.next(activeTab);
		});
	}
}
