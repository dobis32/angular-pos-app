import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveTabComponent } from './active-tab.component';
import { StateService } from '../services/state.service';
import { TablistComponent } from '../tablist/tablist.component';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
describe('ActiveTabComponent', () => {
	@Component({
		selector: `host-component`,
		template: `<app-active-tab [state]="state"></app-active-tab>`
	})
	class TestHostComponent {
		constructor(public state: StateService) {}
	}

	let hostComponent: TestHostComponent;
	let hostFixture: ComponentFixture<TestHostComponent>;
	let activeTabDebugElement: DebugElement;
	let activeTabComponent: ActiveTabComponent;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ ActiveTabComponent, TestHostComponent ],
				schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
				providers: [ Subject ]
			}).compileComponents();
		})
	);

	beforeEach(async () => {
		hostFixture = TestBed.createComponent(TestHostComponent);
		hostComponent = hostFixture.componentInstance;
		hostFixture.detectChanges();
		await hostFixture.whenStable();
		activeTabDebugElement = hostFixture.debugElement.query(By.directive(ActiveTabComponent));
		activeTabComponent = activeTabDebugElement.componentInstance;
	});

	it('should create', () => {
		expect(hostComponent).toBeTruthy();
		expect(TablistComponent).toBeTruthy();
	});
});
