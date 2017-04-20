export interface EventCallback {
    (key: any)
}

export class EventHandler {
    public events: EventCallback[] = [];

    constructor(public key: any = null) { }

    register(evt: string, callback: EventCallback) {
        this.events[evt] = this.events[evt] || [];
        this.events[evt].push(callback);
    }

    unregister(evt: string, callback: EventCallback) {
        if (this.events[evt] != null) {
            this.events[evt].forEach((cb: EventCallback, i: number) => {
                if (cb === callback) this.events[evt][i] = null;
            });
        }
    }

    fire(evt: string) {
        if (this.events[evt] != null) {
            this.events[evt].forEach((cb: EventCallback) => {
                if (typeof cb === 'function') cb(this.key);
            });
        }
    }
}