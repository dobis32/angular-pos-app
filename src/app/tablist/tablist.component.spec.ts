import { Component, DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablistComponent } from './tablist.component';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../services/state.service';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MockTabData } from '../../mocks/mock-data';

describe('TablistComponent', () => {
	@Component({
		selector: `host-component`,
		template: `<app-tablist [state]="state"></app-tablist>`
	})
	class TestHostComponent {
		constructor(public state: StateService) {}
	}

	let hostComponent: TestHostComponent;
	let hostFixture: ComponentFixture<TestHostComponent>;
	let tabListDebugElement: DebugElement;
	let tabListComponent: TablistComponent;
	// let mockTabData;
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ TablistComponent, TestHostComponent ],
				imports: [ ReactiveFormsModule ],
				schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
				providers: [ FormBuilder, StateService, Subject ]
			}).compileComponents();
		})
	);

	beforeEach(async () => {
		// Object.assign(mockTabData, MockTabData);
		hostFixture = TestBed.createComponent(TestHostComponent);
		hostComponent = hostFixture.componentInstance;
		hostFixture.detectChanges();
		await hostFixture.whenStable();
		tabListDebugElement = hostFixture.debugElement.query(By.directive(TablistComponent));
		tabListComponent = tabListDebugElement.componentInstance;
	});

	it('should create', () => {
		expect(hostComponent).toBeTruthy();
		expect(tabListComponent).toBeTruthy();
	});
	6;
});
