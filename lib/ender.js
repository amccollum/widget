var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
(function($) {
  var Widget, bridge, empty, remove, replaceWith, triggerRemoveEvent, widget, _ref;
  _ref = $(''), empty = _ref.empty, remove = _ref.remove, replaceWith = _ref.replaceWith;
  triggerRemoveEvent = function(els) {
    els.deepEach(function(el) {
      $(el).trigger('remove').unbind();
    });
  };
  $.ender({
    empty: function() {
      triggerRemoveEvent(this.children());
      return empty.apply(this, arguments);
    },
    remove: function() {
      triggerRemoveEvent(this);
      return remove.apply(this, arguments);
    },
    replaceWith: function() {
      triggerRemoveEvent(this);
      return replaceWith.apply(this, arguments);
    }
  }, true);
  Widget = require('widget').Widget;
  widget = function(name, base, prototype) {
    var fullname, namespace, _ref2;
    fullname = name.replace('.', '-');
    _ref2 = name.split('.'), namespace = _ref2[0], name = _ref2[1];
    if (!prototype) {
      prototype = base;
      base = Widget;
    }
    $[namespace] || ($[namespace] = {});
    $[namespace][name] = (function() {
      var name;
      __extends(_Class, base);
      function _Class() {
        _Class.__super__.constructor.apply(this, arguments);
      }
      _Class.prototype.namespace = namespace;
      _Class.prototype.name = name;
      _Class.prototype.options = {};
      for (name in base.options) {
        _Class.prototype.options[name] = base.options[name];
      }
      for (name in prototype) {
        if (!__hasProp.call(prototype, name)) continue;
        _Class.prototype[name] = prototype[name];
      }
      _Class.prototype.widgetName = _Class.prototype.name;
      _Class.prototype.widgetBaseClass = fullname;
      _Class.prototype._super = function(method) {
        return this.__super__[method].apply(this, Array.prototype.slice.call(arguments, 1));
      };
      _Class.prototype._superApply = function(method, args) {
        return this.__super__[method].apply(this, args);
      };
      return _Class;
    })();
    if ($.pseudos) {
      $.pseudos[fullname] = function(el) {
        return !!$(el).data(name);
      };
    }
    return bridge(name, $[namespace][name]);
  };
  bridge = function(name, object) {
    var methods;
    methods = {};
    methods[name] = function(options) {
      var args;
      args = Array.prototype.slice.call(arguments, 1);
      this.each(function() {
        var instance, method, result;
        instance = $(this).data(name);
        if (typeof options === 'string') {
          method = options;
          if (!instance) {
            throw Error("Widget not initialized: " + name);
          }
          if (!instance[method]) {
            throw Error("Method does not exist: " + method);
          }
          return result = instance[method].apply(instance, args);
        } else {
          if (instance) {
            return instance.option(options || {}).init();
          } else {
            return new object(options, this);
          }
        }
      });
      return result;
    };
    $.ender(methods, true);
  };
  $.ender({
    widget: widget,
    Widget: Widget
  });
  $.ender({
    bridge: bridge
  }, true);
})(ender);