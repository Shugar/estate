(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("index.static.jade", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("<!DOCTYPE html>\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n  <title>Sunroof</title>\n  <meta name=\"viewport\" content=\"width=device-width\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n  <link rel=\"stylesheet\" href=\"stylesheets/app.css\">\n  <link rel=\"icon\" href=\"images/favicon.png\">\n  <script src=\"javascripts/vendor.js\"></script>\n  <script src=\"javascripts/app.js\"></script>\n  <script>\n    require('scripts/initialize');\n    \n  </script>\n</head>\n<body>\n  <div class=\"head\">\n    <div class=\"container\">\n      <div class=\"nav\">\n        <div class=\"nav-item\"><a href=\"tel:78005553535\">+7 800 555-35-35</a><a href=\"mailto:estate-dev@slack.com\">estate-dev@slack.com</a></div>\n        <div class=\"nav-item\">\n          <div class=\"language\">EN</div>\n          <div class=\"login\">ВОЙТИ\n            <div class=\"login-icon\"></div>\n          </div>\n          <div class=\"rent\">СДАТЬ КВАРТИРУ</div>\n        </div>\n      </div>\n      <div class=\"logo\">\n        <div class=\"logo-image\"></div>ЭЛИТНАЯ НЕДВИЖИМОСТЬ\n      </div>\n      <div class=\"advanced\">\n        <div class=\"advanced-icon\"></div>РАСШИРЕННЫЙ ПОИСК\n      </div>\n    </div>\n  </div>\n  <div class=\"suggestions\">\n    <div class=\"container\">\n      <div class=\"title-component\">Лучшие предложения в Москве</div>\n      <div class=\"suggestions-list\">\n        <div class=\"suggestions-item\">\n          <div class=\"price\">200 000<span>₽</span></div>\n          <div class=\"rooms\">2 комнаты, 85м²</div>\n          <div class=\"image\"><img src=\"../images/suggest-1.png\"></div>\n          <div class=\"metro\">\n            <div class=\"station\">\n              <div class=\"station-icon\"></div>Войковская\n            </div>\n            <div class=\"color\"><img src=\"../images/metro-green.svg\"></div>\n          </div>\n        </div>\n        <div class=\"suggestions-item\">\n          <div class=\"price\">250 000<span>₽</span></div>\n          <div class=\"rooms\">3 комнаты, 126м²</div>\n          <div class=\"image\"><img src=\"../images/suggest-2.png\"></div>\n          <div class=\"metro\">\n            <div class=\"station\">\n              <div class=\"station-icon\"></div>Охотный ряд\n            </div>\n            <div class=\"color\"><img src=\"../images/metro-red.svg\"></div>\n          </div>\n        </div>\n        <div class=\"suggestions-item\">\n          <div class=\"price\">350 000<span>₽</span></div>\n          <div class=\"rooms\">5 комнаты, 236м²</div>\n          <div class=\"image\"><img src=\"../images/suggest-3.png\"></div>\n          <div class=\"metro\">\n            <div class=\"station\">\n              <div class=\"station-icon\"></div>Выставочная\n            </div>\n            <div class=\"color\"><img src=\"../images/metro-blue.svg\"></div>\n          </div>\n        </div>\n      </div>\n      <div class=\"suggestions-more\">СМОТРЕТЬ ВСЕ 234 ПРЕДЛОЖЕНИЯ</div>\n    </div>\n  </div>\n  <div class=\"how\">\n    <div class=\"container\">\n      <div class=\"title-component\">Как мы работаем</div>\n      <div class=\"how-item\">\n        <div class=\"how-info\">\n          <div class=\"title\">ПОИСК КВАРТИРЫ</div>\n          <div class=\"text\">Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.</div>\n        </div>\n        <div class=\"how-image\"><img src=\"../images/how-1.png\"></div>\n      </div>\n      <div class=\"how-item how-itemMiddle\">\n        <div class=\"how-image\"><img src=\"../images/how-1.png\"></div>\n        <div class=\"how-info\">\n          <div class=\"title\">ПОИСК КЛИЕНТА</div>\n          <div class=\"text\">Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.</div>\n        </div>\n      </div>\n      <div class=\"how-item\">\n        <div class=\"how-info\">\n          <div class=\"title\">РАБОТА С ЗАЯВКАМИ</div>\n          <div class=\"text\">Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.</div>\n        </div>\n        <div class=\"how-image\"><img src=\"../images/how-1.png\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"complex\">\n    <div class=\"container\">\n      <div class=\"title-component\">Элитные жилые комплексы</div>\n      <div class=\"complex-item\">\n        <div class=\"complex-text\">Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.\n          <div class=\"suggestions\">СМОТРЕТЬ ВСЕ ПРЕДЛОЖЕНИЯ</div>\n        </div>\n        <div class=\"complex-image\"><img src=\"../images/complex.png\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"additional\">\n    <div class=\"container\">\n      <div class=\"title-component\">Дополнительные услуги</div>\n      <div class=\"additional-item\">\n        <div class=\"text\">Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.</div>\n        <div class=\"image\"><img src=\"../images/additional.png\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"footer\">\n    <div class=\"container\">\n      <div class=\"nav\"><a href=\"/\" class=\"nav-item\">ГЛАВНАЯ</a><a href=\"/\" class=\"nav-item\">СДАМ</a><a href=\"/\" class=\"nav-item\">ПРОДАМ</a><a href=\"/\" class=\"nav-item\">КУПЛЮ</a><a href=\"/\" class=\"nav-item\">СНИМУ</a><a href=\"/\" class=\"nav-item\">БЛОГ</a><a href=\"/\" class=\"nav-item\">ЧАСТЫЕ ВОПРОСЫ</a><a href=\"/\" class=\"nav-item\">СОГЛАШЕНИЕ О КОНФИДЕНЦИАЛЬНОСТИ</a></div>\n      <div class=\"info\">\n        <div class=\"email-and-phone\"><a href=\"tel:78005553535\" class=\"phone\">+7 800 555-35-35</a><a href=\"mailto:estate-dev@slack.com\" class=\"email\">estate-dev@slack.com</a></div>\n        <div class=\"socials\"><a href=\"vk.com\" class=\"vk\"></a><a href=\"facebook.com\" class=\"fb\"></a><a href=\"instagram.com\" class=\"ig\"></a></div>\n      </div>\n    </div>\n  </div>\n</body>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=templates.js.map