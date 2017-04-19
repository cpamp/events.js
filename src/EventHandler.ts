export interface EventCallback {
    ()
}

export class EventHandler {
    public events: (() => void)[] = [];

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
                if (typeof cb === 'function') cb();
            });
        }
    }
}