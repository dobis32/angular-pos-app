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

	it('should have a form builder injected into it', () => {
		let fixture = TestBed.createComponent(TablistComponent);
		let formBuilder = fixture.debugElement.injector.get(FormBuilder);
	});

	it('should have the state service as an input from the host component', () => {
		expect(hostComponent.state).toEqual(tabListComponent.state);
	});

	it('should have a function to add a new tab within the state service', () => {
		let newTab = 'new tab';
		let state = hostFixture.debugElement.injector.get(StateService);
		let tabs;
		let stateSpy = spyOn(state, 'addTab').and.callFake((data: any) => {
			tabListComponent.tabs.push(data);
		});
		let newTabForm = tabListComponent.addTabForm;
		let initTabCount;

		tabListComponent.tabs = new Array();
		tabs = tabListComponent.tabs;
		initTabCount = tabs.length;
		newTabForm.setValue({ name: newTab });
		tabListComponent.addTab(newTabForm);

		expect(tabListComponent.addTabForm).toBeTruthy();
		expect(stateSpy).toHaveBeenCalled();
		expect(tabs.length).toBeGreaterThan(initTabCount);
		expect(tabs[tabs.length - 1].name).toEqual(newTab);
	});

	it('should have a form group for naming a new tab', () => {
		expect(tabListComponent.addTabForm).toBeTruthy();
	});

	it('should reset the new tab form after adding a new tab', () => {
		let formSpy = spyOn(tabListComponent.addTabForm, 'reset').and.callThrough();

		tabListComponent.addTabForm.setValue({ name: 'new tab' });
		tabListComponent.addTab(tabListComponent.addTabForm);

		expect(formSpy).toHaveBeenCalled();
	});

	it('should have the index of the currently activated tab', () => {
		let i = 1;

		tabListComponent.activeIndex = i;

		expect(tabListComponent.activeIndex).toEqual(i);
	});

	it('should have a function for "activating" a tab', () => {
		let i = 1;

		spyOn(tabListComponent.state, 'activateTab').and.callFake((index: number) => {
			tabListComponent.activeIndex = index;
		});
		tabListComponent.activateTab(i);

		expect(tabListComponent.activeIndex).toEqual(i);
		expect(typeof tabListComponent.activateTab).toEqual('function');
	});

	it('should set the active tab index of the sate service to "undefined" if the current active index is passed to the activateTab function', () => {
		let i = 1;

		spyOn(tabListComponent.state, 'activateTab').and.callFake((index: number) => {
			tabListComponent.activeIndex = index;
		});
		tabListComponent.activateTab(i);
		tabListComponent.activateTab(i);

		expect(tabListComponent.activeIndex).toEqual(undefined);
	});
});
