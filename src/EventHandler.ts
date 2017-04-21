export interface EventCallback {
    (key: any)
}

export class EventHandler {
    public events: EventCallback[] = [];

    constructor(public key: any = null) { }

    register(event: string, callback: EventCallback) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(callback);
    }

    unregister(event: string, callback: EventCallback) {
        if (this.events[event] != null) {
            this.events[event].forEach((cb: EventCallback, i: number) => {
                if (cb === callback) this.events[event][i] = null;
            });
        }
    }

    fire(event: string) {
        if (this.events[event] != null) {
            this.events[event].forEach((cb: EventCallback) => {
                if (typeof cb === 'function') cb(this.key);
            });
        }
    }
}