import { EventHandler, EventCallback } from "./EventHandler";

export class $events {
    static $eventHandlers: EventHandler[] = [];
    private $eventHandler: EventHandler;

    constructor(key: string = null) {
        this.$eventHandler = new EventHandler(key);
        $events.$eventHandlers.push(this.$eventHandler);
    }

    static $broadcast(evt) {
        $events.$eventHandlers.forEach((handler: EventHandler) => {
            handler.fire(evt);
        });
    }

    static $broadcastTo(evt: string, key: any) {
        $events.$eventHandlers.forEach((handler: EventHandler) => {
            if (handler.key === key) {
                handler.fire(evt);
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

    $emit(evt: string) {
        this.$eventHandler.fire(evt);
    }

    $on(evt: string, callback: EventCallback) {
        this.$eventHandler.register(evt, callback);
    }

    $once(evt: string, callback: EventCallback) {
        var cb: EventCallback = (key: string) => {
            callback(key);
            this.$remove(evt, cb);
        };
        this.$on(evt, cb);
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

    $remove(evt: string, callback: EventCallback) {
        this.$eventHandler.unregister(evt, callback);
    }
}