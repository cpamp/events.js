import { $events } from "../events";

class testObject {
    public $events = new $events();
}

var t = new testObject();

t.$events.$on("test", () => {
    console.log("test");
})

t.$events.$once("test", () => {
    console.log("once");
});

$events.$broadcast("test");
$events.$broadcast("test");

t.$events.$destroy();

$events.$broadcast("test");