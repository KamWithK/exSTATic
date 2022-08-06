(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/webextension-polyfill/dist/browser-polyfill.js
  var require_browser_polyfill = __commonJS({
    "node_modules/webextension-polyfill/dist/browser-polyfill.js"(exports, module) {
      (function(global, factory) {
        if (typeof define === "function" && define.amd) {
          define("webextension-polyfill", ["module"], factory);
        } else if (typeof exports !== "undefined") {
          factory(module);
        } else {
          var mod = {
            exports: {}
          };
          factory(mod);
          global.browser = mod.exports;
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports, function(module2) {
        "use strict";
        if (typeof globalThis != "object" || typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
          throw new Error("This script should only be loaded in a browser extension.");
        }
        if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
          const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
          const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)";
          const wrapAPIs = (extensionAPIs) => {
            const apiMetadata = {
              "alarms": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "clearAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "bookmarks": {
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getChildren": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getRecent": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getSubTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTree": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "browserAction": {
                "disable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "enable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "getBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "openPopup": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "browsingData": {
                "remove": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "removeCache": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCookies": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeDownloads": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFormData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeHistory": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeLocalStorage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePasswords": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePluginData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "settings": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "commands": {
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "contextMenus": {
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "cookies": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAllCookieStores": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "devtools": {
                "inspectedWindow": {
                  "eval": {
                    "minArgs": 1,
                    "maxArgs": 2,
                    "singleCallbackArg": false
                  }
                },
                "panels": {
                  "create": {
                    "minArgs": 3,
                    "maxArgs": 3,
                    "singleCallbackArg": true
                  },
                  "elements": {
                    "createSidebarPane": {
                      "minArgs": 1,
                      "maxArgs": 1
                    }
                  }
                }
              },
              "downloads": {
                "cancel": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "download": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "erase": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFileIcon": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "open": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "pause": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFile": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "resume": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "extension": {
                "isAllowedFileSchemeAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "isAllowedIncognitoAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "history": {
                "addUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "deleteRange": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getVisits": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "i18n": {
                "detectLanguage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAcceptLanguages": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "identity": {
                "launchWebAuthFlow": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "idle": {
                "queryState": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "management": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getSelf": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setEnabled": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "uninstallSelf": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "notifications": {
                "clear": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPermissionLevel": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "pageAction": {
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "hide": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "permissions": {
                "contains": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "request": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "runtime": {
                "getBackgroundPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPlatformInfo": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "openOptionsPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "requestUpdateCheck": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "sendMessage": {
                  "minArgs": 1,
                  "maxArgs": 3
                },
                "sendNativeMessage": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "setUninstallURL": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "sessions": {
                "getDevices": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getRecentlyClosed": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "restore": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "storage": {
                "local": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                },
                "managed": {
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  }
                },
                "sync": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              },
              "tabs": {
                "captureVisibleTab": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "detectLanguage": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "discard": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "duplicate": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "executeScript": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getZoom": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getZoomSettings": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goBack": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goForward": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "highlight": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "insertCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "query": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "reload": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "sendMessage": {
                  "minArgs": 2,
                  "maxArgs": 3
                },
                "setZoom": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "setZoomSettings": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "update": {
                  "minArgs": 1,
                  "maxArgs": 2
                }
              },
              "topSites": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "webNavigation": {
                "getAllFrames": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFrame": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "webRequest": {
                "handlerBehaviorChanged": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "windows": {
                "create": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getLastFocused": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              }
            };
            if (Object.keys(apiMetadata).length === 0) {
              throw new Error("api-metadata.json has not been included in browser-polyfill");
            }
            class DefaultWeakMap extends WeakMap {
              constructor(createItem, items = void 0) {
                super(items);
                this.createItem = createItem;
              }
              get(key) {
                if (!this.has(key)) {
                  this.set(key, this.createItem(key));
                }
                return super.get(key);
              }
            }
            const isThenable = (value) => {
              return value && typeof value === "object" && typeof value.then === "function";
            };
            const makeCallback = (promise, metadata) => {
              return (...callbackArgs) => {
                if (extensionAPIs.runtime.lastError) {
                  promise.reject(new Error(extensionAPIs.runtime.lastError.message));
                } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                  promise.resolve(callbackArgs[0]);
                } else {
                  promise.resolve(callbackArgs);
                }
              };
            };
            const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
            const wrapAsyncFunction = (name, metadata) => {
              return function asyncFunctionWrapper(target, ...args) {
                if (args.length < metadata.minArgs) {
                  throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                }
                if (args.length > metadata.maxArgs) {
                  throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                }
                return new Promise((resolve, reject) => {
                  if (metadata.fallbackToNoCallback) {
                    try {
                      target[name](...args, makeCallback({
                        resolve,
                        reject
                      }, metadata));
                    } catch (cbError) {
                      console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                      target[name](...args);
                      metadata.fallbackToNoCallback = false;
                      metadata.noCallback = true;
                      resolve();
                    }
                  } else if (metadata.noCallback) {
                    target[name](...args);
                    resolve();
                  } else {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  }
                });
              };
            };
            const wrapMethod = (target, method, wrapper) => {
              return new Proxy(method, {
                apply(targetMethod, thisObj, args) {
                  return wrapper.call(thisObj, target, ...args);
                }
              });
            };
            let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
            const wrapObject = (target, wrappers = {}, metadata = {}) => {
              let cache = /* @__PURE__ */ Object.create(null);
              let handlers = {
                has(proxyTarget2, prop) {
                  return prop in target || prop in cache;
                },
                get(proxyTarget2, prop, receiver) {
                  if (prop in cache) {
                    return cache[prop];
                  }
                  if (!(prop in target)) {
                    return void 0;
                  }
                  let value = target[prop];
                  if (typeof value === "function") {
                    if (typeof wrappers[prop] === "function") {
                      value = wrapMethod(target, target[prop], wrappers[prop]);
                    } else if (hasOwnProperty(metadata, prop)) {
                      let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                      value = wrapMethod(target, target[prop], wrapper);
                    } else {
                      value = value.bind(target);
                    }
                  } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                    value = wrapObject(value, wrappers[prop], metadata[prop]);
                  } else if (hasOwnProperty(metadata, "*")) {
                    value = wrapObject(value, wrappers[prop], metadata["*"]);
                  } else {
                    Object.defineProperty(cache, prop, {
                      configurable: true,
                      enumerable: true,
                      get() {
                        return target[prop];
                      },
                      set(value2) {
                        target[prop] = value2;
                      }
                    });
                    return value;
                  }
                  cache[prop] = value;
                  return value;
                },
                set(proxyTarget2, prop, value, receiver) {
                  if (prop in cache) {
                    cache[prop] = value;
                  } else {
                    target[prop] = value;
                  }
                  return true;
                },
                defineProperty(proxyTarget2, prop, desc) {
                  return Reflect.defineProperty(cache, prop, desc);
                },
                deleteProperty(proxyTarget2, prop) {
                  return Reflect.deleteProperty(cache, prop);
                }
              };
              let proxyTarget = Object.create(target);
              return new Proxy(proxyTarget, handlers);
            };
            const wrapEvent = (wrapperMap) => ({
              addListener(target, listener, ...args) {
                target.addListener(wrapperMap.get(listener), ...args);
              },
              hasListener(target, listener) {
                return target.hasListener(wrapperMap.get(listener));
              },
              removeListener(target, listener) {
                target.removeListener(wrapperMap.get(listener));
              }
            });
            const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onRequestFinished(req) {
                const wrappedReq = wrapObject(req, {}, {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
                listener(wrappedReq);
              };
            });
            let loggedSendResponseDeprecationWarning = false;
            const onMessageWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onMessage(message, sender, sendResponse) {
                let didCallSendResponse = false;
                let wrappedSendResponse;
                let sendResponsePromise = new Promise((resolve) => {
                  wrappedSendResponse = function(response) {
                    if (!loggedSendResponseDeprecationWarning) {
                      console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                      loggedSendResponseDeprecationWarning = true;
                    }
                    didCallSendResponse = true;
                    resolve(response);
                  };
                });
                let result;
                try {
                  result = listener(message, sender, wrappedSendResponse);
                } catch (err) {
                  result = Promise.reject(err);
                }
                const isResultThenable = result !== true && isThenable(result);
                if (result !== true && !isResultThenable && !didCallSendResponse) {
                  return false;
                }
                const sendPromisedResult = (promise) => {
                  promise.then((msg) => {
                    sendResponse(msg);
                  }, (error) => {
                    let message2;
                    if (error && (error instanceof Error || typeof error.message === "string")) {
                      message2 = error.message;
                    } else {
                      message2 = "An unexpected error occurred";
                    }
                    sendResponse({
                      __mozWebExtensionPolyfillReject__: true,
                      message: message2
                    });
                  }).catch((err) => {
                    console.error("Failed to send onMessage rejected reply", err);
                  });
                };
                if (isResultThenable) {
                  sendPromisedResult(result);
                } else {
                  sendPromisedResult(sendResponsePromise);
                }
                return true;
              };
            });
            const wrappedSendMessageCallback = ({
              reject,
              resolve
            }, reply) => {
              if (extensionAPIs.runtime.lastError) {
                if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                  resolve();
                } else {
                  reject(new Error(extensionAPIs.runtime.lastError.message));
                }
              } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                reject(new Error(reply.message));
              } else {
                resolve(reply);
              }
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                const wrappedCb = wrappedSendMessageCallback.bind(null, {
                  resolve,
                  reject
                });
                args.push(wrappedCb);
                apiNamespaceObj.sendMessage(...args);
              });
            };
            const staticWrappers = {
              devtools: {
                network: {
                  onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                }
              },
              runtime: {
                onMessage: wrapEvent(onMessageWrappers),
                onMessageExternal: wrapEvent(onMessageWrappers),
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 1,
                  maxArgs: 3
                })
              },
              tabs: {
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 2,
                  maxArgs: 3
                })
              }
            };
            const settingMetadata = {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            };
            apiMetadata.privacy = {
              network: {
                "*": settingMetadata
              },
              services: {
                "*": settingMetadata
              },
              websites: {
                "*": settingMetadata
              }
            };
            return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
          };
          module2.exports = wrapAPIs(chrome);
        } else {
          module2.exports = globalThis.browser;
        }
      });
    }
  });

  // node_modules/papaparse/papaparse.min.js
  var require_papaparse_min = __commonJS({
    "node_modules/papaparse/papaparse.min.js"(exports, module) {
      !function(e, t) {
        typeof define == "function" && define.amd ? define([], t) : typeof module == "object" && typeof exports != "undefined" ? module.exports = t() : e.Papa = t();
      }(exports, function s() {
        "use strict";
        var f = typeof self != "undefined" ? self : typeof window != "undefined" ? window : f !== void 0 ? f : {};
        var n = !f.document && !!f.postMessage, o = n && /blob:/i.test((f.location || {}).protocol), a = {}, h = 0, b = { parse: function(e, t) {
          var i2 = (t = t || {}).dynamicTyping || false;
          M(i2) && (t.dynamicTypingFunction = i2, i2 = {});
          if (t.dynamicTyping = i2, t.transform = !!M(t.transform) && t.transform, t.worker && b.WORKERS_SUPPORTED) {
            var r = function() {
              if (!b.WORKERS_SUPPORTED)
                return false;
              var e2 = (i3 = f.URL || f.webkitURL || null, r2 = s.toString(), b.BLOB_URL || (b.BLOB_URL = i3.createObjectURL(new Blob(["(", r2, ")();"], { type: "text/javascript" })))), t2 = new f.Worker(e2);
              var i3, r2;
              return t2.onmessage = _, t2.id = h++, a[t2.id] = t2;
            }();
            return r.userStep = t.step, r.userChunk = t.chunk, r.userComplete = t.complete, r.userError = t.error, t.step = M(t.step), t.chunk = M(t.chunk), t.complete = M(t.complete), t.error = M(t.error), delete t.worker, void r.postMessage({ input: e, config: t, workerId: r.id });
          }
          var n2 = null;
          b.NODE_STREAM_INPUT, typeof e == "string" ? n2 = t.download ? new l(t) : new p(t) : e.readable === true && M(e.read) && M(e.on) ? n2 = new g(t) : (f.File && e instanceof File || e instanceof Object) && (n2 = new c(t));
          return n2.stream(e);
        }, unparse: function(e, t) {
          var n2 = false, _2 = true, m2 = ",", y2 = "\r\n", s2 = '"', a2 = s2 + s2, i2 = false, r = null, o2 = false;
          !function() {
            if (typeof t != "object")
              return;
            typeof t.delimiter != "string" || b.BAD_DELIMITERS.filter(function(e2) {
              return t.delimiter.indexOf(e2) !== -1;
            }).length || (m2 = t.delimiter);
            (typeof t.quotes == "boolean" || typeof t.quotes == "function" || Array.isArray(t.quotes)) && (n2 = t.quotes);
            typeof t.skipEmptyLines != "boolean" && typeof t.skipEmptyLines != "string" || (i2 = t.skipEmptyLines);
            typeof t.newline == "string" && (y2 = t.newline);
            typeof t.quoteChar == "string" && (s2 = t.quoteChar);
            typeof t.header == "boolean" && (_2 = t.header);
            if (Array.isArray(t.columns)) {
              if (t.columns.length === 0)
                throw new Error("Option columns is empty");
              r = t.columns;
            }
            t.escapeChar !== void 0 && (a2 = t.escapeChar + s2);
            (typeof t.escapeFormulae == "boolean" || t.escapeFormulae instanceof RegExp) && (o2 = t.escapeFormulae instanceof RegExp ? t.escapeFormulae : /^[=+\-@\t\r].*$/);
          }();
          var h2 = new RegExp(j(s2), "g");
          typeof e == "string" && (e = JSON.parse(e));
          if (Array.isArray(e)) {
            if (!e.length || Array.isArray(e[0]))
              return u2(null, e, i2);
            if (typeof e[0] == "object")
              return u2(r || Object.keys(e[0]), e, i2);
          } else if (typeof e == "object")
            return typeof e.data == "string" && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields || r), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : typeof e.data[0] == "object" ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || typeof e.data[0] == "object" || (e.data = [e.data])), u2(e.fields || [], e.data || [], i2);
          throw new Error("Unable to serialize unrecognized input");
          function u2(e2, t2, i3) {
            var r2 = "";
            typeof e2 == "string" && (e2 = JSON.parse(e2)), typeof t2 == "string" && (t2 = JSON.parse(t2));
            var n3 = Array.isArray(e2) && 0 < e2.length, s3 = !Array.isArray(t2[0]);
            if (n3 && _2) {
              for (var a3 = 0; a3 < e2.length; a3++)
                0 < a3 && (r2 += m2), r2 += v2(e2[a3], a3);
              0 < t2.length && (r2 += y2);
            }
            for (var o3 = 0; o3 < t2.length; o3++) {
              var h3 = n3 ? e2.length : t2[o3].length, u3 = false, f2 = n3 ? Object.keys(t2[o3]).length === 0 : t2[o3].length === 0;
              if (i3 && !n3 && (u3 = i3 === "greedy" ? t2[o3].join("").trim() === "" : t2[o3].length === 1 && t2[o3][0].length === 0), i3 === "greedy" && n3) {
                for (var d2 = [], l2 = 0; l2 < h3; l2++) {
                  var c2 = s3 ? e2[l2] : l2;
                  d2.push(t2[o3][c2]);
                }
                u3 = d2.join("").trim() === "";
              }
              if (!u3) {
                for (var p2 = 0; p2 < h3; p2++) {
                  0 < p2 && !f2 && (r2 += m2);
                  var g2 = n3 && s3 ? e2[p2] : p2;
                  r2 += v2(t2[o3][g2], p2);
                }
                o3 < t2.length - 1 && (!i3 || 0 < h3 && !f2) && (r2 += y2);
              }
            }
            return r2;
          }
          function v2(e2, t2) {
            if (e2 == null)
              return "";
            if (e2.constructor === Date)
              return JSON.stringify(e2).slice(1, 25);
            var i3 = false;
            o2 && typeof e2 == "string" && o2.test(e2) && (e2 = "'" + e2, i3 = true);
            var r2 = e2.toString().replace(h2, a2);
            return (i3 = i3 || n2 === true || typeof n2 == "function" && n2(e2, t2) || Array.isArray(n2) && n2[t2] || function(e3, t3) {
              for (var i4 = 0; i4 < t3.length; i4++)
                if (-1 < e3.indexOf(t3[i4]))
                  return true;
              return false;
            }(r2, b.BAD_DELIMITERS) || -1 < r2.indexOf(m2) || r2.charAt(0) === " " || r2.charAt(r2.length - 1) === " ") ? s2 + r2 + s2 : r2;
          }
        } };
        if (b.RECORD_SEP = String.fromCharCode(30), b.UNIT_SEP = String.fromCharCode(31), b.BYTE_ORDER_MARK = "\uFEFF", b.BAD_DELIMITERS = ["\r", "\n", '"', b.BYTE_ORDER_MARK], b.WORKERS_SUPPORTED = !n && !!f.Worker, b.NODE_STREAM_INPUT = 1, b.LocalChunkSize = 10485760, b.RemoteChunkSize = 5242880, b.DefaultDelimiter = ",", b.Parser = E, b.ParserHandle = i, b.NetworkStreamer = l, b.FileStreamer = c, b.StringStreamer = p, b.ReadableStreamStreamer = g, f.jQuery) {
          var d = f.jQuery;
          d.fn.parse = function(o2) {
            var i2 = o2.config || {}, h2 = [];
            return this.each(function(e2) {
              if (!(d(this).prop("tagName").toUpperCase() === "INPUT" && d(this).attr("type").toLowerCase() === "file" && f.FileReader) || !this.files || this.files.length === 0)
                return true;
              for (var t = 0; t < this.files.length; t++)
                h2.push({ file: this.files[t], inputElem: this, instanceConfig: d.extend({}, i2) });
            }), e(), this;
            function e() {
              if (h2.length !== 0) {
                var e2, t, i3, r, n2 = h2[0];
                if (M(o2.before)) {
                  var s2 = o2.before(n2.file, n2.inputElem);
                  if (typeof s2 == "object") {
                    if (s2.action === "abort")
                      return e2 = "AbortError", t = n2.file, i3 = n2.inputElem, r = s2.reason, void (M(o2.error) && o2.error({ name: e2 }, t, i3, r));
                    if (s2.action === "skip")
                      return void u2();
                    typeof s2.config == "object" && (n2.instanceConfig = d.extend(n2.instanceConfig, s2.config));
                  } else if (s2 === "skip")
                    return void u2();
                }
                var a2 = n2.instanceConfig.complete;
                n2.instanceConfig.complete = function(e3) {
                  M(a2) && a2(e3, n2.file, n2.inputElem), u2();
                }, b.parse(n2.file, n2.instanceConfig);
              } else
                M(o2.complete) && o2.complete();
            }
            function u2() {
              h2.splice(0, 1), e();
            }
          };
        }
        function u(e) {
          this._handle = null, this._finished = false, this._completed = false, this._halted = false, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = true, this._completeResults = { data: [], errors: [], meta: {} }, function(e2) {
            var t = w(e2);
            t.chunkSize = parseInt(t.chunkSize), e2.step || e2.chunk || (t.chunkSize = null);
            this._handle = new i(t), (this._handle.streamer = this)._config = t;
          }.call(this, e), this.parseChunk = function(e2, t) {
            if (this.isFirstChunk && M(this._config.beforeFirstChunk)) {
              var i2 = this._config.beforeFirstChunk(e2);
              i2 !== void 0 && (e2 = i2);
            }
            this.isFirstChunk = false, this._halted = false;
            var r = this._partialLine + e2;
            this._partialLine = "";
            var n2 = this._handle.parse(r, this._baseIndex, !this._finished);
            if (!this._handle.paused() && !this._handle.aborted()) {
              var s2 = n2.meta.cursor;
              this._finished || (this._partialLine = r.substring(s2 - this._baseIndex), this._baseIndex = s2), n2 && n2.data && (this._rowCount += n2.data.length);
              var a2 = this._finished || this._config.preview && this._rowCount >= this._config.preview;
              if (o)
                f.postMessage({ results: n2, workerId: b.WORKER_ID, finished: a2 });
              else if (M(this._config.chunk) && !t) {
                if (this._config.chunk(n2, this._handle), this._handle.paused() || this._handle.aborted())
                  return void (this._halted = true);
                n2 = void 0, this._completeResults = void 0;
              }
              return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(n2.data), this._completeResults.errors = this._completeResults.errors.concat(n2.errors), this._completeResults.meta = n2.meta), this._completed || !a2 || !M(this._config.complete) || n2 && n2.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = true), a2 || n2 && n2.meta.paused || this._nextChunk(), n2;
            }
            this._halted = true;
          }, this._sendError = function(e2) {
            M(this._config.error) ? this._config.error(e2) : o && this._config.error && f.postMessage({ workerId: b.WORKER_ID, error: e2, finished: false });
          };
        }
        function l(e) {
          var r;
          (e = e || {}).chunkSize || (e.chunkSize = b.RemoteChunkSize), u.call(this, e), this._nextChunk = n ? function() {
            this._readChunk(), this._chunkLoaded();
          } : function() {
            this._readChunk();
          }, this.stream = function(e2) {
            this._input = e2, this._nextChunk();
          }, this._readChunk = function() {
            if (this._finished)
              this._chunkLoaded();
            else {
              if (r = new XMLHttpRequest(), this._config.withCredentials && (r.withCredentials = this._config.withCredentials), n || (r.onload = v(this._chunkLoaded, this), r.onerror = v(this._chunkError, this)), r.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !n), this._config.downloadRequestHeaders) {
                var e2 = this._config.downloadRequestHeaders;
                for (var t in e2)
                  r.setRequestHeader(t, e2[t]);
              }
              if (this._config.chunkSize) {
                var i2 = this._start + this._config.chunkSize - 1;
                r.setRequestHeader("Range", "bytes=" + this._start + "-" + i2);
              }
              try {
                r.send(this._config.downloadRequestBody);
              } catch (e3) {
                this._chunkError(e3.message);
              }
              n && r.status === 0 && this._chunkError();
            }
          }, this._chunkLoaded = function() {
            r.readyState === 4 && (r.status < 200 || 400 <= r.status ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : r.responseText.length, this._finished = !this._config.chunkSize || this._start >= function(e2) {
              var t = e2.getResponseHeader("Content-Range");
              if (t === null)
                return -1;
              return parseInt(t.substring(t.lastIndexOf("/") + 1));
            }(r), this.parseChunk(r.responseText)));
          }, this._chunkError = function(e2) {
            var t = r.statusText || e2;
            this._sendError(new Error(t));
          };
        }
        function c(e) {
          var r, n2;
          (e = e || {}).chunkSize || (e.chunkSize = b.LocalChunkSize), u.call(this, e);
          var s2 = typeof FileReader != "undefined";
          this.stream = function(e2) {
            this._input = e2, n2 = e2.slice || e2.webkitSlice || e2.mozSlice, s2 ? ((r = new FileReader()).onload = v(this._chunkLoaded, this), r.onerror = v(this._chunkError, this)) : r = new FileReaderSync(), this._nextChunk();
          }, this._nextChunk = function() {
            this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
          }, this._readChunk = function() {
            var e2 = this._input;
            if (this._config.chunkSize) {
              var t = Math.min(this._start + this._config.chunkSize, this._input.size);
              e2 = n2.call(e2, this._start, t);
            }
            var i2 = r.readAsText(e2, this._config.encoding);
            s2 || this._chunkLoaded({ target: { result: i2 } });
          }, this._chunkLoaded = function(e2) {
            this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e2.target.result);
          }, this._chunkError = function() {
            this._sendError(r.error);
          };
        }
        function p(e) {
          var i2;
          u.call(this, e = e || {}), this.stream = function(e2) {
            return i2 = e2, this._nextChunk();
          }, this._nextChunk = function() {
            if (!this._finished) {
              var e2, t = this._config.chunkSize;
              return t ? (e2 = i2.substring(0, t), i2 = i2.substring(t)) : (e2 = i2, i2 = ""), this._finished = !i2, this.parseChunk(e2);
            }
          };
        }
        function g(e) {
          u.call(this, e = e || {});
          var t = [], i2 = true, r = false;
          this.pause = function() {
            u.prototype.pause.apply(this, arguments), this._input.pause();
          }, this.resume = function() {
            u.prototype.resume.apply(this, arguments), this._input.resume();
          }, this.stream = function(e2) {
            this._input = e2, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
          }, this._checkIsFinished = function() {
            r && t.length === 1 && (this._finished = true);
          }, this._nextChunk = function() {
            this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i2 = true;
          }, this._streamData = v(function(e2) {
            try {
              t.push(typeof e2 == "string" ? e2 : e2.toString(this._config.encoding)), i2 && (i2 = false, this._checkIsFinished(), this.parseChunk(t.shift()));
            } catch (e3) {
              this._streamError(e3);
            }
          }, this), this._streamError = v(function(e2) {
            this._streamCleanUp(), this._sendError(e2);
          }, this), this._streamEnd = v(function() {
            this._streamCleanUp(), r = true, this._streamData("");
          }, this), this._streamCleanUp = v(function() {
            this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
          }, this);
        }
        function i(m2) {
          var a2, o2, h2, r = Math.pow(2, 53), n2 = -r, s2 = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, u2 = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/, t = this, i2 = 0, f2 = 0, d2 = false, e = false, l2 = [], c2 = { data: [], errors: [], meta: {} };
          if (M(m2.step)) {
            var p2 = m2.step;
            m2.step = function(e2) {
              if (c2 = e2, _2())
                g2();
              else {
                if (g2(), c2.data.length === 0)
                  return;
                i2 += e2.data.length, m2.preview && i2 > m2.preview ? o2.abort() : (c2.data = c2.data[0], p2(c2, t));
              }
            };
          }
          function y2(e2) {
            return m2.skipEmptyLines === "greedy" ? e2.join("").trim() === "" : e2.length === 1 && e2[0].length === 0;
          }
          function g2() {
            return c2 && h2 && (k("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + b.DefaultDelimiter + "'"), h2 = false), m2.skipEmptyLines && (c2.data = c2.data.filter(function(e2) {
              return !y2(e2);
            })), _2() && function() {
              if (!c2)
                return;
              function e2(e3, t3) {
                M(m2.transformHeader) && (e3 = m2.transformHeader(e3, t3)), l2.push(e3);
              }
              if (Array.isArray(c2.data[0])) {
                for (var t2 = 0; _2() && t2 < c2.data.length; t2++)
                  c2.data[t2].forEach(e2);
                c2.data.splice(0, 1);
              } else
                c2.data.forEach(e2);
            }(), function() {
              if (!c2 || !m2.header && !m2.dynamicTyping && !m2.transform)
                return c2;
              function e2(e3, t3) {
                var i3, r2 = m2.header ? {} : [];
                for (i3 = 0; i3 < e3.length; i3++) {
                  var n3 = i3, s3 = e3[i3];
                  m2.header && (n3 = i3 >= l2.length ? "__parsed_extra" : l2[i3]), m2.transform && (s3 = m2.transform(s3, n3)), s3 = v2(n3, s3), n3 === "__parsed_extra" ? (r2[n3] = r2[n3] || [], r2[n3].push(s3)) : r2[n3] = s3;
                }
                return m2.header && (i3 > l2.length ? k("FieldMismatch", "TooManyFields", "Too many fields: expected " + l2.length + " fields but parsed " + i3, f2 + t3) : i3 < l2.length && k("FieldMismatch", "TooFewFields", "Too few fields: expected " + l2.length + " fields but parsed " + i3, f2 + t3)), r2;
              }
              var t2 = 1;
              !c2.data.length || Array.isArray(c2.data[0]) ? (c2.data = c2.data.map(e2), t2 = c2.data.length) : c2.data = e2(c2.data, 0);
              m2.header && c2.meta && (c2.meta.fields = l2);
              return f2 += t2, c2;
            }();
          }
          function _2() {
            return m2.header && l2.length === 0;
          }
          function v2(e2, t2) {
            return i3 = e2, m2.dynamicTypingFunction && m2.dynamicTyping[i3] === void 0 && (m2.dynamicTyping[i3] = m2.dynamicTypingFunction(i3)), (m2.dynamicTyping[i3] || m2.dynamicTyping) === true ? t2 === "true" || t2 === "TRUE" || t2 !== "false" && t2 !== "FALSE" && (function(e3) {
              if (s2.test(e3)) {
                var t3 = parseFloat(e3);
                if (n2 < t3 && t3 < r)
                  return true;
              }
              return false;
            }(t2) ? parseFloat(t2) : u2.test(t2) ? new Date(t2) : t2 === "" ? null : t2) : t2;
            var i3;
          }
          function k(e2, t2, i3, r2) {
            var n3 = { type: e2, code: t2, message: i3 };
            r2 !== void 0 && (n3.row = r2), c2.errors.push(n3);
          }
          this.parse = function(e2, t2, i3) {
            var r2 = m2.quoteChar || '"';
            if (m2.newline || (m2.newline = function(e3, t3) {
              e3 = e3.substring(0, 1048576);
              var i4 = new RegExp(j(t3) + "([^]*?)" + j(t3), "gm"), r3 = (e3 = e3.replace(i4, "")).split("\r"), n4 = e3.split("\n"), s4 = 1 < n4.length && n4[0].length < r3[0].length;
              if (r3.length === 1 || s4)
                return "\n";
              for (var a3 = 0, o3 = 0; o3 < r3.length; o3++)
                r3[o3][0] === "\n" && a3++;
              return a3 >= r3.length / 2 ? "\r\n" : "\r";
            }(e2, r2)), h2 = false, m2.delimiter)
              M(m2.delimiter) && (m2.delimiter = m2.delimiter(e2), c2.meta.delimiter = m2.delimiter);
            else {
              var n3 = function(e3, t3, i4, r3, n4) {
                var s4, a3, o3, h3;
                n4 = n4 || [",", "	", "|", ";", b.RECORD_SEP, b.UNIT_SEP];
                for (var u3 = 0; u3 < n4.length; u3++) {
                  var f3 = n4[u3], d3 = 0, l3 = 0, c3 = 0;
                  o3 = void 0;
                  for (var p3 = new E({ comments: r3, delimiter: f3, newline: t3, preview: 10 }).parse(e3), g3 = 0; g3 < p3.data.length; g3++)
                    if (i4 && y2(p3.data[g3]))
                      c3++;
                    else {
                      var _3 = p3.data[g3].length;
                      l3 += _3, o3 !== void 0 ? 0 < _3 && (d3 += Math.abs(_3 - o3), o3 = _3) : o3 = _3;
                    }
                  0 < p3.data.length && (l3 /= p3.data.length - c3), (a3 === void 0 || d3 <= a3) && (h3 === void 0 || h3 < l3) && 1.99 < l3 && (a3 = d3, s4 = f3, h3 = l3);
                }
                return { successful: !!(m2.delimiter = s4), bestDelimiter: s4 };
              }(e2, m2.newline, m2.skipEmptyLines, m2.comments, m2.delimitersToGuess);
              n3.successful ? m2.delimiter = n3.bestDelimiter : (h2 = true, m2.delimiter = b.DefaultDelimiter), c2.meta.delimiter = m2.delimiter;
            }
            var s3 = w(m2);
            return m2.preview && m2.header && s3.preview++, a2 = e2, o2 = new E(s3), c2 = o2.parse(a2, t2, i3), g2(), d2 ? { meta: { paused: true } } : c2 || { meta: { paused: false } };
          }, this.paused = function() {
            return d2;
          }, this.pause = function() {
            d2 = true, o2.abort(), a2 = M(m2.chunk) ? "" : a2.substring(o2.getCharIndex());
          }, this.resume = function() {
            t.streamer._halted ? (d2 = false, t.streamer.parseChunk(a2, true)) : setTimeout(t.resume, 3);
          }, this.aborted = function() {
            return e;
          }, this.abort = function() {
            e = true, o2.abort(), c2.meta.aborted = true, M(m2.complete) && m2.complete(c2), a2 = "";
          };
        }
        function j(e) {
          return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        function E(e) {
          var S, O = (e = e || {}).delimiter, x = e.newline, I = e.comments, T = e.step, D = e.preview, A = e.fastMode, L = S = e.quoteChar === void 0 || e.quoteChar === null ? '"' : e.quoteChar;
          if (e.escapeChar !== void 0 && (L = e.escapeChar), (typeof O != "string" || -1 < b.BAD_DELIMITERS.indexOf(O)) && (O = ","), I === O)
            throw new Error("Comment character same as delimiter");
          I === true ? I = "#" : (typeof I != "string" || -1 < b.BAD_DELIMITERS.indexOf(I)) && (I = false), x !== "\n" && x !== "\r" && x !== "\r\n" && (x = "\n");
          var F = 0, z = false;
          this.parse = function(r, t, i2) {
            if (typeof r != "string")
              throw new Error("Input must be a string");
            var n2 = r.length, e2 = O.length, s2 = x.length, a2 = I.length, o2 = M(T), h2 = [], u2 = [], f2 = [], d2 = F = 0;
            if (!r)
              return C();
            if (A || A !== false && r.indexOf(S) === -1) {
              for (var l2 = r.split(x), c2 = 0; c2 < l2.length; c2++) {
                if (f2 = l2[c2], F += f2.length, c2 !== l2.length - 1)
                  F += x.length;
                else if (i2)
                  return C();
                if (!I || f2.substring(0, a2) !== I) {
                  if (o2) {
                    if (h2 = [], k(f2.split(O)), R(), z)
                      return C();
                  } else
                    k(f2.split(O));
                  if (D && D <= c2)
                    return h2 = h2.slice(0, D), C(true);
                }
              }
              return C();
            }
            for (var p2 = r.indexOf(O, F), g2 = r.indexOf(x, F), _2 = new RegExp(j(L) + j(S), "g"), m2 = r.indexOf(S, F); ; )
              if (r[F] !== S)
                if (I && f2.length === 0 && r.substring(F, F + a2) === I) {
                  if (g2 === -1)
                    return C();
                  F = g2 + s2, g2 = r.indexOf(x, F), p2 = r.indexOf(O, F);
                } else if (p2 !== -1 && (p2 < g2 || g2 === -1))
                  f2.push(r.substring(F, p2)), F = p2 + e2, p2 = r.indexOf(O, F);
                else {
                  if (g2 === -1)
                    break;
                  if (f2.push(r.substring(F, g2)), w2(g2 + s2), o2 && (R(), z))
                    return C();
                  if (D && h2.length >= D)
                    return C(true);
                }
              else
                for (m2 = F, F++; ; ) {
                  if ((m2 = r.indexOf(S, m2 + 1)) === -1)
                    return i2 || u2.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: h2.length, index: F }), E2();
                  if (m2 === n2 - 1)
                    return E2(r.substring(F, m2).replace(_2, S));
                  if (S !== L || r[m2 + 1] !== L) {
                    if (S === L || m2 === 0 || r[m2 - 1] !== L) {
                      p2 !== -1 && p2 < m2 + 1 && (p2 = r.indexOf(O, m2 + 1)), g2 !== -1 && g2 < m2 + 1 && (g2 = r.indexOf(x, m2 + 1));
                      var y2 = b2(g2 === -1 ? p2 : Math.min(p2, g2));
                      if (r.substr(m2 + 1 + y2, e2) === O) {
                        f2.push(r.substring(F, m2).replace(_2, S)), r[F = m2 + 1 + y2 + e2] !== S && (m2 = r.indexOf(S, F)), p2 = r.indexOf(O, F), g2 = r.indexOf(x, F);
                        break;
                      }
                      var v2 = b2(g2);
                      if (r.substring(m2 + 1 + v2, m2 + 1 + v2 + s2) === x) {
                        if (f2.push(r.substring(F, m2).replace(_2, S)), w2(m2 + 1 + v2 + s2), p2 = r.indexOf(O, F), m2 = r.indexOf(S, F), o2 && (R(), z))
                          return C();
                        if (D && h2.length >= D)
                          return C(true);
                        break;
                      }
                      u2.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: h2.length, index: F }), m2++;
                    }
                  } else
                    m2++;
                }
            return E2();
            function k(e3) {
              h2.push(e3), d2 = F;
            }
            function b2(e3) {
              var t2 = 0;
              if (e3 !== -1) {
                var i3 = r.substring(m2 + 1, e3);
                i3 && i3.trim() === "" && (t2 = i3.length);
              }
              return t2;
            }
            function E2(e3) {
              return i2 || (e3 === void 0 && (e3 = r.substring(F)), f2.push(e3), F = n2, k(f2), o2 && R()), C();
            }
            function w2(e3) {
              F = e3, k(f2), f2 = [], g2 = r.indexOf(x, F);
            }
            function C(e3) {
              return { data: h2, errors: u2, meta: { delimiter: O, linebreak: x, aborted: z, truncated: !!e3, cursor: d2 + (t || 0) } };
            }
            function R() {
              T(C()), h2 = [], u2 = [];
            }
          }, this.abort = function() {
            z = true;
          }, this.getCharIndex = function() {
            return F;
          };
        }
        function _(e) {
          var t = e.data, i2 = a[t.workerId], r = false;
          if (t.error)
            i2.userError(t.error, t.file);
          else if (t.results && t.results.data) {
            var n2 = { abort: function() {
              r = true, m(t.workerId, { data: [], errors: [], meta: { aborted: true } });
            }, pause: y, resume: y };
            if (M(i2.userStep)) {
              for (var s2 = 0; s2 < t.results.data.length && (i2.userStep({ data: t.results.data[s2], errors: t.results.errors, meta: t.results.meta }, n2), !r); s2++)
                ;
              delete t.results;
            } else
              M(i2.userChunk) && (i2.userChunk(t.results, n2, t.file), delete t.results);
          }
          t.finished && !r && m(t.workerId, t.results);
        }
        function m(e, t) {
          var i2 = a[e];
          M(i2.userComplete) && i2.userComplete(t), i2.terminate(), delete a[e];
        }
        function y() {
          throw new Error("Not implemented.");
        }
        function w(e) {
          if (typeof e != "object" || e === null)
            return e;
          var t = Array.isArray(e) ? [] : {};
          for (var i2 in e)
            t[i2] = w(e[i2]);
          return t;
        }
        function v(e, t) {
          return function() {
            e.apply(t, arguments);
          };
        }
        function M(e) {
          return typeof e == "function";
        }
        return o && (f.onmessage = function(e) {
          var t = e.data;
          b.WORKER_ID === void 0 && t && (b.WORKER_ID = t.workerId);
          if (typeof t.input == "string")
            f.postMessage({ workerId: b.WORKER_ID, results: b.parse(t.input, t.config), finished: true });
          else if (f.File && t.input instanceof File || t.input instanceof Object) {
            var i2 = b.parse(t.input, t.config);
            i2 && f.postMessage({ workerId: b.WORKER_ID, results: i2, finished: true });
          }
        }), (l.prototype = Object.create(u.prototype)).constructor = l, (c.prototype = Object.create(u.prototype)).constructor = c, (p.prototype = Object.create(p.prototype)).constructor = p, (g.prototype = Object.create(u.prototype)).constructor = g, b;
      });
    }
  });

  // node_modules/date-fns/esm/_lib/requiredArgs/index.js
  function requiredArgs(required, args) {
    if (args.length < required) {
      throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
    }
  }

  // node_modules/date-fns/esm/toDate/index.js
  function toDate(argument) {
    requiredArgs(1, arguments);
    var argStr = Object.prototype.toString.call(argument);
    if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || argStr === "[object Number]") {
      return new Date(argument);
    } else {
      if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");
        console.warn(new Error().stack);
      }
      return new Date(NaN);
    }
  }

  // node_modules/date-fns/esm/_lib/addLeadingZeros/index.js
  function addLeadingZeros(number, targetLength) {
    var sign = number < 0 ? "-" : "";
    var output = Math.abs(number).toString();
    while (output.length < targetLength) {
      output = "0" + output;
    }
    return sign + output;
  }

  // node_modules/date-fns/esm/formatISO/index.js
  function formatISO(date, options) {
    requiredArgs(1, arguments);
    var originalDate = toDate(date);
    if (isNaN(originalDate.getTime())) {
      throw new RangeError("Invalid time value");
    }
    var format = !(options !== null && options !== void 0 && options.format) ? "extended" : String(options.format);
    var representation = !(options !== null && options !== void 0 && options.representation) ? "complete" : String(options.representation);
    if (format !== "extended" && format !== "basic") {
      throw new RangeError("format must be 'extended' or 'basic'");
    }
    if (representation !== "date" && representation !== "time" && representation !== "complete") {
      throw new RangeError("representation must be 'date', 'time', or 'complete'");
    }
    var result = "";
    var tzOffset = "";
    var dateDelimiter = format === "extended" ? "-" : "";
    var timeDelimiter = format === "extended" ? ":" : "";
    if (representation !== "time") {
      var day = addLeadingZeros(originalDate.getDate(), 2);
      var month = addLeadingZeros(originalDate.getMonth() + 1, 2);
      var year = addLeadingZeros(originalDate.getFullYear(), 4);
      result = "".concat(year).concat(dateDelimiter).concat(month).concat(dateDelimiter).concat(day);
    }
    if (representation !== "date") {
      var offset = originalDate.getTimezoneOffset();
      if (offset !== 0) {
        var absoluteOffset = Math.abs(offset);
        var hourOffset = addLeadingZeros(Math.floor(absoluteOffset / 60), 2);
        var minuteOffset = addLeadingZeros(absoluteOffset % 60, 2);
        var sign = offset < 0 ? "+" : "-";
        tzOffset = "".concat(sign).concat(hourOffset, ":").concat(minuteOffset);
      } else {
        tzOffset = "Z";
      }
      var hour = addLeadingZeros(originalDate.getHours(), 2);
      var minute = addLeadingZeros(originalDate.getMinutes(), 2);
      var second = addLeadingZeros(originalDate.getSeconds(), 2);
      var separator = result === "" ? "" : "T";
      var time = [hour, minute, second].join(timeDelimiter);
      result = "".concat(result).concat(separator).concat(time).concat(tzOffset);
    }
    return result;
  }

  // src/calculations.js
  var IGNORE = /[〔〕《》〖〗〘〙〚〛【】「」［］『』｛｝\[\]()（）｟｠〈〉≪≫。、.,※＊'：！?？‥…―─ｰ〽～→♪♪ ♫ ♬ ♩\"　\t\n]/g;
  var SPLIT = /[\n。.！?？]/g;
  function charsInLine(line) {
    return line.replaceAll(IGNORE, "").length;
  }
  function lineSplitCount(line) {
    return line.split(SPLIT).filter((value) => value.replaceAll(IGNORE, "") != "").length;
  }
  function dateNowString() {
    rn = new Date();
    return formatISO(rn, { "representation": "date" });
  }
  function timeToDateString(time) {
    if (time === void 0 || isNaN(time))
      return;
    let date = new Date(0);
    date.setSeconds(time);
    return formatISO(date, { "representation": "date" });
  }
  function timeNowSeconds() {
    let rn2 = new Date();
    return rn2.getTime() / 1e3;
  }

  // node_modules/async-mutex/index.mjs
  var E_TIMEOUT = new Error("timeout while waiting for mutex to become available");
  var E_ALREADY_LOCKED = new Error("mutex already locked");
  var E_CANCELED = new Error("request for lock canceled");
  var __awaiter$2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
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
  var Semaphore = class {
    constructor(_maxConcurrency, _cancelError = E_CANCELED) {
      this._maxConcurrency = _maxConcurrency;
      this._cancelError = _cancelError;
      this._queue = [];
      this._waiters = [];
      if (_maxConcurrency <= 0) {
        throw new Error("semaphore must be initialized to a positive value");
      }
      this._value = _maxConcurrency;
    }
    acquire() {
      const locked = this.isLocked();
      const ticketPromise = new Promise((resolve, reject) => this._queue.push({ resolve, reject }));
      if (!locked)
        this._dispatch();
      return ticketPromise;
    }
    runExclusive(callback) {
      return __awaiter$2(this, void 0, void 0, function* () {
        const [value, release] = yield this.acquire();
        try {
          return yield callback(value);
        } finally {
          release();
        }
      });
    }
    waitForUnlock() {
      return __awaiter$2(this, void 0, void 0, function* () {
        if (!this.isLocked()) {
          return Promise.resolve();
        }
        const waitPromise = new Promise((resolve) => this._waiters.push({ resolve }));
        return waitPromise;
      });
    }
    isLocked() {
      return this._value <= 0;
    }
    release() {
      if (this._maxConcurrency > 1) {
        throw new Error("this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead");
      }
      if (this._currentReleaser) {
        const releaser = this._currentReleaser;
        this._currentReleaser = void 0;
        releaser();
      }
    }
    cancel() {
      this._queue.forEach((ticket) => ticket.reject(this._cancelError));
      this._queue = [];
    }
    _dispatch() {
      const nextTicket = this._queue.shift();
      if (!nextTicket)
        return;
      let released = false;
      this._currentReleaser = () => {
        if (released)
          return;
        released = true;
        this._value++;
        this._resolveWaiters();
        this._dispatch();
      };
      nextTicket.resolve([this._value--, this._currentReleaser]);
    }
    _resolveWaiters() {
      this._waiters.forEach((waiter) => waiter.resolve());
      this._waiters = [];
    }
  };
  var __awaiter$1 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
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
  var Mutex = class {
    constructor(cancelError) {
      this._semaphore = new Semaphore(1, cancelError);
    }
    acquire() {
      return __awaiter$1(this, void 0, void 0, function* () {
        const [, releaser] = yield this._semaphore.acquire();
        return releaser;
      });
    }
    runExclusive(callback) {
      return this._semaphore.runExclusive(() => callback());
    }
    isLocked() {
      return this._semaphore.isLocked();
    }
    waitForUnlock() {
      return this._semaphore.waitForUnlock();
    }
    release() {
      this._semaphore.release();
    }
    cancel() {
      return this._semaphore.cancel();
    }
  };

  // src/storage/instance_storage.js
  var browser = require_browser_polyfill();
  var InstanceStorage = class {
    constructor(uuid) {
      this.uuid = uuid;
      this.mutex = new Mutex();
    }
    async setup() {
      this.details = (await browser.storage.local.get(this.uuid))[this.uuid];
      let uuid_date_key = JSON.stringify([this.uuid, dateNowString()]);
      this.today_stats = (await browser.storage.local.get(uuid_date_key))[uuid_date_key];
    }
    async updateDetails(details) {
      Object.assign(this.details, details);
      let detail_entries = {};
      detail_entries[this.uuid] = this.details;
      await browser.storage.local.set(detail_entries);
    }
    async setDailyStats(date, values) {
      let uuid_date_key = JSON.stringify([this.uuid, date]);
      let daily_stats_entry = await browser.storage.local.get(uuid_date_key);
      daily_stats_entry[uuid_date_key] = values;
      if (date == dateNowString()) {
        this.today_stats = daily_stats_entry[uuid_date_key];
      }
      await browser.storage.local.set(daily_stats_entry);
    }
    async addStats(date_stat_adds, multiple = 1) {
      return this.mutex.runExclusive(async () => this.#addStats(date_stat_adds, multiple));
    }
    async #addStats(date_stat_adds, multiple = 1) {
      let date_keys = Object.keys(date_stat_adds).map((date) => JSON.stringify([this.uuid, date]));
      let date_stats = await browser.storage.local.get(date_keys);
      date_keys.forEach((key) => {
        let date = JSON.parse(key)[1];
        if (!date_stats.hasOwnProperty(key)) {
          date_stats[key] = {};
        }
        Object.entries(date_stat_adds[date]).forEach(([stat, value]) => {
          if (!date_stats[key].hasOwnProperty(stat)) {
            date_stats[key][stat] = 0;
          }
          date_stats[key][stat] += value * multiple;
        });
        if (date == dateNowString()) {
          this.today_stats = date_stats[key];
        }
      });
      await browser.storage.local.set(date_stats);
    }
    async addDailyStats(date, values, multiple = 1) {
      let date_stat_adds = {};
      date_stat_adds[date] = values;
      await this.addStats(date_stat_adds, multiple);
    }
    async subStats(date_stat_adds, multiple = 1) {
      await this.addStats(date_stat_adds, -1 * multiple);
    }
    async subDailyStats(date, values, multiple = 1) {
      await this.addDailyStats(date, values, -1 * multiple);
    }
    async insertLine(line, time) {
      let line_key = JSON.stringify([this.uuid, this.details["last_line_added"] + 1]);
      let line_entry = {};
      line_entry[line_key] = [line, time];
      await this.updateDetails({
        "last_line_added": this.details["last_line_added"] + 1,
        "last_active_at": time
      });
      await browser.storage.local.set(line_entry);
    }
    async deleteLine(line_id) {
      await browser.storage.local.remove(JSON.stringify([this.uuid, line_id]));
    }
    async deleteLines(line_ids) {
      await browser.storage.local.remove(line_ids.map((line_id) => JSON.stringify([this.uuid, line_id])));
    }
    async getLines(max_lines = void 0) {
      if (!this.details.hasOwnProperty("last_line_added")) {
        return;
      }
      let max_line_id = this.details["last_line_added"];
      let min_line_id = max_lines <= 0 | max_lines === void 0 | isNaN(max_lines) ? 0 : Math.max(0, this.details["last_line_added"] - max_lines + 1);
      let id_queries = [...Array(max_line_id - min_line_id + 1).keys()].map((index) => JSON.stringify([this.uuid, min_line_id + index]));
      let lines = await browser.storage.local.get(id_queries);
      return Object.entries(lines).map(([key, line_data]) => {
        let line = typeof line_data === "string" ? line_data : line_data[0];
        let time = typeof line_data === "string" ? void 0 : line_data[1];
        let [uuid, id] = JSON.parse(key);
        return [uuid, id, line, time];
      });
    }
    async addToDates(date) {
      let day_entries = await browser.storage.local.get("immersion_dates");
      if (!day_entries.hasOwnProperty("immersion_dates")) {
        day_entries["immersion_dates"] = [];
      }
      if (!day_entries["immersion_dates"].includes(date)) {
        day_entries["immersion_dates"].push(date);
        await browser.storage.local.set(day_entries);
      }
    }
    async addToDate(date) {
      let day_entries = await browser.storage.local.get(date);
      if (!day_entries.hasOwnProperty(date)) {
        day_entries[date] = [];
      }
      if (!day_entries[date].includes(this.uuid)) {
        day_entries[date].push(this.uuid);
        await browser.storage.local.set(day_entries);
      }
    }
  };

  // src/storage/type_storage.js
  var browser2 = require_browser_polyfill();
  var TypeStorage = class {
    constructor(type) {
      this.type = type;
    }
    async setup() {
      let types_list = await browser2.storage.local.get("types");
      if (!types_list.hasOwnProperty("types")) {
        types_list["types"] = [];
      }
      if (!types_list["types"].includes(this.type)) {
        types_list["types"].push(this.type);
      }
      await browser2.storage.local.set(types_list);
      let type_dict = await browser2.storage.local.get(this.type);
      if (!type_dict.hasOwnProperty(this.type)) {
        type_dict[this.type] = {};
      }
      this.properties = type_dict[this.type];
      await browser2.storage.local.set(type_dict);
    }
    async updateProperties(properties) {
      Object.assign(this.properties, properties);
      let properties_entry = {};
      properties_entry[this.type] = this.properties;
      await browser2.storage.local.set(properties_entry);
    }
    async getMedia(given_identifier) {
      let media_entries = await browser2.storage.local.get("media");
      let media_key = JSON.stringify([given_identifier, this.type]);
      if (media_entries.hasOwnProperty("media") && media_entries["media"].hasOwnProperty(media_key)) {
        return media_entries["media"][media_key];
      } else {
        return this.addMedia(given_identifier);
      }
    }
    async addMedia(given_identifier, uuid = void 0) {
      let media_entries = await browser2.storage.local.get("media");
      if (!media_entries.hasOwnProperty("media")) {
        media_entries["media"] = {};
      }
      let media_key = JSON.stringify([given_identifier, this.type]);
      if (!media_entries["media"].hasOwnProperty(media_key)) {
        let new_uuid = uuid !== void 0 ? uuid : crypto.randomUUID();
        media_entries["media"][media_key] = new_uuid;
        let details_entry = await browser2.storage.local.get(new_uuid);
        if (!details_entry.hasOwnProperty(new_uuid)) {
          media_entries[new_uuid] = {
            "name": given_identifier,
            "given_identifier": given_identifier,
            "type": this.type,
            "last_line_added": -1
          };
        }
        await browser2.storage.local.set(media_entries);
      }
      return media_entries["media"][media_key];
    }
  };

  // src/storage/media_storage.js
  var REFRESH_STATS_INTERVAL = 1e3;
  var MediaStorage = class {
    constructor(type_storage, instance_storage, live_stat_update = false) {
      this.type_storage = type_storage;
      this.instance_storage = instance_storage;
      this.properties = this.type_storage.properties;
      if (this.instance_storage !== void 0) {
        this.details = this.instance_storage.details;
        this.uuid = this.properties["previous_uuid"];
        this.logLines();
      }
      if (live_stat_update) {
        this.stop_ticker(false);
        setInterval(this.#ticker.bind(this), REFRESH_STATS_INTERVAL);
      }
    }
    static async build(type) {
      let type_storage = new TypeStorage(type);
      await type_storage.setup();
      let instance_storage;
      if (type_storage.properties.hasOwnProperty("previous_uuid")) {
        instance_storage = new InstanceStorage(type_storage.properties["previous_uuid"]);
        await instance_storage.setup();
      } else {
        instance_storage = void 0;
      }
      return [type_storage, instance_storage];
    }
    async changeInstance(new_uuid, given_identifier = void 0) {
      if (new_uuid == void 0 && given_identifier !== void 0) {
        new_uuid = await this.type_storage.getMedia(given_identifier);
      }
      if (this.uuid == new_uuid) {
        return;
      }
      if (this.properties["previous_uuid"] != new_uuid) {
        this.type_storage.updateProperties({ "previous_uuid": new_uuid });
      }
      this.instance_storage = new InstanceStorage(new_uuid);
      await this.instance_storage.setup();
      this.uuid = this.instance_storage.uuid;
      this.details = this.instance_storage.details;
      await this.logLines();
    }
    async logLines() {
      const event = new CustomEvent("media_changed", {
        "detail": {
          "uuid": this.uuid,
          "name": this.details["name"]
        }
      });
      document.dispatchEvent(event);
    }
    start_ticker(event = true) {
      if (this.previous_time == void 0) {
        this.previous_time = timeNowSeconds();
      }
      if (event) {
        let event2 = new Event("status_active");
        document.dispatchEvent(event2);
      }
    }
    stop_ticker(event = true) {
      this.previous_time = void 0;
      if (event) {
        let event2 = new Event("status_inactive");
        document.dispatchEvent(event2);
      }
    }
    async #ticker() {
      let time_now = timeNowSeconds();
      if (this.instance_storage == void 0 || this.previous_time == void 0) {
        return;
      }
      let time_between_lines = this.details["last_active_at"] !== void 0 ? time_now - this.details["last_active_at"] : 0;
      let time_between_ticks = time_now - this.previous_time;
      this.previous_time = time_now;
      if (time_between_lines <= this.properties["afk_max_time"]) {
        await this.instance_storage.addDailyStats(dateNowString(), {
          "time_read": time_between_ticks
        });
        this.start_ticker();
      } else {
        this.stop_ticker();
      }
    }
  };

  // src/vn/vn_storage.js
  var browser3 = require_browser_polyfill();
  var VNStorage = class extends MediaStorage {
    constructor(type_storage, instance_storage, live_stat_update = false) {
      super(type_storage, instance_storage, live_stat_update);
      this.max_lines = Number.parseInt(type_storage.properties["max_loaded_lines"]);
    }
    static async build(live_stat_update = false) {
      let [type_storage, instance_storage] = await super.build("vn");
      return new VNStorage(type_storage, instance_storage, live_stat_update);
    }
    async logLines() {
      const event = new CustomEvent("media_changed", {
        "detail": {
          "uuid": this.uuid,
          "name": this.details["name"],
          "lines": await this.instance_storage.getLines(this.max_lines)
        }
      });
      document.dispatchEvent(event);
    }
    async addLine(line, date, time) {
      let previous_line_key = JSON.stringify([this.uuid, this.details["last_line_added"]]);
      let previous_line = (await browser3.storage.local.get(previous_line_key))[previous_line_key];
      if (line != previous_line) {
        let chars_in_line = charsInLine(line);
        if (chars_in_line === 0)
          return;
        this.start_ticker(false);
        await this.instance_storage.insertLine(line, time);
        await this.instance_storage.addToDates(date);
        await this.instance_storage.addToDate(date);
        await this.instance_storage.addDailyStats(date, {
          "lines_read": lineSplitCount(line),
          "chars_read": chars_in_line
        });
        const event = new CustomEvent("new_line", {
          "detail": {
            "line_id": this.details["last_line_added"],
            "line": line,
            "time": time
          }
        });
        document.dispatchEvent(event);
      }
    }
    async deleteLines(details) {
      let date_stats = {};
      details.forEach(([_, line, date]) => {
        if (date === void 0) {
          date = dateNowString();
        }
        if (!date_stats.hasOwnProperty(date)) {
          date_stats[date] = {};
          date_stats[date]["lines_read"] = 0;
          date_stats[date]["chars_read"] = 0;
        }
        date_stats[date]["lines_read"] += lineSplitCount(line);
        date_stats[date]["chars_read"] += charsInLine(line);
      });
      await this.instance_storage.deleteLines(details.map(([line_id, _, time]) => line_id));
      await this.instance_storage.subStats(date_stats);
    }
    async deleteLine(line_id, line, date) {
      await this.instance_storage.deleteLine(line_id);
      await this.instance_storage.subDailyStats(date, {
        "lines_read": lineSplitCount(line),
        "chars_read": charsInLine(line)
      });
    }
  };

  // src/data_wrangling/data_extraction.js
  var import_papaparse = __toESM(require_papaparse_min());
  var browser4 = require_browser_polyfill();
  async function getDateData(date) {
    let uuids = (await browser4.storage.local.get(date))[date];
    let date_data = uuids.map(async (uuid, _) => {
      let details = (await browser4.storage.local.get(uuid))[uuid];
      let uuid_date_key = JSON.stringify([uuid, date]);
      let stats_entry = (await browser4.storage.local.get(uuid_date_key))[uuid_date_key];
      if (stats_entry.hasOwnProperty("time_read")) {
        stats_entry["time_read"] = stats_entry["time_read"];
        if (stats_entry.hasOwnProperty("chars_read")) {
          stats_entry["read_speed"] = stats_entry["chars_read"] / stats_entry["time_read"];
        }
      }
      return {
        "uuid": uuid,
        "name": details["name"],
        "given_identifier": details["given_identifier"],
        "type": details["type"],
        "date": date,
        ...stats_entry
      };
    });
    return Promise.all(date_data);
  }
  async function getData() {
    let dates = await browser4.storage.local.get("immersion_dates");
    if (!dates.hasOwnProperty("immersion_dates")) {
      return;
    }
    let data = await Promise.all(dates["immersion_dates"].map(getDateData));
    return data.flat();
  }
  async function exportStats() {
    let data = await getData();
    chrome.runtime.sendMessage({
      "action": "export_csv",
      "csv": [(0, import_papaparse.unparse)(data)],
      "blob_options": { "type": "text/csv" },
      "filename": "exSTATic_stats.csv"
    });
  }
  async function getInstanceData([uuid, details]) {
    if (!details.hasOwnProperty("last_line_added")) {
      return;
    }
    let id_queries = [...Array(details["last_line_added"] + 1).keys()].map((index) => JSON.stringify([uuid, index]));
    let lines = await browser4.storage.local.get(id_queries);
    return Object.values(lines).map((line) => {
      return {
        "uuid": uuid,
        "given_identifier": details["given_identifier"],
        "name": details["name"],
        "line": typeof line === "string" ? line : line[0],
        "time": typeof line === "string" ? void 0 : line[1]
      };
    });
  }
  async function exportLines() {
    let media = await browser4.storage.local.get("media");
    if (!media.hasOwnProperty("media")) {
      return;
    }
    let detail_entries = await browser4.storage.local.get(Object.values(media["media"]));
    let data = await Promise.all(Object.entries(detail_entries).map(getInstanceData));
    chrome.runtime.sendMessage({
      "action": "export_csv",
      "csv": [(0, import_papaparse.unparse)(data.flat())],
      "blob_options": { "type": "text/csv;charset=utf-8" },
      "filename": "exSTATic_lines.csv"
    });
  }
  async function importStats(data) {
    for (const entry of data) {
      if (!entry.hasOwnProperty("type") || !entry.hasOwnProperty("date") || !entry.hasOwnProperty("given_identifier")) {
        return;
      }
      let type_storage = new TypeStorage(entry["type"]);
      await type_storage.setup();
      let uuid = await type_storage.addMedia(entry["given_identifier"], entry["uuid"]);
      let stats = {};
      if (entry.hasOwnProperty("chars_read")) {
        stats["chars_read"] = entry["chars_read"];
      }
      if (entry.hasOwnProperty("lines_read")) {
        stats["lines_read"] = entry["lines_read"];
      }
      if (entry.hasOwnProperty("time_read")) {
        stats["time_read"] = entry["time_read"];
      }
      let instance_storage = new InstanceStorage(uuid);
      await instance_storage.setup();
      if (entry.hasOwnProperty("name")) {
        await instance_storage.updateDetails({
          "name": entry["name"]
        });
      }
      await instance_storage.addToDates(entry["date"]);
      await instance_storage.addToDate(entry["date"]);
      if (Object.keys(stats).length !== 0) {
        await instance_storage.setDailyStats(entry["date"], stats);
      }
    }
  }

  // src/vn/ui_properties.js
  var import_papaparse2 = __toESM(require_papaparse_min());
  var browser5 = require_browser_polyfill();
  var vn_storage;
  function setStorage(vn_storage_) {
    vn_storage = vn_storage_;
  }
  async function useProperty(element_id, global_css_property = false, units = "") {
    let element = document.getElementById(element_id);
    let properties = {};
    properties[element_id] = element.value;
    await vn_storage.type_storage.updateProperties(properties);
    if (global_css_property) {
      document.documentElement.style.setProperty(global_css_property, element.value + units);
    }
  }
  async function setupProperty(element_id, event_type, global_css_property = false, units = "") {
    let element = document.getElementById(element_id);
    if (vn_storage.properties.hasOwnProperty(element_id)) {
      element.value = vn_storage.properties[element_id];
    }
    await useProperty(element_id, global_css_property, units);
    if (event_type) {
      element.addEventListener(event_type, async (event) => await useProperty(event["target"].id, global_css_property, units));
    }
  }
  function gameNameModified(event) {
    vn_storage.instance_storage.updateDetails({
      "name": event["target"].value
    });
    showNameTitle(event["target"].value);
  }
  async function userActive() {
    let time = timeNowSeconds();
    if (vn_storage.instance_storage === void 0)
      return;
    if (vn_storage.previous_time === void 0) {
      await vn_storage.instance_storage.updateDetails({ "last_active_at": time });
      vn_storage.start_ticker();
    } else {
      vn_storage.stop_ticker();
    }
  }
  function openStats() {
    browser5.runtime.sendMessage({
      "action": "open_tab",
      "url": "https://kamwithk.github.io/exSTATic/stats.html"
    });
  }
  async function deleteLines() {
    if (vn_storage.instance_storage === void 0)
      return;
    let checked_boxes = Array.from(document.querySelectorAll(".line-select:checked"));
    if (checked_boxes.length === 0)
      return;
    let plural = checked_boxes.length > 1 ? "lines" : "line";
    confirmed = confirm(`Are you sure you'd like to delete ${checked_boxes.length} ${plural}?
Char and line statistics will be modified accordingly however time read won't change...`);
    if (!confirmed)
      return;
    let parents = checked_boxes.map((checkbox) => checkbox.parentElement);
    let details = parents.map((element_div) => [
      Number.parseInt(element_div.dataset.line_id),
      element_div.textContent,
      timeToDateString(Number.parseInt(element_div.dataset.time))
    ]);
    await vn_storage.deleteLines(details);
    parents.forEach((element_div) => element_div.remove());
    setStats();
  }
  async function setupProperties() {
    await setupProperty("font", "change", "--default-jp-font");
    await setupProperty("font_size", "change", "--default-jp-font-size", "rem");
    await setupProperty("afk_max_time", "change");
    await setupProperty("max_loaded_lines", "change");
    await setupProperty("inactivity_blur", "change");
    await setupProperty("menu_blur", "change", "--default-menu-blur", "px");
    await setupProperty("bottom_line_padding", "change", "--default-text-align", "%");
    document.getElementById("game_name").addEventListener("change", gameNameModified);
    document.getElementById("entry_holder").addEventListener("dblclick", userActive);
    document.getElementById("delete-selection").addEventListener("click", deleteLines);
    document.getElementById("view_stats").addEventListener("click", openStats);
    document.getElementById("export_stats").addEventListener("click", exportStats);
    document.getElementById("export_lines").addEventListener("click", async (_) => {
      confirmed = confirm("Are you sure you'd like to export lines?\nExporting large numbers of lines can take a long time, please wait and do not retry whilst the operation takes place...");
      if (confirmed) {
        await exportLines();
      }
    });
    document.getElementById("import_stats").addEventListener("change", (event) => {
      confirmed = confirm("Are you sure you'd like to import previous data?\nPrevious stats in storage will be replaced with new values from this data dump (when the type, media and date all collide)...\nIt is highly recommended to BACKUP (export) data regularly in case anything goes wrong (i.e. before importing)!");
      if (!confirmed)
        return;
      (0, import_papaparse2.parse)(event["target"].files[0], {
        "header": true,
        "dynamicTyping": true,
        "complete": async (result) => {
          await importStats(result.data);
          alert("Finished importing stats successfully, refresh all pages now...");
        }
      });
    });
  }

  // src/storage/stress_test.js
  var browser6 = require_browser_polyfill();

  // src/vn/tracker_inject.js
  console.log("Injected");
  var browser7 = require_browser_polyfill();
  var SECS_TO_HOURS = 60 * 60;
  var vn_storage2;
  async function setup() {
    vn_storage2 = await VNStorage.build(true);
    var port = browser7.runtime.connect({ "name": "vn_lines" });
    port.onMessage.addListener(async (data) => {
      await vn_storage2.changeInstance(void 0, data["process_path"]);
      await vn_storage2.addLine(data["line"], data["date"], data["time"]);
    });
    setStorage(vn_storage2);
    await setupProperties();
    setStats();
  }
  setup();
  function setActive() {
    document.getElementById("activity_symbol").innerHTML = "hourglass_bottom";
    document.documentElement.style.setProperty("--default-inactivity-blur", 0);
    setStats();
  }
  document.addEventListener("status_active", setActive);
  async function setInactive() {
    document.getElementById("activity_symbol").innerHTML = "bedtime";
    document.documentElement.style.setProperty("--default-inactivity-blur", vn_storage2.properties["inactivity_blur"] + "px");
    setStats();
  }
  document.addEventListener("status_inactive", setInactive);
  function newLineDiv(line, line_id, time) {
    let container_div = document.createElement("div");
    let new_p = document.createElement("p");
    let new_checkbox = document.createElement("input");
    new_checkbox.type = "checkbox";
    container_div.classList.add("sentence-entry");
    new_p.classList.add("sentence");
    new_checkbox.classList.add("line-select");
    container_div.dataset.line_id = line_id;
    container_div.dataset.time = time;
    new_p.innerHTML = line;
    container_div.appendChild(new_p);
    container_div.appendChild(new_checkbox);
    return container_div;
  }
  function showNameTitle(name) {
    let game_name_heading = document.getElementById("game_name");
    game_name_heading.disabled = true;
    game_name_heading.value = name;
    game_name_heading.disabled = false;
    document.title = "exSTATic | " + name;
  }
  function setStats() {
    if (vn_storage2.instance_storage == void 0 || vn_storage2.instance_storage.today_stats == void 0) {
      return;
    }
    let chars_read = vn_storage2.instance_storage.today_stats["chars_read"];
    let lines_read = vn_storage2.instance_storage.today_stats["lines_read"];
    let time_read = vn_storage2.instance_storage.today_stats["time_read"];
    if (chars_read !== void 0) {
      document.getElementById("chars_read").innerHTML = chars_read.toLocaleString();
    }
    if (lines_read !== void 0) {
      document.getElementById("lines_read").innerHTML = lines_read.toLocaleString();
    }
    if (chars_read !== void 0 && time_read !== void 0) {
      let average = Math.round(chars_read / (time_read / SECS_TO_HOURS));
      document.getElementById("chars_per_hour").innerHTML = average.toLocaleString();
    }
    if (time_read !== void 0) {
      let date = new Date(0);
      date.setSeconds(Math.round(time_read));
      document.getElementById("elapsed_time").innerHTML = date.toISOString().substring(11, 19);
    }
  }
  function gameChanged(event) {
    showNameTitle(event.detail["name"]);
    let line_divs = event.detail["lines"].map(([_, line_id, line, time]) => newLineDiv(line, line_id, time)).sort((first, second) => first.dataset.line_id - second.dataset.line_id);
    document.getElementById("entry_holder").replaceChildren(...line_divs);
  }
  document.addEventListener("media_changed", gameChanged);
  function lineAdded(event) {
    document.getElementById("entry_holder").appendChild(newLineDiv(event.detail["line"], event.detail["line_id"], event.detail["time"]));
  }
  document.addEventListener("new_line", lineAdded);
})();
/* @license
Papa Parse
v5.3.2
https://github.com/mholt/PapaParse
License: MIT
*/
