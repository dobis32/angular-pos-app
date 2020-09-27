import { Component, OnInit, Input } from '@angular/core';
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
	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.addTabForm = this.formBuilder.group({
			name: new FormControl('', [ Validators.required, Validators.minLength(1) ])
		});
		this.tabSub = this.state.getTabs().subscribe((data) => {
			console.log('tab data', data);
			this.tabs = data;
		});
		this.state.refresh();
	}

	ngOnDestroy(): void {
		if (this.tabSub) this.tabSub.unsubscribe();
	}

	addTab(fg: FormGroup) {
		console.log('add tab:', fg.value);
	}

	foo() {
		console.log('that tickles');
	}
}
