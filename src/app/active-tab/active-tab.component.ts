import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '../services/state.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-active-tab',
	templateUrl: './active-tab.component.html',
	styleUrls: [ './active-tab.component.scss' ]
})
export class ActiveTabComponent {
	@Input() state: StateService;

	public activeTab: any;

	constructor() {}

	ngOnInit() {
		this.state.activeTabSubscribe((data: any) => {
			this.activeTab = data;
		})
		this.state.refreshAllTabsObservers();
	}
}
