/**
 * Callback for an event
 * 
 * @export
 * @interface EventCallback
 */
export interface EventCallback {
    (key: any)
}

/**
 * Handles events
 * 
 * @export
 * @class EventHandler
 */
export class EventHandler {
    /**
     * Collection of event callbacks. The event name is the key
     * 
     * @private
     * @type {EventCallback[]}
     * @memberOf EventHandler
     */
    private events: EventCallback[] = [];

    /**
     * Creates an instance of EventHandler.
     * @param {*} [type=null] Type of object
     * 
     * @memberOf EventHandler
     */
    constructor(public type: any = null) { }

    /**
     * Register an event
     * 
     * @param {string} event Event name
     * @param {EventCallback} callback Callback to invoke
     * 
     * @memberOf EventHandler
     */
    register(event: string, callback: EventCallback) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(callback);
    }

    /**
     * Remove a callback for an event
     * 
     * @param {string} event Event name
     * @param {EventCallback} callback Callback to remove
     * 
     * @memberOf EventHandler
     */
    unregister(event: string, callback: EventCallback) {
        if (this.events[event] != null) {
            this.events[event].forEach((cb: EventCallback, i: number) => {
                if (cb === callback) this.events[event][i] = null;
            });
        }
    }

    /**
     * Invoke callbacks for an event
     * 
     * @param {string} event Event name
     * 
     * @memberOf EventHandler
     */
    fire(event: string) {
        if (this.events[event] != null) {
            this.events[event].forEach((cb: EventCallback) => {
                if (typeof cb === 'function') cb(this.type);
            });
        }
    }
}