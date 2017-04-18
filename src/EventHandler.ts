export class EventHandler {
    public events: (() => void)[] = [];

    register(evt: string, callback: () => void) {
        this.events[evt] = this.events[evt] || [];
        this.events[evt] = callback;
    }

    unregister(evt: string, callback: () => void) {
        if (this.events[evt] != null) {
            this.events[evt].forEach((cb: () => void, i: number) => {
                if (cb === callback) this.events[evt][i] = null;
            });
        }
    }

    fire(evt: string) {
        if (this.events[evt] != null) {
            this.events[evt].forEach((cb: () => void) => {
                if (typeof cb === 'function') cb();
            });
        }
    }
}