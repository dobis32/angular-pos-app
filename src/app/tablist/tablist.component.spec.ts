import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablistComponent } from './tablist.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ TablistComponent, TestHostComponent ],
				providers: [ FormBuilder, StateService, Subject ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		hostFixture = TestBed.createComponent(TestHostComponent);
		hostComponent = hostFixture.componentInstance;
		hostFixture.detectChanges();
		tabListDebugElement = hostFixture.debugElement.query(By.directive(TablistComponent));
		tabListComponent = tabListDebugElement.componentInstance;
	});

	it('should create', () => {
		expect(hostComponent).toBeTruthy();
		expect(tabListComponent).toBeTruthy();
	});

	// test properties
	it('should have StateService from parent component', () => {
		expect(hostComponent.state).toEqual(tabListComponent.state);
	});

	it('should have a FormGroup for adding a new tab', () => {
		expect(tabListComponent.addTabForm).toBeTruthy();
		console.log(typeof tabListComponent.addTabForm);
	});

	it('should have an array for storing tabs data', () => {
		expect(tabListComponent.tabs).toBeTruthy();
		expect(Array.isArray(tabListComponent.tabs)).toBeTrue();
	});

	it('should have a tab subscription which should be unsubscribed from when the component is destroyed', () => {
		let unsubSpy = spyOn(tabListComponent.tabSub, 'unsubscribe').and.callThrough();

		tabListComponent.ngOnDestroy();

		expect(tabListComponent.tabSub).toBeTruthy();
		expect(unsubSpy).toHaveBeenCalledTimes(1);
	});

	it('should have a FormBuilder injected into it (!requires dev mode!)', () => {
		expect(tabListComponent.getFormBuilder()).toBeTruthy();
	});

	// test functions
	it('should have a function for adding new tabs', () => {
		let addTabForm = tabListComponent.getFormBuilder().group({
			name: new FormControl('init_value', [ Validators.required, Validators.minLength(1) ])
		});

		let initTabsCount = tabListComponent.tabs.length;

		tabListComponent.addTab(addTabForm);

		expect(typeof tabListComponent.addTab).toEqual('function');
		expect(tabListComponent.addTab).toBeTruthy();
		expect(tabListComponent.tabs.length).toBeGreaterThan(initTabsCount);
	});

	it('should have a function for activating a tab', () => {
		tabListComponent.tabs = MockTabData;
		let activateTabSpy = spyOn(tabListComponent.state, 'setActiveTab').and.callFake(() => {});
		let i = tabListComponent.tabs.length - 1;

		tabListComponent.activateTab(i);

		expect(tabListComponent.activateTab).toBeTruthy();
		expect(typeof tabListComponent.activateTab).toEqual('function');
		expect(activateTabSpy).toHaveBeenCalled();
		expect(tabListComponent.tabs.length).toBeGreaterThan(i);
	});

	// test rendered page
	it('should have a listing for every tab rendered to the DOM', () => {
		let de = tabListDebugElement;
		let tabsCount = tabListComponent.tabs.length;
		expect(de.queryAll(By.css('.tab-listing')).length).toEqual(tabsCount);
	});

	it('should have a "tab name" input for adding new tabs which should reset when a tab is added', () => {
		let de = tabListDebugElement;
		let addTabForm = tabListComponent.getFormBuilder().group({
			name: new FormControl('init_value', [ Validators.required, Validators.minLength(1) ])
		});

		tabListComponent.addTab(addTabForm);

		expect(de.query(By.css('#add-tab-input'))).toBeTruthy();
		expect(addTabForm.value.name).toBeFalsy();
	});
});
