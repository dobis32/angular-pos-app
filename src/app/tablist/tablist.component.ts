import { Component, OnInit, Input, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '../services/state.service';

@Component({
	selector: 'app-tablist',
	templateUrl: './tablist.component.html',
	styleUrls: [ './tablist.component.scss' ]
})
export class TablistComponent implements OnInit {
	@Input() state: StateService;
	public addTabForm: FormGroup;
	public tabs: Array<any>;
	// public tabSub: Subscription;
	// public activeIndexSub: Subscription;
	public activeIndex: number;
	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.addTabForm = this.formBuilder.group({
			name: new FormControl('', [ Validators.required, Validators.minLength(1) ])
		});
		this.state.allTabsSubscribe((data) => {
			console.log('some new data', data);
			this.tabs = data;
		});

		this.state.activeIndexSubscribe((data) => {
			console.log('new active index', data);
			this.activeIndex = data;
		});
	}

	addTab(fg: FormGroup) {
		// console.log('add tab:', fg.value);
		this.state.addTab({ name: fg.value.name, checks: new Array() });
		fg.reset();
	}

	activateTab(index: number) {
		if (index == this.activeIndex) this.state.activateTab(undefined);
		else this.state.activateTab(index);
	}
}
