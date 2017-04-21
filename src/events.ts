import { EventHandler, EventCallback } from "./EventHandler";

/**
 * Object for handling object and global events
 * 
 * @export
 * @class $events
 */
export class $events {
    static $eventHandlers: EventHandler[] = [];
    private $eventHandler: EventHandler;

    /**
     * Creates an instance of $events.
     * @param {string} [key=null] Key for object type
     * 
     * @memberOf $events
     */
    constructor(type: string = null) {
        this.$eventHandler = new EventHandler(type);
        $events.$eventHandlers.push(this.$eventHandler);
    }

    /**
     * Fire event for all $event objects
     * 
     * @static
     * @param {any} event Event name
     * 
     * @memberOf $events
     */
    static $broadcast(event) {
        $events.$eventHandlers.forEach((handler: EventHandler) => {
            handler.fire(event);
        });
    }

    /**
     * Fire event for all $event objects of a specific type
     * 
     * @static
     * @param {string} event Event name
     * @param {*} type Object type
     * 
     * @memberOf $events
     */
    static $broadcastTo(event: string, type: any) {
        $events.$eventHandlers.forEach((handler: EventHandler) => {
            if (handler.type === type) {
                handler.fire(event);
            }
        });
    }

    /**
     * Extend object prototype to be an $events
     * 
     * @static
     * @param {Function} obj Object to extend
     * 
     * @memberOf $events
     */
    static $extend(obj: Function) {
        if (typeof obj === 'function') {
            var proto = obj.prototype;
            obj.prototype = Object.create($events.prototype);
            for (var key in proto) {
                obj.prototype[key] = proto[key];
            }
            Object.defineProperty(obj.prototype, 'constructor', {
                enumerable: false,
                value: obj
            });
        }
    }

    /**
     * Emit an event to this object
     * 
     * @param {string} event Event name
     * 
     * @memberOf $events
     */
    $emit(event: string) {
        this.$eventHandler.fire(event);
    }

    /**
     * Add a callback to an event
     * 
     * @param {string} event Event name
     * @param {EventCallback} callback Callback to invoke
     * 
     * @memberOf $events
     */
    $on(event: string, callback: EventCallback) {
        this.$eventHandler.register(event, callback);
    }

    /**
     * Add a callback to an event that fires once
     * 
     * @param {string} event Event name
     * @param {EventCallback} callback Callback to invoke once
     * 
     * @memberOf $events
     */
    $once(event: string, callback: EventCallback) {
        var cb: EventCallback = (key: string) => {
            callback(key);
            this.$remove(event, cb);
        };
        this.$on(event, cb);
    }

    /**
     * Destroy all event listeners for this object
     * 
     * 
     * @memberOf $events
     */
    $destroy() {
        var newHandler = new EventHandler();
        $events.$eventHandlers.forEach((handler: EventHandler, i: number) => {
            if (handler === this.$eventHandler) {
                $events.$eventHandlers[i] = newHandler;
            }
        })
        this.$eventHandler = newHandler;
    }

    /**
     * Remove a specific callback for an event
     * 
     * @param {string} event Event name
     * @param {EventCallback} callback Callback to remove
     * 
     * @memberOf $events
     */
    $remove(event: string, callback: EventCallback) {
        this.$eventHandler.unregister(event, callback);
    }
}