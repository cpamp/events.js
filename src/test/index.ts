import { $events } from "../events";

function testObject() {
    $events.call(this);
    this.$events = new $events();
}
$events.$extend(testObject);

class another extends $events {}

var t = new testObject();
var a = new another();

a.$on('test', () => {
    console.log('test2.0');
});

t.$events.$on("test", () => {
    console.log("test");
});

t.$events.$on('world', () => {
    console.log('world');
});

t.$on('inheritance', () => {
    console.log('inheritance');
});

t.$events.$once("test", () => {
    console.log("once");
});

$events.$broadcast("test");
$events.$broadcast("test");
t.$emit('inheritance');
t.$events.$emit("test");
t.$events.$emit('world');

t.$events.$destroy();

$events.$broadcast("test");