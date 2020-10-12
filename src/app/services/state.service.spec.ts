import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';

describe('StateService', () => {
	let service: StateService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(StateService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should have all tab data', () => {
		expect(service._getAllTabsArray()).toBeTruthy();
	});

	it('should have the index of the currently "active" tab', () => {
		expect(service._getActiveIndex()).toEqual(undefined); // value is initialized to undefined
	});

	it('should have a function that adds a new active-tab observer', () => {
		let initObsCount = service._getActiveTabObservers().length;

		service.activeTabSubscribe((data: any) => {});

		expect(service._getActiveTabObservers().length).toBeGreaterThan(initObsCount);
	});

	it('should have a function that adds a new tabs data observer', () => {
		let initObsCount = service._getAllTabsObservers().length;

		service.allTabsSubscribe((data: any) => {});

		expect(service._getAllTabsObservers().length).toBeGreaterThan(initObsCount);
	});

	it('should have a function that adds a new active index observer', () => {
		let initObsCount = service._getActiveIndexObservers().length;

		service.activeIndexSubscribe((data: any) => {});

		expect(service._getActiveIndexObservers().length).toBeGreaterThan(initObsCount);
	});

	it('should have a function for adding a tab that should also refresh the all-tabs observers', () => {
		let refreshSpy = spyOn(service, 'refreshAllTabsObservers').and.callThrough();
		let initCount = service._getAllTabsArray().length;

		service.addTab({ name: 'new tab', items: [] });

		expect(typeof service.addTab).toEqual('function');
		expect(service._getAllTabsArray().length).toBeGreaterThan(initCount);
		expect(refreshSpy).toHaveBeenCalled();
	});

	it('should have a function for activating a tab that should also refresh the active-index observers', () => {
		let refreshSpy = spyOn(service, 'refreshActiveIndexObservers').and.callThrough();
		let i = 0;
		let initActiveIndex = service._getActiveIndex();

		service.addTab({ name: 'new tab', items: [] });
		service.activateTab(i);

		expect(typeof service.activateTab).toEqual('function');
		expect(initActiveIndex).toEqual(undefined);
		expect(service._getActiveIndex()).toEqual(i);
		expect(refreshSpy).toHaveBeenCalled();
	});

	it('should have a function that updates a given tab and also refreshes the all-tabs observers', () => {
		let refreshSpy = spyOn(service, 'refreshAllTabsObservers').and.callThrough();
		let updatedName = 'updated tab';
		let i = 0;
		let newTabMock = { name: 'new tab', items: [] };

		service.addTab(newTabMock);
		service.addTab(newTabMock);
		service.updateTab(i, { name: updatedName, items: [] });

		expect(typeof service.updateTab).toEqual('function');
		expect(refreshSpy).toHaveBeenCalled();
		expect(service._getAllTabsArray()[i].name).toEqual(updatedName);
	});

	it('should have a function that calls the "next" function of each all-tabs observer', () => {
		service.addTab({ name: 'new tab', items: [] });
		service.allTabsSubscribe((data: any) => {});
		service.allTabsSubscribe((data: any) => {});

		let obsSpy1 = spyOn(service._getAllTabsObservers()[0], 'next').and.callThrough();
		let obsSpy2 = spyOn(service._getAllTabsObservers()[1], 'next').and.callThrough();

		service.refreshAllTabsObservers();

		expect(typeof service.refreshAllTabsObservers).toEqual('function');
		expect(obsSpy1).toHaveBeenCalled();
		expect(obsSpy1).toHaveBeenCalledWith(service._getAllTabsArray());
		expect(obsSpy2).toHaveBeenCalled();
		expect(obsSpy2).toHaveBeenCalledWith(service._getAllTabsArray());
	});

	it('should have a function that calls the "next" function of each active-index observer', () => {
		service.addTab({ name: 'new tab', items: [] });
		service.activeIndexSubscribe((data: any) => {});
		service.activeIndexSubscribe((data: any) => {});

		let obsSpy1 = spyOn(service._getActiveIndexObservers()[0], 'next').and.callThrough();
		let obsSpy2 = spyOn(service._getActiveIndexObservers()[1], 'next').and.callThrough();

		service.refreshActiveIndexObservers();

		expect(typeof service.refreshActiveIndexObservers).toEqual('function');
		expect(obsSpy1).toHaveBeenCalled();
		expect(obsSpy1).toHaveBeenCalledWith(service._getActiveIndex());
		expect(obsSpy2).toHaveBeenCalled();
		expect(obsSpy2).toHaveBeenCalledWith(service._getActiveIndex());
	});

	it('should have a function that calls the "next" function of each active-tab observer', () => {
		service.addTab({ name: 'new tab', items: [] });
		service.activeTabSubscribe((data: any) => {});
		service.activeTabSubscribe((data: any) => {});

		let obsSpy1 = spyOn(service._getActiveTabObservers()[0], 'next').and.callThrough();
		let obsSpy2 = spyOn(service._getActiveTabObservers()[1], 'next').and.callThrough();

		service.refreshActiveTabObservers();

		expect(typeof service.refreshActiveTabObservers).toEqual('function');
		expect(obsSpy1).toHaveBeenCalled();
		expect(obsSpy1).toHaveBeenCalledWith(service._getActiveTab());
		expect(obsSpy2).toHaveBeenCalled();
		expect(obsSpy2).toHaveBeenCalledWith(service._getActiveTab());
	});
});
