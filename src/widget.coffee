((widget) ->
    class widget.Widget
        name: "widget"
        defaultElement: "<div></div>"
        options: {}

        constructor: (options, element) ->
            _options = {}
            for name of @options
                _options[name] = @options[name]
            
            for name of options
                _options[name] = options[name]
            
            @options = _options
            @el = @element = $(element or @options.el or @defaultElement)
            @el.data(@name, this)
            
            @create()
            @el.trigger 'create', this
            @el.bind 'remove', (event) =>
                @destroy() if event.target is @el
                    
            @init()

        $: (selector) -> $(selector, @el)

        create: ->
        init: ->
        destroy: -> @el.data(@name, undefined)

        # jQuery compatibility
        option: (key, value) ->
            if typeof key is 'string'
                return @options[key] if not value?
                options = { key: value }
            else
                options = key
            
            for key, value of options
                @options[key] = value

            return this

        widgetName: @::name
        _create: @::create
        _init: @::init
        _destroy: @::destroy
        _bind: @::bind
        _trigger: @::trigger

)(exports ? (@['widget'] = {}))
