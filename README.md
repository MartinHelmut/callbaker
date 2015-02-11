# CallBaker

Event system based on data attributes. Register and listen to element bound 
functions and trigger custom event types.

## Usage

Include the *callbaker* script in your page. Set some data attributes **you** 
like. The event names are in your hand except the prefix `data-cb-`. E.g.:

```html
<div id="my-element" data-cb-toggle></div>
```

Now register the element in your application:

```javascript
var myElement = document.getElementById('my-element');
var event = callbaker.register(myElement);
```

The **return value** is an special event object. You can now use it to trigger 
the event itself.

```javascript
event.trigger('toggle');
```

In another part of your application is the listener defined. Use the callbaker 
`on` method:

```javascript
callbaker.on(myElement, 'toggle', function (event) {
    // ...
});
```

## Register

If you register an event you can pass additional parameters.

```javascript
var event = callbaker.register(myElement, {
    key: 'Hello World'
});
```

They are accessible through the event objects `params`.

```javascript
event.params.key; // 'Hello World'

callbaker.on(myElement, 'toggle', function (event) {
    event.params.key; // 'Hello World'
});
```

## Event object

The event object has some base properties to use:

* `event.target`
* `event.params`
* `event.registry`

### target

**Return type** Node

The DOM node the event is registered for.

### params

**Return type** Object

The custom parameter object.

### registry

**Return type** Array

An array with all registered element events as string.
