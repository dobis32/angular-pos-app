import { Component, OnInit, Input } from '@angular/core';
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
	public tabItems: Array<any>;
	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.addTabForm = this.formBuilder.group({
			name: new FormControl('', [ Validators.required, Validators.minLength(1) ])
		});
	}

	addTab(fg: FormGroup) {
		console.log('add tab:', fg.value);
	}
}
