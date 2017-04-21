import { EventHandler, EventCallback } from "./EventHandler";

export class $events {
    static $eventHandlers: EventHandler[] = [];
    private $eventHandler: EventHandler;

    constructor(key: string = null) {
        this.$eventHandler = new EventHandler(key);
        $events.$eventHandlers.push(this.$eventHandler);
    }

    static $broadcast(event) {
        $events.$eventHandlers.forEach((handler: EventHandler) => {
            handler.fire(event);
        });
    }

    static $broadcastTo(event: string, key: any) {
        $events.$eventHandlers.forEach((handler: EventHandler) => {
            if (handler.key === key) {
                handler.fire(event);
            }
        });
    }

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

    $emit(event: string) {
        this.$eventHandler.fire(event);
    }

    $on(event: string, callback: EventCallback) {
        this.$eventHandler.register(event, callback);
    }

    $once(event: string, callback: EventCallback) {
        var cb: EventCallback = (key: string) => {
            callback(key);
            this.$remove(event, cb);
        };
        this.$on(event, cb);
    }

    $destroy() {
        var newHandler = new EventHandler();
        $events.$eventHandlers.forEach((handler: EventHandler, i: number) => {
            if (handler === this.$eventHandler) {
                $events.$eventHandlers[i] = newHandler;
            }
        })
        this.$eventHandler = newHandler;
    }

    $remove(event: string, callback: EventCallback) {
        this.$eventHandler.unregister(event, callback);
    }
}