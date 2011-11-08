widget
======

This module is a very loose interpretation of the jQuery UI widget pattern for Ender,
with the minimalist goals of Backbone's View object mixed in. Here are some of the
features of the library:

* Inheritable widgets that bind to a particular DOM element
* Handling of default options
* Widget cleanup when the element is removed from the DOM through the .destroy() method
    
There are some notable differences from the jQuery UI widget class:

* Widgets are instantiated from classes rather than with a _createWidget method
* Widgets do not handle enabling / disabling the element or hovering

Things that don't exist now, but may be added in the future:

* Better event handling / namespacing

    
Ender
-----
After you install [Ender](http://ender.no.de), include `widget` in your package:

    ender add widget

Usage
-----
There are two ways to create widgets. The first is to use the $.widget method, ala jQuery UI:

```js
$.widget('MyNamespace.MyWidget', {
    options: {
        // Default options...
    },
    
    init: function () {
        // Initialize widget
    },
    
    destroy: function () {
        // Destroy the widget
        this.__super__.destroy();  // Or: this._super('destroy')
    }
}
```

The alternative way is to just inherit directly from the $.Widget class. This makes the most sense
if you are using, e.g., CoffeeScript:

```CoffeeScript
class MyWidget extends $.Widget
    options: {
        # Default options
    }
    
    init: ->
        # Initialize the widget
        
    destroy: ->
        # Destroy the widget
        super()
```

If you use the first method, your widget will be added to the $ object:

```js
$.MyNamespace.MyWidget(options, el)
$(el).MyWidget(options)
```

If you're using the second method, you'll need to instantiate the widget directly.
