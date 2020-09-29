import { Component, OnInit, Input, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '../services/state.service';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
	selector: 'app-tablist',
	templateUrl: './tablist.component.html',
	styleUrls: [ './tablist.component.scss' ]
})
export class TablistComponent implements OnInit {
	@Input() state: StateService;
	public addTabForm: FormGroup;
	public tabs: Array<any>;
	public tabSub: Subscription;
	public activeIndexSub: Subscription;
	public activeIndex: number;
	constructor(private formBuilder: FormBuilder) {}

	getFormBuilder(): FormBuilder {
		if (isDevMode()) return this.formBuilder;
		else return undefined;
	}

	ngOnInit(): void {
		this.addTabForm = this.formBuilder.group({
			name: new FormControl('', [ Validators.required, Validators.minLength(1) ])
		});
		this.tabSub = this.state.getTabs().subscribe((data) => {
			// console.log('tab data', data);
			this.tabs = data;
		});
		this.activeIndexSub = this.state.getActiveIndex().subscribe((activeIndex) => {
			// console.log('active tab index:', activeIndex);
			// this.activeIndex = activeIndex;
		});
		this.state.refresh();
	}

	ngOnDestroy(): void {
		if (this.tabSub) this.tabSub.unsubscribe();
	}

	addTab(fg: FormGroup) {
		// console.log('add tab:', fg.value);
		this.state.addTab({ name: fg.value.name, checks: new Array() });
		fg.reset();
	}

	activateTab(index: number) {
		console.log('activate tab:', index);
		if (index > -1) this.state.setActiveTab(index);
		else throw Error('Invalid tab index');
	}
}
