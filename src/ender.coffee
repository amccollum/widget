(($) ->
    # Overwrite bonzo's removal methods to fire an event on removal, and also unbind event handlers
    {empty, remove, replaceWith} = $('')
    
    triggerRemoveEvent = (els) ->
        els.deepEach (el) ->
            $(el).trigger('remove').unbind()
            return

        return
    
    $.ender({
        empty: () ->
            triggerRemoveEvent(this.children())
            return empty.apply(this, arguments)
        
        remove: () ->
            triggerRemoveEvent(this)
            return remove.apply(this, arguments)
            
        replaceWith: () ->
            triggerRemoveEvent(this)
            return replaceWith.apply(this, arguments)
            
    }, true)
        
    
    Widget = require('widget').Widget
    
    widget = (name, base, prototype) ->
        fullname = name.replace('.', '-')
        [namespace, name] = name.split('.')

        if not prototype
            prototype = base
            base = Widget
        
        $[namespace] or= {}
        $[namespace][name] = class extends base
            namespace: namespace
            name: name
            @::options = {}
            for name of base.options
                @::options[name] = base.options[name]
                
            for own name of prototype
                @::[name] = prototype[name]
            
            # jQuery compatibility
            widgetName: @::name
            widgetBaseClass: fullname

            _super: (method) ->
                @__super__[method].apply(this, Array.prototype.slice.call(arguments, 1))

            _superApply: (method, args) ->
                @__super__[method].apply(this, args)
                
        # Create pseudo-selector for widget
        if $.pseudos
            $.pseudos[fullname] = (el) -> !!$(el).data(name)
        
        bridge(name, $[namespace][name])

    bridge = (name, object) ->
        methods = {}
        methods[name] = (options) ->
            args = Array.prototype.slice.call(arguments, 1)
            
            @each () ->
                instance = $(this).data(name)

                # Method Call
                if typeof options is 'string'
                    method = options
                
                    if not instance
                        throw Error("Widget not initialized: #{name}")
                    if not instance[method]
                        throw Error("Method does not exist: #{method}")
                
                    result = instance[method].apply(instance, args)
                else
                    if instance
                        instance.option(options || {}).init()
                    else
                        new object(options, this)
                        
            return result

        $.ender(methods, true)
        return
        
    $.ender({ widget: widget, Widget: Widget })
    $.ender({ bridge: bridge }, true)
    
    return
)(ender)