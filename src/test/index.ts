import { $events } from "../events";

var testCb = (key) => {
    console.log(key + ' Testing');
};

function testObject() {
    $events.call(this, 'testObject');
    this.$events = new $events();
    this.$on('test', testCb);
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

$events.$broadcastTo('test', 'testObject');

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
t.$remove('test', testCb);

t.$events.$destroy();

$events.$broadcast("test");