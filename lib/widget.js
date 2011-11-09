var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
(function(widget) {
  return widget.Widget = (function() {
    Widget.prototype.name = "widget";
    Widget.prototype.defaultElement = "<div></div>";
    Widget.prototype.options = {};
    function Widget(options, element) {
      var name, _options;
      _options = {};
      for (name in this.options) {
        _options[name] = this.options[name];
      }
      for (name in options) {
        _options[name] = options[name];
      }
      this.options = _options;
      this.el = this.element = $(element || this.options.el || this.defaultElement);
      this.el.data(this.name, this);
      this.create();
      this.el.trigger('create', this);
      this.el.bind('remove', __bind(function(event) {
        if (event.target === this.el) {
          return this.destroy();
        }
      }, this));
      this.init();
    }
    Widget.prototype.$ = function(selector) {
      return $(selector, this.el);
    };
    Widget.prototype.create = function() {};
    Widget.prototype.init = function() {};
    Widget.prototype.destroy = function() {
      return this.el.data(this.name, void 0);
    };
    Widget.prototype.option = function(key, value) {
      var options;
      if (typeof key === 'string') {
        if (!(value != null)) {
          return this.options[key];
        }
        options = {
          key: value
        };
      } else {
        options = key;
      }
      for (key in options) {
        value = options[key];
        this.options[key] = value;
      }
      return this;
    };
    Widget.prototype.widgetName = Widget.prototype.name;
    Widget.prototype._create = Widget.prototype.create;
    Widget.prototype._init = Widget.prototype.init;
    Widget.prototype._destroy = Widget.prototype.destroy;
    Widget.prototype._bind = Widget.prototype.bind;
    Widget.prototype._trigger = Widget.prototype.trigger;
    return Widget;
  })();
})(typeof exports !== "undefined" && exports !== null ? exports : (this['widget'] = {}));