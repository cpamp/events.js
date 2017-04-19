import { EventHandler, EventCallback } from "./EventHandler";

export class $event {
    static $eventHandlers: EventHandler[] = [];
    private $eventHandler: EventHandler = new EventHandler();

    constructor() {
        $event.$eventHandlers.push(this.$eventHandler);
    }

    static $broadcast(evt) {
        $event.$eventHandlers.forEach((handler: EventHandler) => {
            handler.fire(evt);
        });
    }

    $emit(evt: string) {
        this.$eventHandler.fire(evt);
    }

    $on(evt: string, callback: EventCallback) {
        this.$eventHandler.register(evt, callback);
    }

    $once(evt: string, callback: EventCallback) {
        var cb: EventCallback = () => {
            callback();
            this.$eventHandler.unregister(evt, cb);
        };
        this.$on(evt, cb);
    }
}