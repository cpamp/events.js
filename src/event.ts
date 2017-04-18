import { EventHandler } from "./EventHandler";

export class $event {
    static $globalEventHandler: EventHandler = new EventHandler();
    private $eventHandler: EventHandler = new EventHandler();

    static $broadcast(evt) {
        $event.$globalEventHandler.fire(evt);
    }

    $emit(evt: string) {
        this.$eventHandler.fire(evt);
    }
}