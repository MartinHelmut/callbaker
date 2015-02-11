/*jslint browser:true */

/**
 * CallBaker
 *
 * Event system based on data attributes. Register and listen to element bound
 * functions and trigger custom event types.
 *
 * @author: Martin Helmut Fieber <info@martin-fieber.de>
 */
(function (window) {
    'use strict';

    var callbaker = {
        registry: []
    };

    function registryFindEntry(element, eventType) {
        var i = 0;
        for (i = callbaker.registry.length - 1; i >= 0; i -= 1) {
            if (callbaker.registry[i].target === element && callbaker.registry[i].type === eventType) {
                return callbaker.registry[i];
            }
        }
        return null;
    }

    /**
     * Create event object from element
     *
     * @param {Node}   element DOM node
     * @param {Object} params  Event parameter
     */
    function Event(element, params) {
        this.target = element;
        this.params = params;
        // Get all events by data attribute
        this.registry = (function () {
            var attributes = element.attributes,
                events = [],
                match,
                i = 0;
            for (i = attributes.length - 1; i >= 0; i -= 1) {
                match = /data-cb-([a-z]+)/i.exec(attributes[i].nodeName);
                if (!!match) {
                    events.push(match[1]);
                }
            }
            return events;
        }());
    }

    /**
     * Trigger event type
     *
     * @param {String} eventType Event type name
     */
    Event.prototype.trigger = function (eventType) {
        var entry = registryFindEntry(this.target, eventType);
        if (!!entry && !!entry.callback && typeof entry.callback === 'function') {
            entry.callback(this);
        }
    };

    /**
     * Register callback event
     *
     * @param  {Node}     element DOM node
     * @param  {Object}   params  Optional event parameter
     * @return {Function}         Event object
     */
    callbaker.register = function (element, params) {
        params = params || {};
        return new Event(element, params);
    };

    /**
     * Listen to custom event
     *
     * @param {Node}     element   DOM node
     * @param {String}   eventType Custom event type to listen to
     * @param {Function} callback  Executable callback
     */
    callbaker.on = function (element, eventType, callback) {
        var entry = registryFindEntry(element, eventType);
        if (!!entry) {
            return;
        }
        this.registry.push({
            target: element,
            type: eventType,
            callback: callback
        });
    };

    // Add to global scope
    window.callbaker = callbaker;

}(window));
