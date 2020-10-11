export class Observer {
	private nextCallBack: Function;

	constructor(cb: Function) {
		this.nextCallBack = cb;
	}

	next(data: any) {
		this.nextCallBack(data);
	}
}
