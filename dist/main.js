// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.createElement = function (tagName) {
  return document.createElement(tagName);
};

exports.id = function (_id) {
  return document.getElementById(_id);
};

exports.querySelector = function (query) {
  return document.querySelector(query);
};

exports.addKeyboardShortcut = function (trigger, callback) {
  document.addEventListener('keyup', function (_a) {
    var key = _a.key;
    if (key === trigger) callback();
  });
};
},{}],"constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  INIT_STRING: "#include <stdio.h>\nint main() {\n    \n}",
  supportFonts: "'D2Coding ligature', D2Coding, monospace",
  id: {
    toggleButton: 'edit_area_toggle_checkbox_source'
  }
};
},{}],"createEditor.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, syncElement, config) {
  var ace = window.ace;
  var editor = ace.edit(element);

  ace.require('ace/ext/language_tools');

  editor.setTheme("ace/theme/" + config.theme);
  editor.getSession().setMode('ace/mode/c_cpp');
  editor.getSession().on('change', function () {
    return syncElement.value = editor.getValue();
  });
  editor.setOptions(config);
  return editor;
};
},{}],"minify.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils"); // returns true if current language is selected to C/C++, else false


var isCurrentLangC = function isCurrentLangC() {
  var languageElement = utils_1.querySelector('#language'); // parseInt is way faster then toString

  return [0, 1].includes(parseInt(languageElement.value));
}; // minify current code


exports.onRunMinify = function (editor) {
  if (!isCurrentLangC()) {
    alert('현재는 C/C++만 지원합니다.');
    return;
  }

  var currentLines = editor.getValue().split('\n').map(function (line) {
    // minify code like `for(i = 1; i<=5; i++) {` to `for(i=1;i<=5;i++){`
    return line.replace(/([ \t]+(?=[,;=(){}]))|(?<=([,;=(){}]))[ \t]/g, '').trim();
  }); // split current lines of code

  var getSplitCode = function getSplitCode(lines) {
    return lines.reduce(function (result, line) {
      // check for preprocessors
      line.startsWith('#') ? result[0].push(line) : result[1].push(line);
      return result;
    }, [[], []]);
  };

  var _a = getSplitCode(currentLines),
      preprocessors = _a[0],
      otherCode = _a[1];

  var result = preprocessors.join('\n') + "\n" + otherCode.join('');
  editor.setValue(result);
};
},{"./utils":"utils.ts"}],"shortcuts.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var minify_1 = require("./minify");

var utils_1 = require("./utils");

exports.submitWith = function (trigger) {
  utils_1.addKeyboardShortcut(trigger, utils_1.querySelector('#Submit').click);
};

exports.minifyWith = function (trigger, editor) {
  utils_1.addKeyboardShortcut(trigger, function () {
    return minify_1.onRunMinify(editor);
  });
};
},{"./minify":"minify.ts","./utils":"utils.ts"}],"getProblemInformation.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var infoPage, _a, _b, infoElement;

    var _c;

    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          _b = (_a = new DOMParser()).parseFromString;
          return [4
          /*yield*/
          , fetch(location.href.replace('submitpage', 'problem'))];

        case 1:
          return [4
          /*yield*/
          , _d.sent().text()];

        case 2:
          infoPage = _b.apply(_a, [_d.sent(), 'text/html']);
          infoElement = infoPage.querySelector('body > div > div > div:nth-child(4)');
          return [2
          /*return*/
          , (_c = infoElement) === null || _c === void 0 ? void 0 : _c.innerText];
      }
    });
  });
};
},{}],"main.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

var constants_1 = __importDefault(require("./constants"));

var createEditor_1 = __importDefault(require("./createEditor"));

var shortcuts_1 = require("./shortcuts");

var getProblemInformation_1 = __importDefault(require("./getProblemInformation"));

chrome.storage.sync.get('codegen-ace', function (_a) {
  var _config = _a["codegen-ace"];

  var config = function () {
    try {
      return JSON.parse(_config);
    } catch (_) {
      return {
        enable: true,
        theme: 'ace/theme/monokai',
        'font-family': '',
        'font-size': 18,
        custom: ''
      };
    }
  }();

  if (!config.enable) return;
  document.body.classList.add('ace'); // declaring basic elements from exist DOM

  var rawEditor = utils_1.id('source');
  var br = utils_1.querySelector('#language+br'); // setting ace editor

  var editorElement = utils_1.createElement('textarea');
  br.after(editorElement);
  var fontSize = config["font-size"],
      theme = config.theme,
      fontFamily = config["font-family"],
      custom = config.custom,
      width = config["editor-width"],
      height = config["editor-height"],
      autoinject = config.autoinject;
  console.log(config);
  var editor = createEditor_1.default(editorElement, rawEditor, __assign(__assign({
    fontFamily: constants_1.default.supportFonts,
    fontSize: '18px',
    enableSnippets: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
  }, {
    fontFamily: fontFamily,
    fontSize: fontSize + "px",
    theme: theme
  }), custom && JSON.parse(custom))); // append custom style

  var customStyles = document.createElement('style');
  customStyles.appendChild(document.createTextNode("\n            .ace .ace_editor {\n                height: " + height + "px;\n                width: " + width + "px;\n            }\n            "));
  document.body.append(customStyles); // display problem information

  getProblemInformation_1.default().then(function (info) {
    if (!info) return;
    br.after(document.createTextNode(info));
  });
  var off = setInterval(function () {
    if (!(utils_1.id('frame_source') && utils_1.id('source'))) return;
    clearInterval(off);
    utils_1.id(constants_1.default.id.toggleButton).click();
    var beforeValue = utils_1.id('source').value;

    if (beforeValue) {
      editor.setValue(beforeValue);
    } else if (autoinject) {
      editor.setValue(constants_1.default.INIT_STRING);
    }
  }, 1000);
  shortcuts_1.minifyWith('F8', editor);
}); // Auto Enable Ace editor
// set submit shortcut

shortcuts_1.submitWith('F9'); // get problem information from before page
},{"./utils":"utils.ts","./constants":"constants.ts","./createEditor":"createEditor.ts","./shortcuts":"shortcuts.ts","./getProblemInformation":"getProblemInformation.ts"}],"C:/Users/react/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64734" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/react/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.js.map