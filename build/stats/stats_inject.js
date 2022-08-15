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
      (function(global2, factory) {
        if (typeof define === "function" && define.amd) {
          define("webextension-polyfill", ["module"], factory);
        } else if (typeof exports !== "undefined") {
          factory(module);
        } else {
          var mod = {
            exports: {}
          };
          factory(mod);
          global2.browser = mod.exports;
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

  // node_modules/iwanthue/rng.js
  var require_rng = __commonJS({
    "node_modules/iwanthue/rng.js"(exports, module) {
      function randomInteger(a, b) {
        return a + Math.floor(Math.random() * (b - a + 1));
      }
      function Random(seed) {
        if (!seed)
          seed = randomInteger(0, Math.pow(2, 31) - 1);
        this.seed = seed % 2147483647;
        if (this.seed <= 0)
          this.seed += 2147483646;
      }
      Random.prototype.next = function() {
        this.seed = this.seed * 16807 % 2147483647;
        return this.seed;
      };
      Random.prototype.nextFloat = function() {
        return (this.next() - 1) / 2147483646;
      };
      module.exports = Random;
    }
  });

  // node_modules/iwanthue/helpers.js
  var require_helpers = __commonJS({
    "node_modules/iwanthue/helpers.js"(exports) {
      var LAB_CONSTANTS = {
        Kn: 18,
        Xn: 0.95047,
        Yn: 1,
        Zn: 1.08883,
        t0: 0.137931034,
        t1: 0.206896552,
        t2: 0.12841855,
        t3: 8856452e-9
      };
      function xyzToRgb(r) {
        return Math.round(255 * (r <= 304e-5 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055));
      }
      function rgbToXyzHelper(r) {
        if ((r /= 255) <= 0.04045)
          return r / 12.92;
        return Math.pow((r + 0.055) / 1.055, 2.4);
      }
      function xyzToLab(t) {
        if (t > LAB_CONSTANTS.t3)
          return Math.pow(t, 1 / 3);
        return t / LAB_CONSTANTS.t2 + LAB_CONSTANTS.t0;
      }
      function rgbToXyz(rgb2) {
        var r = rgb2[0], g = rgb2[1], b = rgb2[2];
        r = rgbToXyzHelper(r);
        g = rgbToXyzHelper(g);
        b = rgbToXyzHelper(b);
        var x2 = xyzToLab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS.Xn), y2 = xyzToLab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / LAB_CONSTANTS.Yn), z = xyzToLab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / LAB_CONSTANTS.Zn);
        return [x2, y2, z];
      }
      function labToXyz(t) {
        return t > LAB_CONSTANTS.t1 ? t * t * t : LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0);
      }
      function labToRgb(lab) {
        var l = lab[0];
        var a = lab[1];
        var b = lab[2];
        var y2 = (l + 16) / 116;
        var x2 = isNaN(a) ? y2 : y2 + a / 500;
        var z = isNaN(b) ? y2 : y2 - b / 200;
        y2 = LAB_CONSTANTS.Yn * labToXyz(y2);
        x2 = LAB_CONSTANTS.Xn * labToXyz(x2);
        z = LAB_CONSTANTS.Zn * labToXyz(z);
        var r = xyzToRgb(3.2404542 * x2 - 1.5371385 * y2 - 0.4985314 * z);
        var g = xyzToRgb(-0.969266 * x2 + 1.8760108 * y2 + 0.041556 * z);
        b = xyzToRgb(0.0556434 * x2 - 0.2040259 * y2 + 1.0572252 * z);
        return [r, g, b];
      }
      function rgbToLab(rgb2) {
        var xyz = rgbToXyz(rgb2);
        var x2 = xyz[0], y2 = xyz[1], z = xyz[2];
        var l = 116 * y2 - 16;
        return [l < 0 ? 0 : l, 500 * (x2 - y2), 200 * (y2 - z)];
      }
      function validateRgb(rgb2) {
        var r = rgb2[0];
        var g = rgb2[1];
        var b = rgb2[2];
        return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
      }
      function hexPad(x2) {
        return ("0" + x2.toString(16)).slice(-2);
      }
      function labToRgbHex(lab) {
        var rgb2 = labToRgb(lab);
        return "#" + hexPad(rgb2[0]) + hexPad(rgb2[1]) + hexPad(rgb2[2]);
      }
      var RAD_TO_DEG = 180 / Math.PI;
      function labToHcl(lab) {
        var l = lab[0];
        var a = lab[1];
        var b = lab[2];
        var c = Math.sqrt(a * a + b * b);
        var h = (Math.atan2(b, a) * RAD_TO_DEG + 360) % 360;
        if (Math.round(c * 1e4) === 0)
          h = NaN;
        return [h, c, l];
      }
      function diffSort(distance, colors) {
        colors = colors.slice();
        var diffColors = [colors.shift()];
        var index2, maxDistance, candidateIndex;
        var A, B, d, i;
        while (colors.length > 0) {
          index2 = -1;
          maxDistance = -Infinity;
          for (candidateIndex = 0; candidateIndex < colors.length; candidateIndex++) {
            A = colors[candidateIndex];
            for (i = 0; i < diffColors.length; i++) {
              B = diffColors[i];
              d = distance(A, B);
              if (d > maxDistance) {
                maxDistance = d;
                index2 = candidateIndex;
              }
            }
          }
          diffColors.push(colors[index2]);
          colors.splice(index2, 1);
        }
        return diffColors;
      }
      function computeQualityMetrics(distance, colors) {
        var i, j, l;
        var min = Infinity, d;
        var S = 0, t = 0;
        for (i = 0, l = colors.length; i < l; i++) {
          for (j = i + 1; j < l; j++) {
            d = distance(colors[i], colors[j]);
            if (d < min)
              min = d;
            S += d;
            t++;
          }
        }
        return { min, mean: S / t };
      }
      exports.validateRgb = validateRgb;
      exports.labToRgb = labToRgb;
      exports.labToRgbHex = labToRgbHex;
      exports.rgbToLab = rgbToLab;
      exports.labToHcl = labToHcl;
      exports.diffSort = diffSort;
      exports.computeQualityMetrics = computeQualityMetrics;
    }
  });

  // node_modules/iwanthue/distances.js
  var require_distances = __commonJS({
    "node_modules/iwanthue/distances.js"(exports, module) {
      var helpers = require_helpers();
      var CONFUSION_LINES = {
        protanope: {
          x: 0.7465,
          y: 0.2535,
          m: 1.273463,
          yint: -0.073894
        },
        deuteranope: {
          x: 1.4,
          y: -0.4,
          m: 0.968437,
          yint: 3331e-6
        },
        tritanope: {
          x: 0.1748,
          y: 0,
          m: 0.062921,
          yint: 0.292119
        }
      };
      function euclidean(lab1, lab2) {
        return Math.sqrt(Math.pow(lab1[0] - lab2[0], 2) + Math.pow(lab1[1] - lab2[1], 2) + Math.pow(lab1[2] - lab2[2], 2));
      }
      function cmc(l, c, lab1, lab2) {
        var L1 = lab1[0];
        var L2 = lab2[0];
        var a1 = lab1[1];
        var a2 = lab2[1];
        var b1 = lab1[2];
        var b2 = lab2[2];
        var C1 = Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2));
        var C2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2));
        var deltaC = C1 - C2;
        var deltaL = L1 - L2;
        var deltaa = a1 - a2;
        var deltab = b1 - b2;
        var deltaH = Math.sqrt(Math.pow(deltaa, 2) + Math.pow(deltab, 2) + Math.pow(deltaC, 2));
        var H1 = Math.atan2(b1, a1) * (180 / Math.PI);
        while (H1 < 0) {
          H1 += 360;
        }
        var F = Math.sqrt(Math.pow(C1, 4) / (Math.pow(C1, 4) + 1900));
        var T = H1 >= 164 && H1 <= 345 ? 0.56 + Math.abs(0.2 * Math.cos(H1 + 168)) : 0.36 + Math.abs(0.4 * Math.cos(H1 + 35));
        var S_L = lab1[0] < 16 ? 0.511 : 0.040975 * L1 / (1 + 0.01765 * L1);
        var S_C = 0.0638 * C1 / (1 + 0.0131 * C1) + 0.638;
        var S_H = S_C * (F * T + 1 - F);
        var result = Math.sqrt(Math.pow(deltaL / (l * S_L), 2) + Math.pow(deltaC / (c * S_C), 2) + Math.pow(deltaH / S_H, 2));
        return result;
      }
      function CachedDistances() {
        this.cache = {};
      }
      CachedDistances.prototype.simulate = function(lab, type, amount) {
        amount = amount || 1;
        var key = lab.join("-") + "-" + type + "-" + amount;
        var cache = this.cache[key];
        if (cache)
          return cache;
        var confuseX = CONFUSION_LINES[type].x;
        var confuseY = CONFUSION_LINES[type].y;
        var confuseM = CONFUSION_LINES[type].m;
        var confuseYint = CONFUSION_LINES[type].yint;
        var color2 = helpers.labToRgb(lab);
        var sr = color2[0];
        var sg = color2[1];
        var sb = color2[2];
        var dr = sr;
        var dg = sg;
        var db = sb;
        var powR = Math.pow(sr, 2.2);
        var powG = Math.pow(sg, 2.2);
        var powB = Math.pow(sb, 2.2);
        var X = powR * 0.412424 + powG * 0.357579 + powB * 0.180464;
        var Y = powR * 0.212656 + powG * 0.715158 + powB * 0.0721856;
        var Z = powR * 0.0193324 + powG * 0.119193 + powB * 0.950444;
        var chromaX = X / (X + Y + Z);
        var chromaY = Y / (X + Y + Z);
        var m = (chromaY - confuseY) / (chromaX - confuseX);
        var yint = chromaY - chromaX * m;
        var deviateX = (confuseYint - yint) / (m - confuseM);
        var deviateY = m * deviateX + yint;
        X = deviateX * Y / deviateY;
        Z = (1 - (deviateX + deviateY)) * Y / deviateY;
        var neutralX = 0.312713 * Y / 0.329016;
        var neutralZ = 0.358271 * Y / 0.329016;
        var diffX = neutralX - X;
        var diffZ = neutralZ - Z;
        var diffR = diffX * 3.24071 + diffZ * -0.498571;
        var diffG = diffX * -0.969258 + diffZ * 0.0415557;
        var diffB = diffX * 0.0556352 + diffZ * 1.05707;
        dr = X * 3.24071 + Y * -1.53726 + Z * -0.498571;
        dg = X * -0.969258 + Y * 1.87599 + Z * 0.0415557;
        db = X * 0.0556352 + Y * -0.203996 + Z * 1.05707;
        var fitR = ((dr < 0 ? 0 : 1) - dr) / diffR;
        var fitG = ((dg < 0 ? 0 : 1) - dg) / diffG;
        var fitB = ((db < 0 ? 0 : 1) - db) / diffB;
        var adjust = Math.max(fitR > 1 || fitR < 0 ? 0 : fitR, fitG > 1 || fitG < 0 ? 0 : fitG, fitB > 1 || fitB < 0 ? 0 : fitB);
        dr = dr + adjust * diffR;
        dg = dg + adjust * diffG;
        db = db + adjust * diffB;
        dr = Math.pow(dr, 1 / 2.2);
        dg = Math.pow(dg, 1 / 2.2);
        db = Math.pow(db, 1 / 2.2);
        dr = sr * (1 - amount) + dr * amount;
        dg = sg * (1 - amount) + dg * amount;
        db = sb * (1 - amount) + db * amount;
        var dcolor = [dr, dg, db];
        var result = helpers.rgbToLab(dcolor);
        this.cache[key] = result;
        return result;
      };
      CachedDistances.prototype.euclidean = euclidean;
      CachedDistances.prototype.cmc = cmc.bind(null, 2, 1);
      CachedDistances.prototype.colorblind = function(type, lab1, lab2) {
        lab1 = this.simulate(lab1, type);
        lab2 = this.simulate(lab2, type);
        return this.cmc(lab1, lab2);
      };
      Object.keys(CONFUSION_LINES).forEach(function(type) {
        CachedDistances.prototype[type] = function(lab1, lab2) {
          return this.colorblind(type, lab1, lab2);
        };
      });
      var COMPROMISE_COUNT = 1e3 + 100 + 500 + 1;
      CachedDistances.prototype.compromise = function(lab1, lab2) {
        var total = 0;
        var d = this.cmc(lab1, lab2);
        total += d * 1e3;
        d = this.colorblind("protanope", lab1, lab2);
        if (!isNaN(d))
          total += d * 100;
        d = this.colorblind("deuteranope", lab1, lab2);
        if (!isNaN(d))
          total += d * 500;
        d = this.colorblind("tritanope", lab1, lab2);
        if (!isNaN(d))
          total += d * 1;
        return total / COMPROMISE_COUNT;
      };
      CachedDistances.prototype.get = function(name) {
        if (name in CONFUSION_LINES)
          return this.colorblind.bind(this, name);
        return this[name].bind(this);
      };
      module.exports = CachedDistances;
    }
  });

  // node_modules/iwanthue/presets.js
  var require_presets = __commonJS({
    "node_modules/iwanthue/presets.js"(exports, module) {
      var presets = {
        "all": [0, 360, 0, 100, 0, 100],
        "default": [0, 360, 30, 80, 35, 80],
        "sensible": [0, 360, 25.59, 55.59, 60.94, 90.94],
        "colorblind": [0, 360, 40, 70, 15, 85],
        "fancy-light": [0, 360, 15, 40, 70, 100],
        "fancy-dark": [0, 360, 8, 40, 7, 40],
        "shades": [0, 240, 0, 15, 0, 100],
        "tarnish": [0, 360, 0, 15, 30, 70],
        "pastel": [0, 360, 0, 30, 70, 100],
        "pimp": [0, 360, 30, 100, 25, 70],
        "intense": [0, 360, 20, 100, 15, 80],
        "fluo": [0, 300, 35, 100, 75, 100],
        "red-roses": [330, 20, 10, 100, 35, 100],
        "ochre-sand": [20, 60, 20, 50, 35, 100],
        "yellow-lime": [60, 90, 10, 100, 35, 100],
        "green-mint": [90, 150, 10, 100, 35, 100],
        "ice-cube": [150, 200, 0, 100, 35, 100],
        "blue-ocean": [220, 260, 8, 80, 0, 50],
        "indigo-night": [260, 290, 40, 100, 35, 100],
        "purple-wine": [290, 330, 0, 100, 0, 40]
      };
      module.exports = presets;
    }
  });

  // node_modules/iwanthue/index.js
  var require_iwanthue = __commonJS({
    "node_modules/iwanthue/index.js"(exports, module) {
      var Random = require_rng();
      var CachedDistances = require_distances();
      var helpers = require_helpers();
      var presets = require_presets();
      var validateRgb = helpers.validateRgb;
      var labToRgb = helpers.labToRgb;
      var labToRgbHex = helpers.labToRgbHex;
      var labToHcl = helpers.labToHcl;
      var diffSort = helpers.diffSort;
      var DEFAULT_SETTINGS = {
        attempts: 1,
        colorFilter: null,
        colorSpace: "default",
        clustering: "k-means",
        quality: 50,
        ultraPrecision: false,
        distance: "euclidean",
        seed: null
      };
      var VALID_CLUSTERINGS = /* @__PURE__ */ new Set(["force-vector", "k-means"]);
      var VALID_DISTANCES = /* @__PURE__ */ new Set([
        "euclidean",
        "cmc",
        "compromise",
        "protanope",
        "deuteranope",
        "tritanope"
      ]);
      var VALID_PRESETS = new Set(Object.keys(presets));
      function stringSum(string) {
        var sum2 = 0;
        for (var i = 0, l = string.length; i < l; i++)
          sum2 += string.charCodeAt(i);
        return sum2;
      }
      function resolveAndValidateSettings(userSettings) {
        var settings = Object.assign({}, DEFAULT_SETTINGS, userSettings);
        if (typeof settings.attempts !== "number" || settings.attempts <= 0)
          throw new Error("iwanthue: invalid `attempts` setting. Expecting a positive number.");
        if (settings.colorFilter && typeof settings.colorFilter !== "function")
          throw new Error("iwanthue: invalid `colorFilter` setting. Expecting a function.");
        if (!VALID_CLUSTERINGS.has(settings.clustering))
          throw new Error('iwanthue: unknown `clustering` "' + settings.clustering + '".');
        if (typeof settings.quality !== "number" || isNaN(settings.quality) || settings.quality < 1)
          throw new Error("iwanthue: invalid `quality`. Expecting a number > 0.");
        if (typeof settings.ultraPrecision !== "boolean")
          throw new Error("iwanthue: invalid `ultraPrecision`. Expecting a boolean.");
        if (!VALID_DISTANCES.has(settings.distance))
          throw new Error('iwanthue: unknown `distance` "' + settings.distance + '".');
        if (typeof settings.seed === "string")
          settings.seed = stringSum(settings.seed);
        if (settings.seed !== null && typeof settings.seed !== "number")
          throw new Error("iwanthue: invalid `seed`. Expecting an integer or a string.");
        if (!settings.colorFilter) {
          if (settings.colorSpace && settings.colorSpace !== "all") {
            var preset;
            if (typeof settings.colorSpace === "string") {
              if (!VALID_PRESETS.has(settings.colorSpace))
                throw new Error('iwanthue: unknown `colorSpace` "' + settings.colorSpace + '".');
              preset = presets[settings.colorSpace];
            } else if (Array.isArray(settings.colorSpace)) {
              if (settings.colorSpace.length !== 6)
                throw new Error("iwanthue: expecting a `colorSpace` array of length 6 ([hmin, hmax, cmin, cmax, lmin, lmax]).");
              preset = settings.colorSpace;
            } else {
              preset = [
                settings.colorSpace.hmin || 0,
                settings.colorSpace.hmax || 360,
                settings.colorSpace.cmin || 0,
                settings.colorSpace.cmax || 100,
                settings.colorSpace.lmin || 0,
                settings.colorSpace.lmax || 100
              ];
            }
            if (preset[0] < preset[1])
              settings.colorFilter = function(rgb2, lab) {
                var hcl = labToHcl(lab);
                return hcl[0] >= preset[0] && hcl[0] <= preset[1] && hcl[1] >= preset[2] && hcl[1] <= preset[3] && hcl[2] >= preset[4] && hcl[2] <= preset[5];
              };
            else
              settings.colorFilter = function(rgb2, lab) {
                var hcl = labToHcl(lab);
                return (hcl[0] >= preset[0] || hcl[0] <= preset[1]) && hcl[1] >= preset[2] && hcl[1] <= preset[3] && hcl[2] >= preset[4] && hcl[2] <= preset[5];
              };
          }
        }
        return settings;
      }
      function sampleLabColors(rng, count, validColor) {
        var colors = new Array(count), lab, rgb2;
        for (var i = 0; i < count; i++) {
          do {
            lab = [
              100 * rng(),
              100 * (2 * rng() - 1),
              100 * (2 * rng() - 1)
            ];
            rgb2 = labToRgb(lab);
          } while (!validColor(rgb2, lab));
          colors[i] = lab;
        }
        return colors;
      }
      var REPULSION = 100;
      var SPEED = 100;
      function forceVector(rng, distance, validColor, colors, settings) {
        var vectors = new Array(colors.length);
        var steps = settings.quality * 20;
        var i, j, l = colors.length;
        var A, B;
        var d, dl, da, db, force, candidateLab, color2, ratio, displacement, rgb2;
        while (steps-- > 0) {
          for (i = 0; i < l; i++)
            vectors[i] = { dl: 0, da: 0, db: 0 };
          for (i = 0; i < l; i++) {
            A = colors[i];
            for (j = 0; j < i; j++) {
              B = colors[j];
              d = distance(A, B);
              if (d > 0) {
                dl = A[0] - B[0];
                da = A[1] - B[1];
                db = A[2] - B[2];
                force = REPULSION / Math.pow(d, 2);
                vectors[i].dl += dl * force / d;
                vectors[i].da += da * force / d;
                vectors[i].db += db * force / d;
                vectors[j].dl -= dl * force / d;
                vectors[j].da -= da * force / d;
                vectors[j].db -= db * force / d;
              } else {
                vectors[j].dl += 2 - 4 * rng();
                vectors[j].da += 2 - 4 * rng();
                vectors[j].db += 2 - 4 * rng();
              }
            }
          }
          for (i = 0; i < l; i++) {
            color2 = colors[i];
            displacement = SPEED * Math.sqrt(Math.pow(vectors[i].dl, 2) + Math.pow(vectors[i].da, 2) + Math.pow(vectors[i].db, 2));
            if (displacement > 0) {
              ratio = SPEED * Math.min(0.1, displacement) / displacement;
              candidateLab = [
                color2[0] + vectors[i].dl * ratio,
                color2[1] + vectors[i].da * ratio,
                color2[2] + vectors[i].db * ratio
              ];
              rgb2 = labToRgb(candidateLab);
              if (validColor(rgb2, candidateLab))
                colors[i] = candidateLab;
            }
          }
        }
      }
      function kMeans(distance, validColor, colors, settings) {
        var colorSamples = [];
        var samplesClosest = [];
        var l, a, b;
        var lab, rgb2;
        var linc = 5, ainc = 10, binc = 10;
        if (settings.ultraPrecision) {
          linc = 1;
          ainc = 5;
          binc = 5;
        }
        for (l = 0; l <= 100; l += linc) {
          for (a = -100; a <= 100; a += ainc) {
            for (b = -100; b <= 100; b += binc) {
              lab = [l, a, b];
              rgb2 = labToRgb(lab);
              if (!validColor(rgb2, lab))
                continue;
              colorSamples.push(lab);
              samplesClosest.push(null);
            }
          }
        }
        var steps = settings.quality;
        var i, j;
        var A, B;
        var li = colorSamples.length, lj = colors.length;
        var d, minDistance, freeColorSamples, count, candidate, closest;
        while (steps-- > 0) {
          for (i = 0; i < li; i++) {
            B = colorSamples[i];
            minDistance = Infinity;
            for (j = 0; j < lj; j++) {
              A = colors[j];
              d = distance(A, B);
              if (d < minDistance) {
                minDistance = d;
                samplesClosest[i] = j;
              }
            }
          }
          freeColorSamples = colorSamples.slice();
          for (j = 0; j < lj; j++) {
            count = 0;
            candidate = [0, 0, 0];
            for (i = 0; i < li; i++) {
              if (samplesClosest[i] === j) {
                count++;
                candidate[0] += colorSamples[i][0];
                candidate[1] += colorSamples[i][1];
                candidate[2] += colorSamples[i][2];
              }
            }
            if (count !== 0) {
              candidate[0] /= count;
              candidate[1] /= count;
              candidate[2] /= count;
              rgb2 = labToRgb(candidate);
              if (validColor(rgb2, candidate)) {
                colors[j] = candidate;
              } else {
                if (freeColorSamples.length > 0) {
                  minDistance = Infinity;
                  closest = -1;
                  for (i = 0; i < freeColorSamples.length; i++) {
                    d = distance(freeColorSamples[i], candidate);
                    if (d < minDistance) {
                      minDistance = d;
                      closest = i;
                    }
                  }
                  colors[j] = colorSamples[closest];
                } else {
                  minDistance = Infinity;
                  closest = -1;
                  for (i = 0; i < colorSamples.length; i++) {
                    d = distance(colorSamples[i], candidate);
                    if (d < minDistance) {
                      minDistance = d;
                      closest = i;
                    }
                  }
                  colors[j] = colorSamples[closest];
                }
                freeColorSamples = freeColorSamples.filter(function(color2) {
                  return color2[0] !== colors[j][0] || color2[1] !== colors[j][1] || color2[2] !== colors[j][2];
                });
              }
            }
          }
        }
        return colors;
      }
      module.exports = function generatePalette(count, settings) {
        if (typeof count !== "number" || count < 1)
          throw new Error("iwanthue: expecting a color count > 1.");
        settings = resolveAndValidateSettings(settings);
        var random = new Random(settings.seed);
        var rng = function() {
          return random.nextFloat();
        };
        var distances = new CachedDistances();
        var distance = distances.get(settings.distance);
        var validColor = function(rgb2, lab) {
          if (!validateRgb(rgb2))
            return false;
          if (!settings.colorFilter)
            return true;
          if (!settings.colorFilter(rgb2, lab))
            return false;
          return true;
        };
        var colors;
        if (count === 1) {
          colors = sampleLabColors(rng, count, validColor);
          return [labToRgbHex(colors[0])];
        }
        var attempts = settings.attempts;
        var metrics;
        var bestMetric = -Infinity, best;
        while (attempts > 0) {
          colors = sampleLabColors(rng, count, validColor);
          if (settings.clustering === "force-vector")
            forceVector(rng, distance, validColor, colors, settings);
          else
            kMeans(distance, validColor, colors, settings);
          metrics = helpers.computeQualityMetrics(distance, colors);
          if (metrics.min > bestMetric) {
            bestMetric = metrics.min;
            best = colors;
          }
          attempts--;
        }
        colors = best;
        colors = diffSort(distance, colors);
        return colors.map(labToRgbHex);
      };
    }
  });

  // src/data_wrangling/data_extraction.ts
  var browser = require_browser_polyfill();
  async function getDateData(date2) {
    const uuids = (await browser.storage.local.get(date2))[date2];
    const date_data = uuids.map(async (uuid, _) => {
      const details = (await browser.storage.local.get(uuid))[uuid];
      const uuid_date_key = JSON.stringify([uuid, date2]);
      let stats_entry = (await browser.storage.local.get(uuid_date_key))[uuid_date_key];
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
        "date": date2,
        ...stats_entry
      };
    });
    return Promise.all(date_data);
  }
  async function getData() {
    const dates = await browser.storage.local.get("immersion_dates");
    if (!dates.hasOwnProperty("immersion_dates")) {
      return;
    }
    const data = await Promise.all(dates["immersion_dates"].map(getDateData));
    return data.flat();
  }

  // node_modules/svelte/internal/index.mjs
  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  var is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    node.parentNode.removeChild(node);
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i])
        iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function svg_element(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.wholeText !== data)
      text2.data = data;
  }
  function set_style(node, key, value, important) {
    if (value === null) {
      node.style.removeProperty(key);
    } else {
      node.style.setProperty(key, value, important ? "important" : "");
    }
  }
  var crossorigin;
  function is_crossorigin() {
    if (crossorigin === void 0) {
      crossorigin = false;
      try {
        if (typeof window !== "undefined" && window.parent) {
          void window.parent.document;
        }
      } catch (error) {
        crossorigin = true;
      }
    }
    return crossorigin;
  }
  function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === "static") {
      node.style.position = "relative";
    }
    const iframe = element("iframe");
    iframe.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;");
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    const crossorigin2 = is_crossorigin();
    let unsubscribe;
    if (crossorigin2) {
      iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>";
      unsubscribe = listen(window, "message", (event) => {
        if (event.source === iframe.contentWindow)
          fn();
      });
    } else {
      iframe.src = "about:blank";
      iframe.onload = () => {
        unsubscribe = listen(iframe.contentWindow, "resize", fn);
      };
    }
    append(node, iframe);
    return () => {
      if (crossorigin2) {
        unsubscribe();
      } else if (unsubscribe && iframe.contentWindow) {
        unsubscribe();
      }
      detach(iframe);
    };
  }
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  function add_flush_callback(fn) {
    flush_callbacks.push(fn);
  }
  var seen_callbacks = /* @__PURE__ */ new Set();
  var flushidx = 0;
  function flush() {
    const saved_component = current_component;
    do {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  var outroing = /* @__PURE__ */ new Set();
  var outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
  function bind(component, name, callback) {
    const index2 = component.$$.props[name];
    if (index2 !== void 0) {
      component.$$.bound[index2] = callback;
      callback(component.$$.ctx[index2]);
    }
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
          on_destroy.push(...new_on_destroy);
        } else {
          run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance8, create_fragment8, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: null,
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance8 ? instance8(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment8 ? create_fragment8($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        const { on_mount } = this.$$;
        this.$$.on_disconnect = on_mount.map(run).filter(is_function);
        for (const key in this.$$.slotted) {
          this.appendChild(this.$$.slotted[key]);
        }
      }
      attributeChangedCallback(attr2, _oldValue, newValue) {
        this[attr2] = newValue;
      }
      disconnectedCallback() {
        run_all(this.$$.on_disconnect);
      }
      $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
      $on(type, callback) {
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index2 = callbacks.indexOf(callback);
          if (index2 !== -1)
            callbacks.splice(index2, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    };
  }
  var SvelteComponent = class {
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };

  // node_modules/d3-selection/src/namespaces.js
  var xhtml = "http://www.w3.org/1999/xhtml";
  var namespaces_default = {
    svg: "http://www.w3.org/2000/svg",
    xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  // node_modules/d3-selection/src/namespace.js
  function namespace_default(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
      name = name.slice(i + 1);
    return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
  }

  // node_modules/d3-selection/src/creator.js
  function creatorInherit(name) {
    return function() {
      var document2 = this.ownerDocument, uri = this.namespaceURI;
      return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
    };
  }
  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }
  function creator_default(name) {
    var fullname = namespace_default(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
  }

  // node_modules/d3-selection/src/selector.js
  function none() {
  }
  function selector_default(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  // node_modules/d3-selection/src/selection/select.js
  function select_default(select) {
    if (typeof select !== "function")
      select = selector_default(select);
    for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group2[i]) && (subnode = select.call(node, node.__data__, i, group2))) {
          if ("__data__" in node)
            subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }

  // node_modules/d3-selection/src/array.js
  function array(x2) {
    return x2 == null ? [] : Array.isArray(x2) ? x2 : Array.from(x2);
  }

  // node_modules/d3-selection/src/selectorAll.js
  function empty2() {
    return [];
  }
  function selectorAll_default(selector) {
    return selector == null ? empty2 : function() {
      return this.querySelectorAll(selector);
    };
  }

  // node_modules/d3-selection/src/selection/selectAll.js
  function arrayAll(select) {
    return function() {
      return array(select.apply(this, arguments));
    };
  }
  function selectAll_default(select) {
    if (typeof select === "function")
      select = arrayAll(select);
    else
      select = selectorAll_default(select);
    for (var groups2 = this._groups, m = groups2.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          subgroups.push(select.call(node, node.__data__, i, group2));
          parents.push(node);
        }
      }
    }
    return new Selection(subgroups, parents);
  }

  // node_modules/d3-selection/src/matcher.js
  function matcher_default(selector) {
    return function() {
      return this.matches(selector);
    };
  }
  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  // node_modules/d3-selection/src/selection/selectChild.js
  var find = Array.prototype.find;
  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }
  function childFirst() {
    return this.firstElementChild;
  }
  function selectChild_default(match) {
    return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  // node_modules/d3-selection/src/selection/selectChildren.js
  var filter = Array.prototype.filter;
  function children2() {
    return Array.from(this.children);
  }
  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }
  function selectChildren_default(match) {
    return this.selectAll(match == null ? children2 : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  // node_modules/d3-selection/src/selection/filter.js
  function filter_default(match) {
    if (typeof match !== "function")
      match = matcher_default(match);
    for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group2[i]) && match.call(node, node.__data__, i, group2)) {
          subgroup.push(node);
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }

  // node_modules/d3-selection/src/selection/sparse.js
  function sparse_default(update2) {
    return new Array(update2.length);
  }

  // node_modules/d3-selection/src/selection/enter.js
  function enter_default() {
    return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
  }
  function EnterNode(parent, datum2) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum2;
  }
  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) {
      return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function(child, next) {
      return this._parent.insertBefore(child, next);
    },
    querySelector: function(selector) {
      return this._parent.querySelector(selector);
    },
    querySelectorAll: function(selector) {
      return this._parent.querySelectorAll(selector);
    }
  };

  // node_modules/d3-selection/src/constant.js
  function constant_default(x2) {
    return function() {
      return x2;
    };
  }

  // node_modules/d3-selection/src/selection/data.js
  function bindIndex(parent, group2, enter, update2, exit, data) {
    var i = 0, node, groupLength = group2.length, dataLength = data.length;
    for (; i < dataLength; ++i) {
      if (node = group2[i]) {
        node.__data__ = data[i];
        update2[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }
    for (; i < groupLength; ++i) {
      if (node = group2[i]) {
        exit[i] = node;
      }
    }
  }
  function bindKey(parent, group2, enter, update2, exit, data, key) {
    var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group2.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    for (i = 0; i < groupLength; ++i) {
      if (node = group2[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group2) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update2[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }
    for (i = 0; i < groupLength; ++i) {
      if ((node = group2[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
        exit[i] = node;
      }
    }
  }
  function datum(node) {
    return node.__data__;
  }
  function data_default(value, key) {
    if (!arguments.length)
      return Array.from(this, datum);
    var bind2 = key ? bindKey : bindIndex, parents = this._parents, groups2 = this._groups;
    if (typeof value !== "function")
      value = constant_default(value);
    for (var m = groups2.length, update2 = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j], group2 = groups2[j], groupLength = group2.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update2[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
      bind2(parent, group2, enterGroup, updateGroup, exitGroup, data, key);
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1)
            i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength)
            ;
          previous._next = next || null;
        }
      }
    }
    update2 = new Selection(update2, parents);
    update2._enter = enter;
    update2._exit = exit;
    return update2;
  }
  function arraylike(data) {
    return typeof data === "object" && "length" in data ? data : Array.from(data);
  }

  // node_modules/d3-selection/src/selection/exit.js
  function exit_default() {
    return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
  }

  // node_modules/d3-selection/src/selection/join.js
  function join_default(onenter, onupdate, onexit) {
    var enter = this.enter(), update2 = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter)
        enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update2 = onupdate(update2);
      if (update2)
        update2 = update2.selection();
    }
    if (onexit == null)
      exit.remove();
    else
      onexit(exit);
    return enter && update2 ? enter.merge(update2).order() : update2;
  }

  // node_modules/d3-selection/src/selection/merge.js
  function merge_default(context) {
    var selection2 = context.selection ? context.selection() : context;
    for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }
    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }
    return new Selection(merges, this._parents);
  }

  // node_modules/d3-selection/src/selection/order.js
  function order_default() {
    for (var groups2 = this._groups, j = -1, m = groups2.length; ++j < m; ) {
      for (var group2 = groups2[j], i = group2.length - 1, next = group2[i], node; --i >= 0; ) {
        if (node = group2[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4)
            next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  }

  // node_modules/d3-selection/src/selection/sort.js
  function sort_default(compare) {
    if (!compare)
      compare = ascending;
    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }
    for (var groups2 = this._groups, m = groups2.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }
    return new Selection(sortgroups, this._parents).order();
  }
  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  // node_modules/d3-selection/src/selection/call.js
  function call_default() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  // node_modules/d3-selection/src/selection/nodes.js
  function nodes_default() {
    return Array.from(this);
  }

  // node_modules/d3-selection/src/selection/node.js
  function node_default() {
    for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
      for (var group2 = groups2[j], i = 0, n = group2.length; i < n; ++i) {
        var node = group2[i];
        if (node)
          return node;
      }
    }
    return null;
  }

  // node_modules/d3-selection/src/selection/size.js
  function size_default() {
    let size = 0;
    for (const node of this)
      ++size;
    return size;
  }

  // node_modules/d3-selection/src/selection/empty.js
  function empty_default() {
    return !this.node();
  }

  // node_modules/d3-selection/src/selection/each.js
  function each_default(callback) {
    for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
      for (var group2 = groups2[j], i = 0, n = group2.length, node; i < n; ++i) {
        if (node = group2[i])
          callback.call(node, node.__data__, i, group2);
      }
    }
    return this;
  }

  // node_modules/d3-selection/src/selection/attr.js
  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }
  function attrConstantNS(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }
  function attrFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.removeAttribute(name);
      else
        this.setAttribute(name, v);
    };
  }
  function attrFunctionNS(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.removeAttributeNS(fullname.space, fullname.local);
      else
        this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }
  function attr_default(name, value) {
    var fullname = namespace_default(name);
    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }
    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
  }

  // node_modules/d3-selection/src/window.js
  function window_default(node) {
    return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
  }

  // node_modules/d3-selection/src/selection/style.js
  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }
  function styleFunction(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.style.removeProperty(name);
      else
        this.style.setProperty(name, v, priority);
    };
  }
  function style_default(name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
  }
  function styleValue(node, name) {
    return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  // node_modules/d3-selection/src/selection/property.js
  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }
  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }
  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        delete this[name];
      else
        this[name] = v;
    };
  }
  function property_default(name, value) {
    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
  }

  // node_modules/d3-selection/src/selection/classed.js
  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }
  function classList(node) {
    return node.classList || new ClassList(node);
  }
  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }
  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };
  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n)
      list.add(names[i]);
  }
  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n)
      list.remove(names[i]);
  }
  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }
  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }
  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }
  function classed_default(name, value) {
    var names = classArray(name + "");
    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n)
        if (!list.contains(names[i]))
          return false;
      return true;
    }
    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
  }

  // node_modules/d3-selection/src/selection/text.js
  function textRemove() {
    this.textContent = "";
  }
  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }
  function text_default(value) {
    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
  }

  // node_modules/d3-selection/src/selection/html.js
  function htmlRemove() {
    this.innerHTML = "";
  }
  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }
  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }
  function html_default(value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
  }

  // node_modules/d3-selection/src/selection/raise.js
  function raise() {
    if (this.nextSibling)
      this.parentNode.appendChild(this);
  }
  function raise_default() {
    return this.each(raise);
  }

  // node_modules/d3-selection/src/selection/lower.js
  function lower() {
    if (this.previousSibling)
      this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function lower_default() {
    return this.each(lower);
  }

  // node_modules/d3-selection/src/selection/append.js
  function append_default(name) {
    var create = typeof name === "function" ? name : creator_default(name);
    return this.select(function() {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  // node_modules/d3-selection/src/selection/insert.js
  function constantNull() {
    return null;
  }
  function insert_default(name, before) {
    var create = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
    return this.select(function() {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  // node_modules/d3-selection/src/selection/remove.js
  function remove() {
    var parent = this.parentNode;
    if (parent)
      parent.removeChild(this);
  }
  function remove_default() {
    return this.each(remove);
  }

  // node_modules/d3-selection/src/selection/clone.js
  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function clone_default(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  // node_modules/d3-selection/src/selection/datum.js
  function datum_default(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
  }

  // node_modules/d3-selection/src/selection/on.js
  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }
  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0)
        name = t.slice(i + 1), t = t.slice(0, i);
      return { type: t, name };
    });
  }
  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on)
        return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i)
        on.length = i;
      else
        delete this.__on;
    };
  }
  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on)
        for (var j = 0, m = on.length; j < m; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
            this.addEventListener(o.type, o.listener = listener, o.options = options);
            o.value = value;
            return;
          }
        }
      this.addEventListener(typename.type, listener, options);
      o = { type: typename.type, name: typename.name, value, listener, options };
      if (!on)
        this.__on = [o];
      else
        on.push(o);
    };
  }
  function on_default(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on)
        for (var j = 0, m = on.length, o; j < m; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
      return;
    }
    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i)
      this.each(on(typenames[i], value, options));
    return this;
  }

  // node_modules/d3-selection/src/selection/dispatch.js
  function dispatchEvent(node, type, params) {
    var window2 = window_default(node), event = window2.CustomEvent;
    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window2.document.createEvent("Event");
      if (params)
        event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else
        event.initEvent(type, false, false);
    }
    node.dispatchEvent(event);
  }
  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }
  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }
  function dispatch_default(type, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
  }

  // node_modules/d3-selection/src/selection/iterator.js
  function* iterator_default() {
    for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
      for (var group2 = groups2[j], i = 0, n = group2.length, node; i < n; ++i) {
        if (node = group2[i])
          yield node;
      }
    }
  }

  // node_modules/d3-selection/src/selection/index.js
  var root = [null];
  function Selection(groups2, parents) {
    this._groups = groups2;
    this._parents = parents;
  }
  function selection() {
    return new Selection([[document.documentElement]], root);
  }
  function selection_selection() {
    return this;
  }
  Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: select_default,
    selectAll: selectAll_default,
    selectChild: selectChild_default,
    selectChildren: selectChildren_default,
    filter: filter_default,
    data: data_default,
    enter: enter_default,
    exit: exit_default,
    join: join_default,
    merge: merge_default,
    selection: selection_selection,
    order: order_default,
    sort: sort_default,
    call: call_default,
    nodes: nodes_default,
    node: node_default,
    size: size_default,
    empty: empty_default,
    each: each_default,
    attr: attr_default,
    style: style_default,
    property: property_default,
    classed: classed_default,
    text: text_default,
    html: html_default,
    raise: raise_default,
    lower: lower_default,
    append: append_default,
    insert: insert_default,
    remove: remove_default,
    clone: clone_default,
    datum: datum_default,
    on: on_default,
    dispatch: dispatch_default,
    [Symbol.iterator]: iterator_default
  };

  // node_modules/d3-selection/src/select.js
  function select_default2(selector) {
    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
  }

  // node_modules/d3-axis/src/identity.js
  function identity_default(x2) {
    return x2;
  }

  // node_modules/d3-axis/src/axis.js
  var top = 1;
  var right = 2;
  var bottom = 3;
  var left = 4;
  var epsilon = 1e-6;
  function translateX(x2) {
    return "translate(" + x2 + ",0)";
  }
  function translateY(y2) {
    return "translate(0," + y2 + ")";
  }
  function number(scale) {
    return (d) => +scale(d);
  }
  function center(scale, offset) {
    offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
    if (scale.round())
      offset = Math.round(offset);
    return (d) => +scale(d) + offset;
  }
  function entering() {
    return !this.__axis;
  }
  function axis(orient, scale) {
    var tickArguments = [], tickValues = null, tickFormat2 = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5, k = orient === top || orient === left ? -1 : 1, x2 = orient === left || orient === right ? "x" : "y", transform = orient === top || orient === bottom ? translateX : translateY;
    function axis2(context) {
      var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format2 = tickFormat2 == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity_default : tickFormat2, spacing = Math.max(tickSizeInner, 0) + tickPadding, range = scale.range(), range0 = +range[0] + offset, range1 = +range[range.length - 1] + offset, position = (scale.bandwidth ? center : number)(scale.copy(), offset), selection2 = context.selection ? context.selection() : context, path2 = selection2.selectAll(".domain").data([null]), tick = selection2.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text2 = tick.select("text");
      path2 = path2.merge(path2.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
      tick = tick.merge(tickEnter);
      line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x2 + "2", k * tickSizeInner));
      text2 = text2.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x2, k * spacing).attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
      if (context !== selection2) {
        path2 = path2.transition(context);
        tick = tick.transition(context);
        line = line.transition(context);
        text2 = text2.transition(context);
        tickExit = tickExit.transition(context).attr("opacity", epsilon).attr("transform", function(d) {
          return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform");
        });
        tickEnter.attr("opacity", epsilon).attr("transform", function(d) {
          var p = this.parentNode.__axis;
          return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset);
        });
      }
      tickExit.remove();
      path2.attr("d", orient === left || orient === right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1);
      tick.attr("opacity", 1).attr("transform", function(d) {
        return transform(position(d) + offset);
      });
      line.attr(x2 + "2", k * tickSizeInner);
      text2.attr(x2, k * spacing).text(format2);
      selection2.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
      selection2.each(function() {
        this.__axis = position;
      });
    }
    axis2.scale = function(_) {
      return arguments.length ? (scale = _, axis2) : scale;
    };
    axis2.ticks = function() {
      return tickArguments = Array.from(arguments), axis2;
    };
    axis2.tickArguments = function(_) {
      return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis2) : tickArguments.slice();
    };
    axis2.tickValues = function(_) {
      return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis2) : tickValues && tickValues.slice();
    };
    axis2.tickFormat = function(_) {
      return arguments.length ? (tickFormat2 = _, axis2) : tickFormat2;
    };
    axis2.tickSize = function(_) {
      return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis2) : tickSizeInner;
    };
    axis2.tickSizeInner = function(_) {
      return arguments.length ? (tickSizeInner = +_, axis2) : tickSizeInner;
    };
    axis2.tickSizeOuter = function(_) {
      return arguments.length ? (tickSizeOuter = +_, axis2) : tickSizeOuter;
    };
    axis2.tickPadding = function(_) {
      return arguments.length ? (tickPadding = +_, axis2) : tickPadding;
    };
    axis2.offset = function(_) {
      return arguments.length ? (offset = +_, axis2) : offset;
    };
    return axis2;
  }
  function axisTop(scale) {
    return axis(top, scale);
  }
  function axisRight(scale) {
    return axis(right, scale);
  }
  function axisBottom(scale) {
    return axis(bottom, scale);
  }
  function axisLeft(scale) {
    return axis(left, scale);
  }

  // src/stats/line_axis.svelte
  function create_if_block_3(ctx) {
    let text_1;
    let t;
    let text_1_x_value;
    let text_1_y_value;
    return {
      c() {
        text_1 = svg_element("text");
        t = text(ctx[4]);
        attr(text_1, "x", text_1_x_value = (ctx[0] + ctx[2]) * -0.5);
        attr(text_1, "y", text_1_y_value = ctx[2] - 30);
        attr(text_1, "fill", "grey");
        attr(text_1, "transform", "rotate(-90)");
      },
      m(target, anchor) {
        insert(target, text_1, anchor);
        append(text_1, t);
      },
      p(ctx2, dirty) {
        if (dirty & 16)
          set_data(t, ctx2[4]);
        if (dirty & 5 && text_1_x_value !== (text_1_x_value = (ctx2[0] + ctx2[2]) * -0.5)) {
          attr(text_1, "x", text_1_x_value);
        }
        if (dirty & 4 && text_1_y_value !== (text_1_y_value = ctx2[2] - 30)) {
          attr(text_1, "y", text_1_y_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(text_1);
      }
    };
  }
  function create_if_block_2(ctx) {
    let text_1;
    let t;
    let text_1_x_value;
    let text_1_y_value;
    return {
      c() {
        text_1 = svg_element("text");
        t = text(ctx[4]);
        attr(text_1, "x", text_1_x_value = (ctx[1] + ctx[2]) / 2);
        attr(text_1, "y", text_1_y_value = ctx[0] - ctx[2] + 45);
        attr(text_1, "fill", "grey");
      },
      m(target, anchor) {
        insert(target, text_1, anchor);
        append(text_1, t);
      },
      p(ctx2, dirty) {
        if (dirty & 16)
          set_data(t, ctx2[4]);
        if (dirty & 6 && text_1_x_value !== (text_1_x_value = (ctx2[1] + ctx2[2]) / 2)) {
          attr(text_1, "x", text_1_x_value);
        }
        if (dirty & 5 && text_1_y_value !== (text_1_y_value = ctx2[0] - ctx2[2] + 45)) {
          attr(text_1, "y", text_1_y_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(text_1);
      }
    };
  }
  function create_if_block_1(ctx) {
    let text_1;
    let t;
    let text_1_x_value;
    let text_1_y_value;
    return {
      c() {
        text_1 = svg_element("text");
        t = text(ctx[4]);
        attr(text_1, "x", text_1_x_value = (ctx[0] + ctx[2]) * -0.5);
        attr(text_1, "y", text_1_y_value = ctx[1] - 10);
        attr(text_1, "fill", "grey");
        attr(text_1, "transform", "rotate(-90)");
      },
      m(target, anchor) {
        insert(target, text_1, anchor);
        append(text_1, t);
      },
      p(ctx2, dirty) {
        if (dirty & 16)
          set_data(t, ctx2[4]);
        if (dirty & 5 && text_1_x_value !== (text_1_x_value = (ctx2[0] + ctx2[2]) * -0.5)) {
          attr(text_1, "x", text_1_x_value);
        }
        if (dirty & 2 && text_1_y_value !== (text_1_y_value = ctx2[1] - 10)) {
          attr(text_1, "y", text_1_y_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(text_1);
      }
    };
  }
  function create_if_block(ctx) {
    let text_1;
    let t;
    let text_1_x_value;
    let text_1_y_value;
    return {
      c() {
        text_1 = svg_element("text");
        t = text(ctx[4]);
        attr(text_1, "x", text_1_x_value = (ctx[1] + ctx[2]) / 2);
        attr(text_1, "y", text_1_y_value = 30);
        attr(text_1, "fill", "grey");
      },
      m(target, anchor) {
        insert(target, text_1, anchor);
        append(text_1, t);
      },
      p(ctx2, dirty) {
        if (dirty & 16)
          set_data(t, ctx2[4]);
        if (dirty & 6 && text_1_x_value !== (text_1_x_value = (ctx2[1] + ctx2[2]) / 2)) {
          attr(text_1, "x", text_1_x_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(text_1);
      }
    };
  }
  function create_fragment(ctx) {
    let g;
    let g_transform_value;
    let t;
    let if_block_anchor;
    function select_block_type(ctx2, dirty) {
      if (ctx2[3] === "top")
        return create_if_block;
      if (ctx2[3] === "right")
        return create_if_block_1;
      if (ctx2[3] === "bottom")
        return create_if_block_2;
      if (ctx2[3] === "left")
        return create_if_block_3;
    }
    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type && current_block_type(ctx);
    return {
      c() {
        g = svg_element("g");
        t = space();
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
        attr(g, "color", "grey");
        attr(g, "transform", g_transform_value = "translate(" + ctx[6] + ")");
      },
      m(target, anchor) {
        insert(target, g, anchor);
        ctx[9](g);
        insert(target, t, anchor);
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, [dirty]) {
        if (dirty & 64 && g_transform_value !== (g_transform_value = "translate(" + ctx2[6] + ")")) {
          attr(g, "transform", g_transform_value);
        }
        if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if (if_block)
            if_block.d(1);
          if_block = current_block_type && current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(g);
        ctx[9](null);
        if (detaching)
          detach(t);
        if (if_block) {
          if_block.d(detaching);
        }
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    let { scale } = $$props;
    let { height, width, margin } = $$props;
    let { position } = $$props;
    let { formater } = $$props;
    let { label = "" } = $$props;
    let axis2;
    let transform = "0,0";
    const positionedAxis = () => {
      if (position === "top") {
        return axisTop(scale);
      } else if (position == "right") {
        return axisRight(scale);
      } else if (position === "bottom") {
        return axisBottom(scale);
      } else if (position == "left") {
        return axisLeft(scale);
      }
    };
    const transitionAxis = () => {
      if (position === "top") {
        $$invalidate(6, transform = `0,${margin}`);
      } else if (position == "right") {
        $$invalidate(6, transform = `${width - margin},0`);
      } else if (position === "bottom") {
        $$invalidate(6, transform = `0,${height - margin}`);
      } else if (position == "left") {
        $$invalidate(6, transform = `${margin},0`);
      }
    };
    const setupAxis = () => {
      const axis_creator = positionedAxis().tickSizeOuter(0).tickSize(0).tickFormat(formater);
      axis_creator(select_default2(axis2));
      transitionAxis();
    };
    function g_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        axis2 = $$value;
        $$invalidate(5, axis2);
      });
    }
    $$self.$$set = ($$props2) => {
      if ("scale" in $$props2)
        $$invalidate(7, scale = $$props2.scale);
      if ("height" in $$props2)
        $$invalidate(0, height = $$props2.height);
      if ("width" in $$props2)
        $$invalidate(1, width = $$props2.width);
      if ("margin" in $$props2)
        $$invalidate(2, margin = $$props2.margin);
      if ("position" in $$props2)
        $$invalidate(3, position = $$props2.position);
      if ("formater" in $$props2)
        $$invalidate(8, formater = $$props2.formater);
      if ("label" in $$props2)
        $$invalidate(4, label = $$props2.label);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & 431) {
        $:
          if (scale && height && width && margin && position && formater && axis2)
            setupAxis();
      }
    };
    return [
      height,
      width,
      margin,
      position,
      label,
      axis2,
      transform,
      scale,
      formater,
      g_binding
    ];
  }
  var Line_axis = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment, safe_not_equal, {
        scale: 7,
        height: 0,
        width: 1,
        margin: 2,
        position: 3,
        formater: 8,
        label: 4
      });
    }
  };
  var line_axis_default = Line_axis;

  // src/stats/circles.svelte
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[3] = list[i].x;
    child_ctx[4] = list[i].y;
    child_ctx[5] = list[i].r;
    child_ctx[6] = list[i].c;
    child_ctx[7] = list[i].i;
    return child_ctx;
  }
  function create_each_block(ctx) {
    let circle;
    let circle_data_index_value;
    let circle_cx_value;
    let circle_cy_value;
    let circle_r_value;
    let circle_fill_value;
    let mounted;
    let dispose;
    return {
      c() {
        circle = svg_element("circle");
        attr(circle, "data-index", circle_data_index_value = ctx[7]);
        attr(circle, "cx", circle_cx_value = ctx[3]);
        attr(circle, "cy", circle_cy_value = ctx[4]);
        attr(circle, "r", circle_r_value = ctx[5]);
        attr(circle, "fill", circle_fill_value = ctx[6]);
        attr(circle, "fill-opacity", "0.8");
        attr(circle, "class", "z-10");
      },
      m(target, anchor) {
        insert(target, circle, anchor);
        if (!mounted) {
          dispose = [
            listen(circle, "mousemove", function() {
              if (is_function(ctx[1]))
                ctx[1].apply(this, arguments);
            }),
            listen(circle, "mouseout", function() {
              if (is_function(ctx[2]))
                ctx[2].apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & 1 && circle_data_index_value !== (circle_data_index_value = ctx[7])) {
          attr(circle, "data-index", circle_data_index_value);
        }
        if (dirty & 1 && circle_cx_value !== (circle_cx_value = ctx[3])) {
          attr(circle, "cx", circle_cx_value);
        }
        if (dirty & 1 && circle_cy_value !== (circle_cy_value = ctx[4])) {
          attr(circle, "cy", circle_cy_value);
        }
        if (dirty & 1 && circle_r_value !== (circle_r_value = ctx[5])) {
          attr(circle, "r", circle_r_value);
        }
        if (dirty & 1 && circle_fill_value !== (circle_fill_value = ctx[6])) {
          attr(circle, "fill", circle_fill_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(circle);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_fragment2(ctx) {
    let each_1_anchor;
    let each_value = ctx[0];
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(target, anchor);
        }
        insert(target, each_1_anchor, anchor);
      },
      p(ctx2, [dirty]) {
        if (dirty & 7) {
          each_value = ctx2[0];
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(each_1_anchor);
      }
    };
  }
  function instance2($$self, $$props, $$invalidate) {
    let { mapped_data } = $$props;
    let { mouse_move, mouse_out } = $$props;
    $$self.$$set = ($$props2) => {
      if ("mapped_data" in $$props2)
        $$invalidate(0, mapped_data = $$props2.mapped_data);
      if ("mouse_move" in $$props2)
        $$invalidate(1, mouse_move = $$props2.mouse_move);
      if ("mouse_out" in $$props2)
        $$invalidate(2, mouse_out = $$props2.mouse_out);
    };
    return [mapped_data, mouse_move, mouse_out];
  }
  var Circles = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment2, safe_not_equal, {
        mapped_data: 0,
        mouse_move: 1,
        mouse_out: 2
      });
    }
  };
  var circles_default = Circles;

  // node_modules/d3-path/src/path.js
  var pi = Math.PI;
  var tau = 2 * pi;
  var epsilon2 = 1e-6;
  var tauEpsilon = tau - epsilon2;
  function Path() {
    this._x0 = this._y0 = this._x1 = this._y1 = null;
    this._ = "";
  }
  function path() {
    return new Path();
  }
  Path.prototype = path.prototype = {
    constructor: Path,
    moveTo: function(x2, y2) {
      this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2);
    },
    closePath: function() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._ += "Z";
      }
    },
    lineTo: function(x2, y2) {
      this._ += "L" + (this._x1 = +x2) + "," + (this._y1 = +y2);
    },
    quadraticCurveTo: function(x1, y1, x2, y2) {
      this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x2) + "," + (this._y1 = +y2);
    },
    bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
      this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x3) + "," + (this._y1 = +y3);
    },
    arcTo: function(x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
      var x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
      if (r < 0)
        throw new Error("negative radius: " + r);
      if (this._x1 === null) {
        this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
      } else if (!(l01_2 > epsilon2))
        ;
      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon2) || !r) {
        this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
      } else {
        var x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
        if (Math.abs(t01 - 1) > epsilon2) {
          this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
        }
        this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
      }
    },
    arc: function(x2, y2, r, a0, a1, ccw) {
      x2 = +x2, y2 = +y2, r = +r, ccw = !!ccw;
      var dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
      if (r < 0)
        throw new Error("negative radius: " + r);
      if (this._x1 === null) {
        this._ += "M" + x0 + "," + y0;
      } else if (Math.abs(this._x1 - x0) > epsilon2 || Math.abs(this._y1 - y0) > epsilon2) {
        this._ += "L" + x0 + "," + y0;
      }
      if (!r)
        return;
      if (da < 0)
        da = da % tau + tau;
      if (da > tauEpsilon) {
        this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x2 - dx) + "," + (y2 - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
      } else if (da > epsilon2) {
        this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x2 + r * Math.cos(a1)) + "," + (this._y1 = y2 + r * Math.sin(a1));
      }
    },
    rect: function(x2, y2, w, h) {
      this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2) + "h" + +w + "v" + +h + "h" + -w + "Z";
    },
    toString: function() {
      return this._;
    }
  };
  var path_default = path;

  // node_modules/d3-shape/src/constant.js
  function constant_default2(x2) {
    return function constant() {
      return x2;
    };
  }

  // node_modules/d3-shape/src/array.js
  var slice = Array.prototype.slice;
  function array_default(x2) {
    return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
  }

  // node_modules/d3-shape/src/curve/linear.js
  function Linear(context) {
    this._context = context;
  }
  Linear.prototype = {
    areaStart: function() {
      this._line = 0;
    },
    areaEnd: function() {
      this._line = NaN;
    },
    lineStart: function() {
      this._point = 0;
    },
    lineEnd: function() {
      if (this._line || this._line !== 0 && this._point === 1)
        this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function(x2, y2) {
      x2 = +x2, y2 = +y2;
      switch (this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
          break;
        case 1:
          this._point = 2;
        default:
          this._context.lineTo(x2, y2);
          break;
      }
    }
  };
  function linear_default(context) {
    return new Linear(context);
  }

  // node_modules/d3-shape/src/point.js
  function x(p) {
    return p[0];
  }
  function y(p) {
    return p[1];
  }

  // node_modules/d3-shape/src/line.js
  function line_default(x2, y2) {
    var defined = constant_default2(true), context = null, curve = linear_default, output = null;
    x2 = typeof x2 === "function" ? x2 : x2 === void 0 ? x : constant_default2(x2);
    y2 = typeof y2 === "function" ? y2 : y2 === void 0 ? y : constant_default2(y2);
    function line(data) {
      var i, n = (data = array_default(data)).length, d, defined0 = false, buffer;
      if (context == null)
        output = curve(buffer = path_default());
      for (i = 0; i <= n; ++i) {
        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
          if (defined0 = !defined0)
            output.lineStart();
          else
            output.lineEnd();
        }
        if (defined0)
          output.point(+x2(d, i, data), +y2(d, i, data));
      }
      if (buffer)
        return output = null, buffer + "" || null;
    }
    line.x = function(_) {
      return arguments.length ? (x2 = typeof _ === "function" ? _ : constant_default2(+_), line) : x2;
    };
    line.y = function(_) {
      return arguments.length ? (y2 = typeof _ === "function" ? _ : constant_default2(+_), line) : y2;
    };
    line.defined = function(_) {
      return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default2(!!_), line) : defined;
    };
    line.curve = function(_) {
      return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
    };
    line.context = function(_) {
      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
    };
    return line;
  }

  // node_modules/d3-shape/src/curve/monotone.js
  function sign(x2) {
    return x2 < 0 ? -1 : 1;
  }
  function slope3(that, x2, y2) {
    var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
    return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
  }
  function slope2(that, t) {
    var h = that._x1 - that._x0;
    return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
  }
  function point(that, t02, t12) {
    var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
    that._context.bezierCurveTo(x0 + dx, y0 + dx * t02, x1 - dx, y1 - dx * t12, x1, y1);
  }
  function MonotoneX(context) {
    this._context = context;
  }
  MonotoneX.prototype = {
    areaStart: function() {
      this._line = 0;
    },
    areaEnd: function() {
      this._line = NaN;
    },
    lineStart: function() {
      this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
      this._point = 0;
    },
    lineEnd: function() {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x1, this._y1);
          break;
        case 3:
          point(this, this._t0, slope2(this, this._t0));
          break;
      }
      if (this._line || this._line !== 0 && this._point === 1)
        this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function(x2, y2) {
      var t12 = NaN;
      x2 = +x2, y2 = +y2;
      if (x2 === this._x1 && y2 === this._y1)
        return;
      switch (this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3;
          point(this, slope2(this, t12 = slope3(this, x2, y2)), t12);
          break;
        default:
          point(this, this._t0, t12 = slope3(this, x2, y2));
          break;
      }
      this._x0 = this._x1, this._x1 = x2;
      this._y0 = this._y1, this._y1 = y2;
      this._t0 = t12;
    }
  };
  function MonotoneY(context) {
    this._context = new ReflectContext(context);
  }
  (MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
    MonotoneX.prototype.point.call(this, y2, x2);
  };
  function ReflectContext(context) {
    this._context = context;
  }
  ReflectContext.prototype = {
    moveTo: function(x2, y2) {
      this._context.moveTo(y2, x2);
    },
    closePath: function() {
      this._context.closePath();
    },
    lineTo: function(x2, y2) {
      this._context.lineTo(y2, x2);
    },
    bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
      this._context.bezierCurveTo(y1, x1, y2, x2, y3, x3);
    }
  };
  function monotoneX(context) {
    return new MonotoneX(context);
  }

  // src/stats/line.svelte
  function create_fragment3(ctx) {
    let path2;
    return {
      c() {
        path2 = svg_element("path");
        attr(path2, "d", ctx[0]);
        attr(path2, "class", "fill-transparent");
        set_style(path2, "stroke", "grey");
      },
      m(target, anchor) {
        insert(target, path2, anchor);
      },
      p(ctx2, [dirty]) {
        if (dirty & 1) {
          attr(path2, "d", ctx2[0]);
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(path2);
      }
    };
  }
  function instance3($$self, $$props, $$invalidate) {
    let { data } = $$props;
    let { x_accessor, y_accessor } = $$props;
    let { x_scale, y_scale } = $$props;
    const make_line = (x_accessor2, y_accessor2, x_scale2, y_scale2, data2) => line_default().curve(monotoneX).x((d) => x_scale2(x_accessor2(d))).y((d) => y_scale2(y_accessor2(d)))(data2);
    let line_path;
    $$self.$$set = ($$props2) => {
      if ("data" in $$props2)
        $$invalidate(1, data = $$props2.data);
      if ("x_accessor" in $$props2)
        $$invalidate(2, x_accessor = $$props2.x_accessor);
      if ("y_accessor" in $$props2)
        $$invalidate(3, y_accessor = $$props2.y_accessor);
      if ("x_scale" in $$props2)
        $$invalidate(4, x_scale = $$props2.x_scale);
      if ("y_scale" in $$props2)
        $$invalidate(5, y_scale = $$props2.y_scale);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & 62) {
        $:
          $$invalidate(0, line_path = make_line(x_accessor, y_accessor, x_scale, y_scale, data));
      }
    };
    return [line_path, data, x_accessor, y_accessor, x_scale, y_scale];
  }
  var Line = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance3, create_fragment3, safe_not_equal, {
        data: 1,
        x_accessor: 2,
        y_accessor: 3,
        x_scale: 4,
        y_scale: 5
      });
    }
  };
  var line_default2 = Line;

  // node_modules/d3-time/src/interval.js
  var t0 = new Date();
  var t1 = new Date();
  function newInterval(floori, offseti, count, field) {
    function interval(date2) {
      return floori(date2 = arguments.length === 0 ? new Date() : new Date(+date2)), date2;
    }
    interval.floor = function(date2) {
      return floori(date2 = new Date(+date2)), date2;
    };
    interval.ceil = function(date2) {
      return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
    };
    interval.round = function(date2) {
      var d0 = interval(date2), d1 = interval.ceil(date2);
      return date2 - d0 < d1 - date2 ? d0 : d1;
    };
    interval.offset = function(date2, step) {
      return offseti(date2 = new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
    };
    interval.range = function(start, stop, step) {
      var range = [], previous;
      start = interval.ceil(start);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0))
        return range;
      do
        range.push(previous = new Date(+start)), offseti(start, step), floori(start);
      while (previous < start && start < stop);
      return range;
    };
    interval.filter = function(test) {
      return newInterval(function(date2) {
        if (date2 >= date2)
          while (floori(date2), !test(date2))
            date2.setTime(date2 - 1);
      }, function(date2, step) {
        if (date2 >= date2) {
          if (step < 0)
            while (++step <= 0) {
              while (offseti(date2, -1), !test(date2)) {
              }
            }
          else
            while (--step >= 0) {
              while (offseti(date2, 1), !test(date2)) {
              }
            }
        }
      });
    };
    if (count) {
      interval.count = function(start, end) {
        t0.setTime(+start), t1.setTime(+end);
        floori(t0), floori(t1);
        return Math.floor(count(t0, t1));
      };
      interval.every = function(step) {
        step = Math.floor(step);
        return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d) {
          return field(d) % step === 0;
        } : function(d) {
          return interval.count(0, d) % step === 0;
        });
      };
    }
    return interval;
  }

  // node_modules/d3-time/src/millisecond.js
  var millisecond = newInterval(function() {
  }, function(date2, step) {
    date2.setTime(+date2 + step);
  }, function(start, end) {
    return end - start;
  });
  millisecond.every = function(k) {
    k = Math.floor(k);
    if (!isFinite(k) || !(k > 0))
      return null;
    if (!(k > 1))
      return millisecond;
    return newInterval(function(date2) {
      date2.setTime(Math.floor(date2 / k) * k);
    }, function(date2, step) {
      date2.setTime(+date2 + step * k);
    }, function(start, end) {
      return (end - start) / k;
    });
  };
  var millisecond_default = millisecond;
  var milliseconds = millisecond.range;

  // node_modules/d3-time/src/duration.js
  var durationSecond = 1e3;
  var durationMinute = durationSecond * 60;
  var durationHour = durationMinute * 60;
  var durationDay = durationHour * 24;
  var durationWeek = durationDay * 7;
  var durationMonth = durationDay * 30;
  var durationYear = durationDay * 365;

  // node_modules/d3-time/src/second.js
  var second = newInterval(function(date2) {
    date2.setTime(date2 - date2.getMilliseconds());
  }, function(date2, step) {
    date2.setTime(+date2 + step * durationSecond);
  }, function(start, end) {
    return (end - start) / durationSecond;
  }, function(date2) {
    return date2.getUTCSeconds();
  });
  var second_default = second;
  var seconds = second.range;

  // node_modules/d3-time/src/minute.js
  var minute = newInterval(function(date2) {
    date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond);
  }, function(date2, step) {
    date2.setTime(+date2 + step * durationMinute);
  }, function(start, end) {
    return (end - start) / durationMinute;
  }, function(date2) {
    return date2.getMinutes();
  });
  var minute_default = minute;
  var minutes = minute.range;

  // node_modules/d3-time/src/hour.js
  var hour = newInterval(function(date2) {
    date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond - date2.getMinutes() * durationMinute);
  }, function(date2, step) {
    date2.setTime(+date2 + step * durationHour);
  }, function(start, end) {
    return (end - start) / durationHour;
  }, function(date2) {
    return date2.getHours();
  });
  var hour_default = hour;
  var hours = hour.range;

  // node_modules/d3-time/src/day.js
  var day = newInterval((date2) => date2.setHours(0, 0, 0, 0), (date2, step) => date2.setDate(date2.getDate() + step), (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay, (date2) => date2.getDate() - 1);
  var day_default = day;
  var days = day.range;

  // node_modules/d3-time/src/week.js
  function weekday(i) {
    return newInterval(function(date2) {
      date2.setDate(date2.getDate() - (date2.getDay() + 7 - i) % 7);
      date2.setHours(0, 0, 0, 0);
    }, function(date2, step) {
      date2.setDate(date2.getDate() + step * 7);
    }, function(start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
    });
  }
  var sunday = weekday(0);
  var monday = weekday(1);
  var tuesday = weekday(2);
  var wednesday = weekday(3);
  var thursday = weekday(4);
  var friday = weekday(5);
  var saturday = weekday(6);
  var sundays = sunday.range;
  var mondays = monday.range;
  var tuesdays = tuesday.range;
  var wednesdays = wednesday.range;
  var thursdays = thursday.range;
  var fridays = friday.range;
  var saturdays = saturday.range;

  // node_modules/d3-time/src/month.js
  var month = newInterval(function(date2) {
    date2.setDate(1);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setMonth(date2.getMonth() + step);
  }, function(start, end) {
    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  }, function(date2) {
    return date2.getMonth();
  });
  var month_default = month;
  var months = month.range;

  // node_modules/d3-time/src/year.js
  var year = newInterval(function(date2) {
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setFullYear(date2.getFullYear() + step);
  }, function(start, end) {
    return end.getFullYear() - start.getFullYear();
  }, function(date2) {
    return date2.getFullYear();
  });
  year.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date2) {
      date2.setFullYear(Math.floor(date2.getFullYear() / k) * k);
      date2.setMonth(0, 1);
      date2.setHours(0, 0, 0, 0);
    }, function(date2, step) {
      date2.setFullYear(date2.getFullYear() + step * k);
    });
  };
  var year_default = year;
  var years = year.range;

  // node_modules/d3-time/src/utcMinute.js
  var utcMinute = newInterval(function(date2) {
    date2.setUTCSeconds(0, 0);
  }, function(date2, step) {
    date2.setTime(+date2 + step * durationMinute);
  }, function(start, end) {
    return (end - start) / durationMinute;
  }, function(date2) {
    return date2.getUTCMinutes();
  });
  var utcMinute_default = utcMinute;
  var utcMinutes = utcMinute.range;

  // node_modules/d3-time/src/utcHour.js
  var utcHour = newInterval(function(date2) {
    date2.setUTCMinutes(0, 0, 0);
  }, function(date2, step) {
    date2.setTime(+date2 + step * durationHour);
  }, function(start, end) {
    return (end - start) / durationHour;
  }, function(date2) {
    return date2.getUTCHours();
  });
  var utcHour_default = utcHour;
  var utcHours = utcHour.range;

  // node_modules/d3-time/src/utcDay.js
  var utcDay = newInterval(function(date2) {
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCDate(date2.getUTCDate() + step);
  }, function(start, end) {
    return (end - start) / durationDay;
  }, function(date2) {
    return date2.getUTCDate() - 1;
  });
  var utcDay_default = utcDay;
  var utcDays = utcDay.range;

  // node_modules/d3-time/src/utcWeek.js
  function utcWeekday(i) {
    return newInterval(function(date2) {
      date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i) % 7);
      date2.setUTCHours(0, 0, 0, 0);
    }, function(date2, step) {
      date2.setUTCDate(date2.getUTCDate() + step * 7);
    }, function(start, end) {
      return (end - start) / durationWeek;
    });
  }
  var utcSunday = utcWeekday(0);
  var utcMonday = utcWeekday(1);
  var utcTuesday = utcWeekday(2);
  var utcWednesday = utcWeekday(3);
  var utcThursday = utcWeekday(4);
  var utcFriday = utcWeekday(5);
  var utcSaturday = utcWeekday(6);
  var utcSundays = utcSunday.range;
  var utcMondays = utcMonday.range;
  var utcTuesdays = utcTuesday.range;
  var utcWednesdays = utcWednesday.range;
  var utcThursdays = utcThursday.range;
  var utcFridays = utcFriday.range;
  var utcSaturdays = utcSaturday.range;

  // node_modules/d3-time/src/utcMonth.js
  var utcMonth = newInterval(function(date2) {
    date2.setUTCDate(1);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCMonth(date2.getUTCMonth() + step);
  }, function(start, end) {
    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
  }, function(date2) {
    return date2.getUTCMonth();
  });
  var utcMonth_default = utcMonth;
  var utcMonths = utcMonth.range;

  // node_modules/d3-time/src/utcYear.js
  var utcYear = newInterval(function(date2) {
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCFullYear(date2.getUTCFullYear() + step);
  }, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  }, function(date2) {
    return date2.getUTCFullYear();
  });
  utcYear.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date2) {
      date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k) * k);
      date2.setUTCMonth(0, 1);
      date2.setUTCHours(0, 0, 0, 0);
    }, function(date2, step) {
      date2.setUTCFullYear(date2.getUTCFullYear() + step * k);
    });
  };
  var utcYear_default = utcYear;
  var utcYears = utcYear.range;

  // node_modules/d3-array/src/ascending.js
  function ascending2(a, b) {
    return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  // node_modules/d3-array/src/descending.js
  function descending(a, b) {
    return a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  }

  // node_modules/d3-array/src/bisector.js
  function bisector(f) {
    let compare1, compare2, delta;
    if (f.length !== 2) {
      compare1 = ascending2;
      compare2 = (d, x2) => ascending2(f(d), x2);
      delta = (d, x2) => f(d) - x2;
    } else {
      compare1 = f === ascending2 || f === descending ? f : zero;
      compare2 = f;
      delta = f;
    }
    function left2(a, x2, lo = 0, hi = a.length) {
      if (lo < hi) {
        if (compare1(x2, x2) !== 0)
          return hi;
        do {
          const mid = lo + hi >>> 1;
          if (compare2(a[mid], x2) < 0)
            lo = mid + 1;
          else
            hi = mid;
        } while (lo < hi);
      }
      return lo;
    }
    function right2(a, x2, lo = 0, hi = a.length) {
      if (lo < hi) {
        if (compare1(x2, x2) !== 0)
          return hi;
        do {
          const mid = lo + hi >>> 1;
          if (compare2(a[mid], x2) <= 0)
            lo = mid + 1;
          else
            hi = mid;
        } while (lo < hi);
      }
      return lo;
    }
    function center2(a, x2, lo = 0, hi = a.length) {
      const i = left2(a, x2, lo, hi - 1);
      return i > lo && delta(a[i - 1], x2) > -delta(a[i], x2) ? i - 1 : i;
    }
    return { left: left2, center: center2, right: right2 };
  }
  function zero() {
    return 0;
  }

  // node_modules/d3-array/src/number.js
  function number2(x2) {
    return x2 === null ? NaN : +x2;
  }

  // node_modules/d3-array/src/bisect.js
  var ascendingBisect = bisector(ascending2);
  var bisectRight = ascendingBisect.right;
  var bisectLeft = ascendingBisect.left;
  var bisectCenter = bisector(number2).center;
  var bisect_default = bisectRight;

  // node_modules/d3-array/src/extent.js
  function extent(values, valueof) {
    let min;
    let max;
    if (valueof === void 0) {
      for (const value of values) {
        if (value != null) {
          if (min === void 0) {
            if (value >= value)
              min = max = value;
          } else {
            if (min > value)
              min = value;
            if (max < value)
              max = value;
          }
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null) {
          if (min === void 0) {
            if (value >= value)
              min = max = value;
          } else {
            if (min > value)
              min = value;
            if (max < value)
              max = value;
          }
        }
      }
    }
    return [min, max];
  }

  // node_modules/internmap/src/index.js
  var InternMap = class extends Map {
    constructor(entries, key = keyof) {
      super();
      Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
      if (entries != null)
        for (const [key2, value] of entries)
          this.set(key2, value);
    }
    get(key) {
      return super.get(intern_get(this, key));
    }
    has(key) {
      return super.has(intern_get(this, key));
    }
    set(key, value) {
      return super.set(intern_set(this, key), value);
    }
    delete(key) {
      return super.delete(intern_delete(this, key));
    }
  };
  function intern_get({ _intern, _key }, value) {
    const key = _key(value);
    return _intern.has(key) ? _intern.get(key) : value;
  }
  function intern_set({ _intern, _key }, value) {
    const key = _key(value);
    if (_intern.has(key))
      return _intern.get(key);
    _intern.set(key, value);
    return value;
  }
  function intern_delete({ _intern, _key }, value) {
    const key = _key(value);
    if (_intern.has(key)) {
      value = _intern.get(key);
      _intern.delete(key);
    }
    return value;
  }
  function keyof(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
  }

  // node_modules/d3-array/src/identity.js
  function identity(x2) {
    return x2;
  }

  // node_modules/d3-array/src/group.js
  function group(values, ...keys) {
    return nest(values, identity, identity, keys);
  }
  function rollup(values, reduce, ...keys) {
    return nest(values, identity, reduce, keys);
  }
  function nest(values, map2, reduce, keys) {
    return function regroup(values2, i) {
      if (i >= keys.length)
        return reduce(values2);
      const groups2 = new InternMap();
      const keyof2 = keys[i++];
      let index2 = -1;
      for (const value of values2) {
        const key = keyof2(value, ++index2, values2);
        const group2 = groups2.get(key);
        if (group2)
          group2.push(value);
        else
          groups2.set(key, [value]);
      }
      for (const [key, values3] of groups2) {
        groups2.set(key, regroup(values3, i));
      }
      return map2(groups2);
    }(values, 0);
  }

  // node_modules/d3-array/src/ticks.js
  var e10 = Math.sqrt(50);
  var e5 = Math.sqrt(10);
  var e2 = Math.sqrt(2);
  function ticks(start, stop, count) {
    var reverse, i = -1, n, ticks2, step;
    stop = +stop, start = +start, count = +count;
    if (start === stop && count > 0)
      return [start];
    if (reverse = stop < start)
      n = start, start = stop, stop = n;
    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step))
      return [];
    if (step > 0) {
      let r0 = Math.round(start / step), r1 = Math.round(stop / step);
      if (r0 * step < start)
        ++r0;
      if (r1 * step > stop)
        --r1;
      ticks2 = new Array(n = r1 - r0 + 1);
      while (++i < n)
        ticks2[i] = (r0 + i) * step;
    } else {
      step = -step;
      let r0 = Math.round(start * step), r1 = Math.round(stop * step);
      if (r0 / step < start)
        ++r0;
      if (r1 / step > stop)
        --r1;
      ticks2 = new Array(n = r1 - r0 + 1);
      while (++i < n)
        ticks2[i] = (r0 + i) / step;
    }
    if (reverse)
      ticks2.reverse();
    return ticks2;
  }
  function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
    return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }
  function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
    if (error >= e10)
      step1 *= 10;
    else if (error >= e5)
      step1 *= 5;
    else if (error >= e2)
      step1 *= 2;
    return stop < start ? -step1 : step1;
  }

  // node_modules/d3-array/src/sum.js
  function sum(values, valueof) {
    let sum2 = 0;
    if (valueof === void 0) {
      for (let value of values) {
        if (value = +value) {
          sum2 += value;
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if (value = +valueof(value, ++index2, values)) {
          sum2 += value;
        }
      }
    }
    return sum2;
  }

  // node_modules/d3-time/src/ticks.js
  function ticker(year2, month2, week, day2, hour2, minute2) {
    const tickIntervals = [
      [second_default, 1, durationSecond],
      [second_default, 5, 5 * durationSecond],
      [second_default, 15, 15 * durationSecond],
      [second_default, 30, 30 * durationSecond],
      [minute2, 1, durationMinute],
      [minute2, 5, 5 * durationMinute],
      [minute2, 15, 15 * durationMinute],
      [minute2, 30, 30 * durationMinute],
      [hour2, 1, durationHour],
      [hour2, 3, 3 * durationHour],
      [hour2, 6, 6 * durationHour],
      [hour2, 12, 12 * durationHour],
      [day2, 1, durationDay],
      [day2, 2, 2 * durationDay],
      [week, 1, durationWeek],
      [month2, 1, durationMonth],
      [month2, 3, 3 * durationMonth],
      [year2, 1, durationYear]
    ];
    function ticks2(start, stop, count) {
      const reverse = stop < start;
      if (reverse)
        [start, stop] = [stop, start];
      const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
      const ticks3 = interval ? interval.range(start, +stop + 1) : [];
      return reverse ? ticks3.reverse() : ticks3;
    }
    function tickInterval(start, stop, count) {
      const target = Math.abs(stop - start) / count;
      const i = bisector(([, , step2]) => step2).right(tickIntervals, target);
      if (i === tickIntervals.length)
        return year2.every(tickStep(start / durationYear, stop / durationYear, count));
      if (i === 0)
        return millisecond_default.every(Math.max(tickStep(start, stop, count), 1));
      const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
      return t.every(step);
    }
    return [ticks2, tickInterval];
  }
  var [utcTicks, utcTickInterval] = ticker(utcYear_default, utcMonth_default, utcSunday, utcDay_default, utcHour_default, utcMinute_default);
  var [timeTicks, timeTickInterval] = ticker(year_default, month_default, sunday, day_default, hour_default, minute_default);

  // node_modules/d3-time-format/src/locale.js
  function localDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date2 = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
      date2.setFullYear(d.y);
      return date2;
    }
    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
  }
  function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date2 = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
      date2.setUTCFullYear(d.y);
      return date2;
    }
    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
  }
  function newDate(y2, m, d) {
    return { y: y2, m, d, H: 0, M: 0, S: 0, L: 0 };
  }
  function formatLocale(locale3) {
    var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
    var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
    var formats = {
      "a": formatShortWeekday,
      "A": formatWeekday,
      "b": formatShortMonth,
      "B": formatMonth,
      "c": null,
      "d": formatDayOfMonth,
      "e": formatDayOfMonth,
      "f": formatMicroseconds,
      "g": formatYearISO,
      "G": formatFullYearISO,
      "H": formatHour24,
      "I": formatHour12,
      "j": formatDayOfYear,
      "L": formatMilliseconds,
      "m": formatMonthNumber,
      "M": formatMinutes,
      "p": formatPeriod,
      "q": formatQuarter,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatSeconds,
      "u": formatWeekdayNumberMonday,
      "U": formatWeekNumberSunday,
      "V": formatWeekNumberISO,
      "w": formatWeekdayNumberSunday,
      "W": formatWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatYear,
      "Y": formatFullYear,
      "Z": formatZone,
      "%": formatLiteralPercent
    };
    var utcFormats = {
      "a": formatUTCShortWeekday,
      "A": formatUTCWeekday,
      "b": formatUTCShortMonth,
      "B": formatUTCMonth,
      "c": null,
      "d": formatUTCDayOfMonth,
      "e": formatUTCDayOfMonth,
      "f": formatUTCMicroseconds,
      "g": formatUTCYearISO,
      "G": formatUTCFullYearISO,
      "H": formatUTCHour24,
      "I": formatUTCHour12,
      "j": formatUTCDayOfYear,
      "L": formatUTCMilliseconds,
      "m": formatUTCMonthNumber,
      "M": formatUTCMinutes,
      "p": formatUTCPeriod,
      "q": formatUTCQuarter,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatUTCSeconds,
      "u": formatUTCWeekdayNumberMonday,
      "U": formatUTCWeekNumberSunday,
      "V": formatUTCWeekNumberISO,
      "w": formatUTCWeekdayNumberSunday,
      "W": formatUTCWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatUTCYear,
      "Y": formatUTCFullYear,
      "Z": formatUTCZone,
      "%": formatLiteralPercent
    };
    var parses = {
      "a": parseShortWeekday,
      "A": parseWeekday,
      "b": parseShortMonth,
      "B": parseMonth,
      "c": parseLocaleDateTime,
      "d": parseDayOfMonth,
      "e": parseDayOfMonth,
      "f": parseMicroseconds,
      "g": parseYear,
      "G": parseFullYear,
      "H": parseHour24,
      "I": parseHour24,
      "j": parseDayOfYear,
      "L": parseMilliseconds,
      "m": parseMonthNumber,
      "M": parseMinutes,
      "p": parsePeriod,
      "q": parseQuarter,
      "Q": parseUnixTimestamp,
      "s": parseUnixTimestampSeconds,
      "S": parseSeconds,
      "u": parseWeekdayNumberMonday,
      "U": parseWeekNumberSunday,
      "V": parseWeekNumberISO,
      "w": parseWeekdayNumberSunday,
      "W": parseWeekNumberMonday,
      "x": parseLocaleDate,
      "X": parseLocaleTime,
      "y": parseYear,
      "Y": parseFullYear,
      "Z": parseZone,
      "%": parseLiteralPercent
    };
    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);
    function newFormat(specifier, formats2) {
      return function(date2) {
        var string = [], i = -1, j = 0, n = specifier.length, c, pad2, format2;
        if (!(date2 instanceof Date))
          date2 = new Date(+date2);
        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad2 = pads[c = specifier.charAt(++i)]) != null)
              c = specifier.charAt(++i);
            else
              pad2 = c === "e" ? " " : "0";
            if (format2 = formats2[c])
              c = format2(date2, pad2);
            string.push(c);
            j = i + 1;
          }
        }
        string.push(specifier.slice(j, i));
        return string.join("");
      };
    }
    function newParse(specifier, Z) {
      return function(string) {
        var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day2;
        if (i != string.length)
          return null;
        if ("Q" in d)
          return new Date(d.Q);
        if ("s" in d)
          return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
        if (Z && !("Z" in d))
          d.Z = 0;
        if ("p" in d)
          d.H = d.H % 12 + d.p * 12;
        if (d.m === void 0)
          d.m = "q" in d ? d.q : 0;
        if ("V" in d) {
          if (d.V < 1 || d.V > 53)
            return null;
          if (!("w" in d))
            d.w = 1;
          if ("Z" in d) {
            week = utcDate(newDate(d.y, 0, 1)), day2 = week.getUTCDay();
            week = day2 > 4 || day2 === 0 ? utcMonday.ceil(week) : utcMonday(week);
            week = utcDay_default.offset(week, (d.V - 1) * 7);
            d.y = week.getUTCFullYear();
            d.m = week.getUTCMonth();
            d.d = week.getUTCDate() + (d.w + 6) % 7;
          } else {
            week = localDate(newDate(d.y, 0, 1)), day2 = week.getDay();
            week = day2 > 4 || day2 === 0 ? monday.ceil(week) : monday(week);
            week = day_default.offset(week, (d.V - 1) * 7);
            d.y = week.getFullYear();
            d.m = week.getMonth();
            d.d = week.getDate() + (d.w + 6) % 7;
          }
        } else if ("W" in d || "U" in d) {
          if (!("w" in d))
            d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
          day2 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
          d.m = 0;
          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day2 + 5) % 7 : d.w + d.U * 7 - (day2 + 6) % 7;
        }
        if ("Z" in d) {
          d.H += d.Z / 100 | 0;
          d.M += d.Z % 100;
          return utcDate(d);
        }
        return localDate(d);
      };
    }
    function parseSpecifier(d, specifier, string, j) {
      var i = 0, n = specifier.length, m = string.length, c, parse;
      while (i < n) {
        if (j >= m)
          return -1;
        c = specifier.charCodeAt(i++);
        if (c === 37) {
          c = specifier.charAt(i++);
          parse = parses[c in pads ? specifier.charAt(i++) : c];
          if (!parse || (j = parse(d, string, j)) < 0)
            return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }
      return j;
    }
    function parsePeriod(d, string, i) {
      var n = periodRe.exec(string.slice(i));
      return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function parseShortWeekday(d, string, i) {
      var n = shortWeekdayRe.exec(string.slice(i));
      return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }
    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }
    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }
    function formatShortWeekday(d) {
      return locale_shortWeekdays[d.getDay()];
    }
    function formatWeekday(d) {
      return locale_weekdays[d.getDay()];
    }
    function formatShortMonth(d) {
      return locale_shortMonths[d.getMonth()];
    }
    function formatMonth(d) {
      return locale_months[d.getMonth()];
    }
    function formatPeriod(d) {
      return locale_periods[+(d.getHours() >= 12)];
    }
    function formatQuarter(d) {
      return 1 + ~~(d.getMonth() / 3);
    }
    function formatUTCShortWeekday(d) {
      return locale_shortWeekdays[d.getUTCDay()];
    }
    function formatUTCWeekday(d) {
      return locale_weekdays[d.getUTCDay()];
    }
    function formatUTCShortMonth(d) {
      return locale_shortMonths[d.getUTCMonth()];
    }
    function formatUTCMonth(d) {
      return locale_months[d.getUTCMonth()];
    }
    function formatUTCPeriod(d) {
      return locale_periods[+(d.getUTCHours() >= 12)];
    }
    function formatUTCQuarter(d) {
      return 1 + ~~(d.getUTCMonth() / 3);
    }
    return {
      format: function(specifier) {
        var f = newFormat(specifier += "", formats);
        f.toString = function() {
          return specifier;
        };
        return f;
      },
      parse: function(specifier) {
        var p = newParse(specifier += "", false);
        p.toString = function() {
          return specifier;
        };
        return p;
      },
      utcFormat: function(specifier) {
        var f = newFormat(specifier += "", utcFormats);
        f.toString = function() {
          return specifier;
        };
        return f;
      },
      utcParse: function(specifier) {
        var p = newParse(specifier += "", true);
        p.toString = function() {
          return specifier;
        };
        return p;
      }
    };
  }
  var pads = { "-": "", "_": " ", "0": "0" };
  var numberRe = /^\s*\d+/;
  var percentRe = /^%/;
  var requoteRe = /[\\^$*+?|[\]().{}]/g;
  function pad(value, fill, width) {
    var sign2 = value < 0 ? "-" : "", string = (sign2 ? -value : value) + "", length = string.length;
    return sign2 + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }
  function requote(s) {
    return s.replace(requoteRe, "\\$&");
  }
  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }
  function formatLookup(names) {
    return new Map(names.map((name, i) => [name.toLowerCase(), i]));
  }
  function parseWeekdayNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
  }
  function parseWeekdayNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.u = +n[0], i + n[0].length) : -1;
  }
  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
  }
  function parseWeekNumberISO(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.V = +n[0], i + n[0].length) : -1;
  }
  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
  }
  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
  }
  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
  }
  function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
  }
  function parseQuarter(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
  }
  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
  }
  function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
  }
  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
  }
  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
  }
  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
  }
  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
  }
  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
  }
  function parseMicroseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 6));
    return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
  }
  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }
  function parseUnixTimestamp(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.Q = +n[0], i + n[0].length) : -1;
  }
  function parseUnixTimestampSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.s = +n[0], i + n[0].length) : -1;
  }
  function formatDayOfMonth(d, p) {
    return pad(d.getDate(), p, 2);
  }
  function formatHour24(d, p) {
    return pad(d.getHours(), p, 2);
  }
  function formatHour12(d, p) {
    return pad(d.getHours() % 12 || 12, p, 2);
  }
  function formatDayOfYear(d, p) {
    return pad(1 + day_default.count(year_default(d), d), p, 3);
  }
  function formatMilliseconds(d, p) {
    return pad(d.getMilliseconds(), p, 3);
  }
  function formatMicroseconds(d, p) {
    return formatMilliseconds(d, p) + "000";
  }
  function formatMonthNumber(d, p) {
    return pad(d.getMonth() + 1, p, 2);
  }
  function formatMinutes(d, p) {
    return pad(d.getMinutes(), p, 2);
  }
  function formatSeconds(d, p) {
    return pad(d.getSeconds(), p, 2);
  }
  function formatWeekdayNumberMonday(d) {
    var day2 = d.getDay();
    return day2 === 0 ? 7 : day2;
  }
  function formatWeekNumberSunday(d, p) {
    return pad(sunday.count(year_default(d) - 1, d), p, 2);
  }
  function dISO(d) {
    var day2 = d.getDay();
    return day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
  }
  function formatWeekNumberISO(d, p) {
    d = dISO(d);
    return pad(thursday.count(year_default(d), d) + (year_default(d).getDay() === 4), p, 2);
  }
  function formatWeekdayNumberSunday(d) {
    return d.getDay();
  }
  function formatWeekNumberMonday(d, p) {
    return pad(monday.count(year_default(d) - 1, d), p, 2);
  }
  function formatYear(d, p) {
    return pad(d.getFullYear() % 100, p, 2);
  }
  function formatYearISO(d, p) {
    d = dISO(d);
    return pad(d.getFullYear() % 100, p, 2);
  }
  function formatFullYear(d, p) {
    return pad(d.getFullYear() % 1e4, p, 4);
  }
  function formatFullYearISO(d, p) {
    var day2 = d.getDay();
    d = day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
    return pad(d.getFullYear() % 1e4, p, 4);
  }
  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
  }
  function formatUTCDayOfMonth(d, p) {
    return pad(d.getUTCDate(), p, 2);
  }
  function formatUTCHour24(d, p) {
    return pad(d.getUTCHours(), p, 2);
  }
  function formatUTCHour12(d, p) {
    return pad(d.getUTCHours() % 12 || 12, p, 2);
  }
  function formatUTCDayOfYear(d, p) {
    return pad(1 + utcDay_default.count(utcYear_default(d), d), p, 3);
  }
  function formatUTCMilliseconds(d, p) {
    return pad(d.getUTCMilliseconds(), p, 3);
  }
  function formatUTCMicroseconds(d, p) {
    return formatUTCMilliseconds(d, p) + "000";
  }
  function formatUTCMonthNumber(d, p) {
    return pad(d.getUTCMonth() + 1, p, 2);
  }
  function formatUTCMinutes(d, p) {
    return pad(d.getUTCMinutes(), p, 2);
  }
  function formatUTCSeconds(d, p) {
    return pad(d.getUTCSeconds(), p, 2);
  }
  function formatUTCWeekdayNumberMonday(d) {
    var dow = d.getUTCDay();
    return dow === 0 ? 7 : dow;
  }
  function formatUTCWeekNumberSunday(d, p) {
    return pad(utcSunday.count(utcYear_default(d) - 1, d), p, 2);
  }
  function UTCdISO(d) {
    var day2 = d.getUTCDay();
    return day2 >= 4 || day2 === 0 ? utcThursday(d) : utcThursday.ceil(d);
  }
  function formatUTCWeekNumberISO(d, p) {
    d = UTCdISO(d);
    return pad(utcThursday.count(utcYear_default(d), d) + (utcYear_default(d).getUTCDay() === 4), p, 2);
  }
  function formatUTCWeekdayNumberSunday(d) {
    return d.getUTCDay();
  }
  function formatUTCWeekNumberMonday(d, p) {
    return pad(utcMonday.count(utcYear_default(d) - 1, d), p, 2);
  }
  function formatUTCYear(d, p) {
    return pad(d.getUTCFullYear() % 100, p, 2);
  }
  function formatUTCYearISO(d, p) {
    d = UTCdISO(d);
    return pad(d.getUTCFullYear() % 100, p, 2);
  }
  function formatUTCFullYear(d, p) {
    return pad(d.getUTCFullYear() % 1e4, p, 4);
  }
  function formatUTCFullYearISO(d, p) {
    var day2 = d.getUTCDay();
    d = day2 >= 4 || day2 === 0 ? utcThursday(d) : utcThursday.ceil(d);
    return pad(d.getUTCFullYear() % 1e4, p, 4);
  }
  function formatUTCZone() {
    return "+0000";
  }
  function formatLiteralPercent() {
    return "%";
  }
  function formatUnixTimestamp(d) {
    return +d;
  }
  function formatUnixTimestampSeconds(d) {
    return Math.floor(+d / 1e3);
  }

  // node_modules/d3-time-format/src/defaultLocale.js
  var locale;
  var timeFormat;
  var timeParse;
  var utcFormat;
  var utcParse;
  defaultLocale({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });
  function defaultLocale(definition) {
    locale = formatLocale(definition);
    timeFormat = locale.format;
    timeParse = locale.parse;
    utcFormat = locale.utcFormat;
    utcParse = locale.utcParse;
    return locale;
  }

  // src/stats/popup.svelte
  function get_each_context2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[15] = list[i];
    return child_ctx;
  }
  function create_each_block2(ctx) {
    let p;
    let t0_value = ctx[15] + "";
    let t02;
    let t12;
    let t2_value = ctx[7][ctx[15]] + "";
    let t2;
    return {
      c() {
        p = element("p");
        t02 = text(t0_value);
        t12 = text(" - ");
        t2 = text(t2_value);
      },
      m(target, anchor) {
        insert(target, p, anchor);
        append(p, t02);
        append(p, t12);
        append(p, t2);
      },
      p(ctx2, dirty) {
        if (dirty & 1 && t0_value !== (t0_value = ctx2[15] + ""))
          set_data(t02, t0_value);
        if (dirty & 129 && t2_value !== (t2_value = ctx2[7][ctx2[15]] + ""))
          set_data(t2, t2_value);
      },
      d(detaching) {
        if (detaching)
          detach(p);
      }
    };
  }
  function create_fragment4(ctx) {
    let div;
    let p0;
    let t02;
    let t12;
    let p1;
    let t2;
    let t3;
    let br;
    let t4;
    let div_class_value;
    let each_value = Object.keys(ctx[0]);
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
    }
    return {
      c() {
        div = element("div");
        p0 = element("p");
        t02 = text(ctx[4]);
        t12 = space();
        p1 = element("p");
        t2 = text(ctx[5]);
        t3 = space();
        br = element("br");
        t4 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(p0, "id", "popup_title");
        attr(p0, "class", "font-semibold");
        attr(p1, "id", "popup_date");
        attr(div, "id", "popup");
        attr(div, "class", div_class_value = (ctx[1] ? "absolute" : "hidden") + " p-3");
        set_style(div, "left", ctx[2] + "px");
        set_style(div, "top", ctx[3] + "px");
        set_style(div, "background-color", ctx[6]);
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, p0);
        append(p0, t02);
        append(div, t12);
        append(div, p1);
        append(p1, t2);
        append(div, t3);
        append(div, br);
        append(div, t4);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div, null);
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 16)
          set_data(t02, ctx2[4]);
        if (dirty & 32)
          set_data(t2, ctx2[5]);
        if (dirty & 129) {
          each_value = Object.keys(ctx2[0]);
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context2(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block2(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
        if (dirty & 2 && div_class_value !== (div_class_value = (ctx2[1] ? "absolute" : "hidden") + " p-3")) {
          attr(div, "class", div_class_value);
        }
        if (dirty & 4) {
          set_style(div, "left", ctx2[2] + "px");
        }
        if (dirty & 8) {
          set_style(div, "top", ctx2[3] + "px");
        }
        if (dirty & 64) {
          set_style(div, "background-color", ctx2[6]);
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div);
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function instance4($$self, $$props, $$invalidate) {
    let show_popup = false;
    let [popup_x, popup_y] = [0, 0];
    let [popup_name, popup_date, popout_color] = ["", "", ""];
    let popup_tooltips = {};
    let { data, groups: groups2, hues } = $$props;
    let { x_accessor, group_accessor, tooltip_accessors } = $$props;
    Object.keys(tooltip_accessors).forEach((key) => $$invalidate(7, popup_tooltips[key] = "", popup_tooltips));
    const mouse_move = (event) => {
      const index2 = event["target"].dataset.index;
      $$invalidate(2, popup_x = event.layerX);
      $$invalidate(3, popup_y = event.layerY);
      $$invalidate(4, popup_name = group_accessor(data[index2]));
      $$invalidate(5, popup_date = timeFormat("%d %B %Y")(x_accessor(data[index2])));
      $$invalidate(6, popout_color = hues[groups2.indexOf(group_accessor(data[index2]))]);
      Object.entries(tooltip_accessors).forEach(([key, value_accessor]) => {
        $$invalidate(7, popup_tooltips[key] = value_accessor(data[index2]), popup_tooltips);
      });
      $$invalidate(1, show_popup = true);
    };
    const mouse_out = () => {
      $$invalidate(1, show_popup = false);
    };
    $$self.$$set = ($$props2) => {
      if ("data" in $$props2)
        $$invalidate(8, data = $$props2.data);
      if ("groups" in $$props2)
        $$invalidate(9, groups2 = $$props2.groups);
      if ("hues" in $$props2)
        $$invalidate(10, hues = $$props2.hues);
      if ("x_accessor" in $$props2)
        $$invalidate(11, x_accessor = $$props2.x_accessor);
      if ("group_accessor" in $$props2)
        $$invalidate(12, group_accessor = $$props2.group_accessor);
      if ("tooltip_accessors" in $$props2)
        $$invalidate(0, tooltip_accessors = $$props2.tooltip_accessors);
    };
    return [
      tooltip_accessors,
      show_popup,
      popup_x,
      popup_y,
      popup_name,
      popup_date,
      popout_color,
      popup_tooltips,
      data,
      groups2,
      hues,
      x_accessor,
      group_accessor,
      mouse_move,
      mouse_out
    ];
  }
  var Popup = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance4, create_fragment4, safe_not_equal, {
        data: 8,
        groups: 9,
        hues: 10,
        x_accessor: 11,
        group_accessor: 12,
        tooltip_accessors: 0,
        mouse_move: 13,
        mouse_out: 14
      });
    }
    get mouse_move() {
      return this.$$.ctx[13];
    }
    get mouse_out() {
      return this.$$.ctx[14];
    }
  };
  var popup_default = Popup;

  // src/stats/legend.svelte
  function get_each_context3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[2] = list[i];
    child_ctx[4] = i;
    return child_ctx;
  }
  function create_each_block3(ctx) {
    let div1;
    let div0;
    let t02;
    let p;
    let t1_value = ctx[2] + "";
    let t12;
    let t2;
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        t02 = space();
        p = element("p");
        t12 = text(t1_value);
        t2 = space();
        attr(div0, "class", "z-50 w-3 h-3 rounded-full");
        set_style(div0, "background-color", ctx[1][ctx[4]]);
        attr(p, "class", "text-[#808080]");
        attr(div1, "class", "flex flex-row gap-1 items-center");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, div0);
        append(div1, t02);
        append(div1, p);
        append(p, t12);
        append(div1, t2);
      },
      p(ctx2, dirty) {
        if (dirty & 2) {
          set_style(div0, "background-color", ctx2[1][ctx2[4]]);
        }
        if (dirty & 1 && t1_value !== (t1_value = ctx2[2] + ""))
          set_data(t12, t1_value);
      },
      d(detaching) {
        if (detaching)
          detach(div1);
      }
    };
  }
  function create_fragment5(ctx) {
    let div;
    let each_value = ctx[0];
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
    }
    return {
      c() {
        div = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(div, "class", "flex flex-col");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div, null);
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 3) {
          each_value = ctx2[0];
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context3(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block3(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div);
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function instance5($$self, $$props, $$invalidate) {
    let { groups: groups2, hues } = $$props;
    $$self.$$set = ($$props2) => {
      if ("groups" in $$props2)
        $$invalidate(0, groups2 = $$props2.groups);
      if ("hues" in $$props2)
        $$invalidate(1, hues = $$props2.hues);
    };
    return [groups2, hues];
  }
  var Legend = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance5, create_fragment5, safe_not_equal, { groups: 0, hues: 1 });
    }
  };
  var legend_default = Legend;

  // node_modules/d3-format/src/formatDecimal.js
  function formatDecimal_default(x2) {
    return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
  }
  function formatDecimalParts(x2, p) {
    if ((i = (x2 = p ? x2.toExponential(p - 1) : x2.toExponential()).indexOf("e")) < 0)
      return null;
    var i, coefficient = x2.slice(0, i);
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x2.slice(i + 1)
    ];
  }

  // node_modules/d3-format/src/exponent.js
  function exponent_default(x2) {
    return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
  }

  // node_modules/d3-format/src/formatGroup.js
  function formatGroup_default(grouping, thousands) {
    return function(value, width) {
      var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
      while (i > 0 && g > 0) {
        if (length + g + 1 > width)
          g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width)
          break;
        g = grouping[j = (j + 1) % grouping.length];
      }
      return t.reverse().join(thousands);
    };
  }

  // node_modules/d3-format/src/formatNumerals.js
  function formatNumerals_default(numerals) {
    return function(value) {
      return value.replace(/[0-9]/g, function(i) {
        return numerals[+i];
      });
    };
  }

  // node_modules/d3-format/src/formatSpecifier.js
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier)))
      throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }
  formatSpecifier.prototype = FormatSpecifier.prototype;
  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
    this.align = specifier.align === void 0 ? ">" : specifier.align + "";
    this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === void 0 ? void 0 : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === void 0 ? "" : specifier.type + "";
  }
  FormatSpecifier.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };

  // node_modules/d3-format/src/formatTrim.js
  function formatTrim_default(s) {
    out:
      for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
        switch (s[i]) {
          case ".":
            i0 = i1 = i;
            break;
          case "0":
            if (i0 === 0)
              i0 = i;
            i1 = i;
            break;
          default:
            if (!+s[i])
              break out;
            if (i0 > 0)
              i0 = 0;
            break;
        }
      }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  // node_modules/d3-format/src/formatPrefixAuto.js
  var prefixExponent;
  function formatPrefixAuto_default(x2, p) {
    var d = formatDecimalParts(x2, p);
    if (!d)
      return x2 + "";
    var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x2, Math.max(0, p + i - 1))[0];
  }

  // node_modules/d3-format/src/formatRounded.js
  function formatRounded_default(x2, p) {
    var d = formatDecimalParts(x2, p);
    if (!d)
      return x2 + "";
    var coefficient = d[0], exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  // node_modules/d3-format/src/formatTypes.js
  var formatTypes_default = {
    "%": (x2, p) => (x2 * 100).toFixed(p),
    "b": (x2) => Math.round(x2).toString(2),
    "c": (x2) => x2 + "",
    "d": formatDecimal_default,
    "e": (x2, p) => x2.toExponential(p),
    "f": (x2, p) => x2.toFixed(p),
    "g": (x2, p) => x2.toPrecision(p),
    "o": (x2) => Math.round(x2).toString(8),
    "p": (x2, p) => formatRounded_default(x2 * 100, p),
    "r": formatRounded_default,
    "s": formatPrefixAuto_default,
    "X": (x2) => Math.round(x2).toString(16).toUpperCase(),
    "x": (x2) => Math.round(x2).toString(16)
  };

  // node_modules/d3-format/src/identity.js
  function identity_default2(x2) {
    return x2;
  }

  // node_modules/d3-format/src/locale.js
  var map = Array.prototype.map;
  var prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  function locale_default(locale3) {
    var group2 = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default2 : formatGroup_default(map.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default2 : formatNumerals_default(map.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "\u2212" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);
      var fill = specifier.fill, align = specifier.align, sign2 = specifier.sign, symbol = specifier.symbol, zero3 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
      if (type === "n")
        comma = true, type = "g";
      else if (!formatTypes_default[type])
        precision === void 0 && (precision = 12), trim = true, type = "g";
      if (zero3 || fill === "0" && align === "=")
        zero3 = true, fill = "0", align = "=";
      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
      var formatType = formatTypes_default[type], maybeSuffix = /[defgprs%]/.test(type);
      precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
      function format2(value) {
        var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;
          var valueNegative = value < 0 || 1 / value < 0;
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
          if (trim)
            value = formatTrim_default(value);
          if (valueNegative && +value === 0 && sign2 !== "+")
            valueNegative = false;
          valuePrefix = (valueNegative ? sign2 === "(" ? sign2 : minus : sign2 === "-" || sign2 === "(" ? "" : sign2) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign2 === "(" ? ")" : "");
          if (maybeSuffix) {
            i = -1, n = value.length;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }
        if (comma && !zero3)
          value = group2(value, Infinity);
        var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
        if (comma && zero3)
          value = group2(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
        switch (align) {
          case "<":
            value = valuePrefix + value + valueSuffix + padding;
            break;
          case "=":
            value = valuePrefix + padding + value + valueSuffix;
            break;
          case "^":
            value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
            break;
          default:
            value = padding + valuePrefix + value + valueSuffix;
            break;
        }
        return numerals(value);
      }
      format2.toString = function() {
        return specifier + "";
      };
      return format2;
    }
    function formatPrefix2(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
      return function(value2) {
        return f(k * value2) + prefix;
      };
    }
    return {
      format: newFormat,
      formatPrefix: formatPrefix2
    };
  }

  // node_modules/d3-format/src/defaultLocale.js
  var locale2;
  var format;
  var formatPrefix;
  defaultLocale2({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });
  function defaultLocale2(definition) {
    locale2 = locale_default(definition);
    format = locale2.format;
    formatPrefix = locale2.formatPrefix;
    return locale2;
  }

  // node_modules/d3-format/src/precisionFixed.js
  function precisionFixed_default(step) {
    return Math.max(0, -exponent_default(Math.abs(step)));
  }

  // node_modules/d3-format/src/precisionPrefix.js
  function precisionPrefix_default(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
  }

  // node_modules/d3-format/src/precisionRound.js
  function precisionRound_default(step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent_default(max) - exponent_default(step)) + 1;
  }

  // node_modules/d3-scale/src/init.js
  function initRange(domain, range) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(domain);
        break;
      default:
        this.range(range).domain(domain);
        break;
    }
    return this;
  }

  // node_modules/d3-color/src/define.js
  function define_default(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition)
      prototype[key] = definition[key];
    return prototype;
  }

  // node_modules/d3-color/src/color.js
  function Color() {
  }
  var darker = 0.7;
  var brighter = 1 / darker;
  var reI = "\\s*([+-]?\\d+)\\s*";
  var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
  var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
  var reHex = /^#([0-9a-f]{3,8})$/;
  var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
  var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
  var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
  var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
  var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
  var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
  var named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  define_default(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });
  function color_formatHex() {
    return this.rgb().formatHex();
  }
  function color_formatHex8() {
    return this.rgb().formatHex8();
  }
  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }
  function color_formatRgb() {
    return this.rgb().formatRgb();
  }
  function color(format2) {
    var m, l;
    format2 = (format2 + "").trim().toLowerCase();
    return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }
  function rgbn(n) {
    return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
  }
  function rgba(r, g, b, a) {
    if (a <= 0)
      r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }
  function rgbConvert(o) {
    if (!(o instanceof Color))
      o = color(o);
    if (!o)
      return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define_default(Rgb, rgb, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex,
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));
  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }
  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }
  function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
  }
  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }
  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }
  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }
  function hsla(h, s, l, a) {
    if (a <= 0)
      h = s = l = NaN;
    else if (l <= 0 || l >= 1)
      h = s = NaN;
    else if (s <= 0)
      h = NaN;
    return new Hsl(h, s, l, a);
  }
  function hslConvert(o) {
    if (o instanceof Hsl)
      return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color))
      o = color(o);
    if (!o)
      return new Hsl();
    if (o instanceof Hsl)
      return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
      if (r === max)
        h = (g - b) / s + (g < b) * 6;
      else if (g === max)
        h = (b - r) / s + 2;
      else
        h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }
  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }
  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  define_default(Hsl, hsl, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
      return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
  }));
  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }
  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  // node_modules/d3-interpolate/src/basis.js
  function basis(t12, v0, v1, v2, v3) {
    var t2 = t12 * t12, t3 = t2 * t12;
    return ((1 - 3 * t12 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t12 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
  }
  function basis_default(values) {
    var n = values.length - 1;
    return function(t) {
      var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }

  // node_modules/d3-interpolate/src/basisClosed.js
  function basisClosed_default(values) {
    var n = values.length;
    return function(t) {
      var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }

  // node_modules/d3-interpolate/src/constant.js
  var constant_default3 = (x2) => () => x2;

  // node_modules/d3-interpolate/src/color.js
  function linear(a, d) {
    return function(t) {
      return a + t * d;
    };
  }
  function exponential(a, b, y2) {
    return a = Math.pow(a, y2), b = Math.pow(b, y2) - a, y2 = 1 / y2, function(t) {
      return Math.pow(a + t * b, y2);
    };
  }
  function gamma(y2) {
    return (y2 = +y2) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y2) : constant_default3(isNaN(a) ? b : a);
    };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant_default3(isNaN(a) ? b : a);
  }

  // node_modules/d3-interpolate/src/rgb.js
  var rgb_default = function rgbGamma(y2) {
    var color2 = gamma(y2);
    function rgb2(start, end) {
      var r = color2((start = rgb(start)).r, (end = rgb(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }
    rgb2.gamma = rgbGamma;
    return rgb2;
  }(1);
  function rgbSpline(spline) {
    return function(colors) {
      var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
      for (i = 0; i < n; ++i) {
        color2 = rgb(colors[i]);
        r[i] = color2.r || 0;
        g[i] = color2.g || 0;
        b[i] = color2.b || 0;
      }
      r = spline(r);
      g = spline(g);
      b = spline(b);
      color2.opacity = 1;
      return function(t) {
        color2.r = r(t);
        color2.g = g(t);
        color2.b = b(t);
        return color2 + "";
      };
    };
  }
  var rgbBasis = rgbSpline(basis_default);
  var rgbBasisClosed = rgbSpline(basisClosed_default);

  // node_modules/d3-interpolate/src/numberArray.js
  function numberArray_default(a, b) {
    if (!b)
      b = [];
    var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
    return function(t) {
      for (i = 0; i < n; ++i)
        c[i] = a[i] * (1 - t) + b[i] * t;
      return c;
    };
  }
  function isNumberArray(x2) {
    return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
  }

  // node_modules/d3-interpolate/src/array.js
  function genericArray(a, b) {
    var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x2 = new Array(na), c = new Array(nb), i;
    for (i = 0; i < na; ++i)
      x2[i] = value_default(a[i], b[i]);
    for (; i < nb; ++i)
      c[i] = b[i];
    return function(t) {
      for (i = 0; i < na; ++i)
        c[i] = x2[i](t);
      return c;
    };
  }

  // node_modules/d3-interpolate/src/date.js
  function date_default(a, b) {
    var d = new Date();
    return a = +a, b = +b, function(t) {
      return d.setTime(a * (1 - t) + b * t), d;
    };
  }

  // node_modules/d3-interpolate/src/number.js
  function number_default(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  // node_modules/d3-interpolate/src/object.js
  function object_default(a, b) {
    var i = {}, c = {}, k;
    if (a === null || typeof a !== "object")
      a = {};
    if (b === null || typeof b !== "object")
      b = {};
    for (k in b) {
      if (k in a) {
        i[k] = value_default(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }
    return function(t) {
      for (k in i)
        c[k] = i[k](t);
      return c;
    };
  }

  // node_modules/d3-interpolate/src/string.js
  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  var reB = new RegExp(reA.source, "g");
  function zero2(b) {
    return function() {
      return b;
    };
  }
  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }
  function string_default(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
    a = a + "", b = b + "";
    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.slice(bi, bs);
        if (s[i])
          s[i] += bs;
        else
          s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        if (s[i])
          s[i] += bm;
        else
          s[++i] = bm;
      } else {
        s[++i] = null;
        q.push({ i, x: number_default(am, bm) });
      }
      bi = reB.lastIndex;
    }
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    return s.length < 2 ? q[0] ? one(q[0].x) : zero2(b) : (b = q.length, function(t) {
      for (var i2 = 0, o; i2 < b; ++i2)
        s[(o = q[i2]).i] = o.x(t);
      return s.join("");
    });
  }

  // node_modules/d3-interpolate/src/value.js
  function value_default(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? constant_default3(b) : (t === "number" ? number_default : t === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
  }

  // node_modules/d3-interpolate/src/round.js
  function round_default(a, b) {
    return a = +a, b = +b, function(t) {
      return Math.round(a * (1 - t) + b * t);
    };
  }

  // node_modules/d3-scale/src/constant.js
  function constants(x2) {
    return function() {
      return x2;
    };
  }

  // node_modules/d3-scale/src/number.js
  function number3(x2) {
    return +x2;
  }

  // node_modules/d3-scale/src/continuous.js
  var unit = [0, 1];
  function identity2(x2) {
    return x2;
  }
  function normalize(a, b) {
    return (b -= a = +a) ? function(x2) {
      return (x2 - a) / b;
    } : constants(isNaN(b) ? NaN : 0.5);
  }
  function clamper(a, b) {
    var t;
    if (a > b)
      t = a, a = b, b = t;
    return function(x2) {
      return Math.max(a, Math.min(b, x2));
    };
  }
  function bimap(domain, range, interpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
    if (d1 < d0)
      d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
    else
      d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function(x2) {
      return r0(d0(x2));
    };
  }
  function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1, d = new Array(j), r = new Array(j), i = -1;
    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }
    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range[i], range[i + 1]);
    }
    return function(x2) {
      var i2 = bisect_default(domain, x2, 1, j) - 1;
      return r[i2](d[i2](x2));
    };
  }
  function copy(source, target) {
    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
  }
  function transformer() {
    var domain = unit, range = unit, interpolate = value_default, transform, untransform, unknown, clamp = identity2, piecewise, output, input;
    function rescale() {
      var n = Math.min(domain.length, range.length);
      if (clamp !== identity2)
        clamp = clamper(domain[0], domain[n - 1]);
      piecewise = n > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }
    function scale(x2) {
      return x2 == null || isNaN(x2 = +x2) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x2)));
    }
    scale.invert = function(y2) {
      return clamp(untransform((input || (input = piecewise(range, domain.map(transform), number_default)))(y2)));
    };
    scale.domain = function(_) {
      return arguments.length ? (domain = Array.from(_, number3), rescale()) : domain.slice();
    };
    scale.range = function(_) {
      return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };
    scale.rangeRound = function(_) {
      return range = Array.from(_), interpolate = round_default, rescale();
    };
    scale.clamp = function(_) {
      return arguments.length ? (clamp = _ ? true : identity2, rescale()) : clamp !== identity2;
    };
    scale.interpolate = function(_) {
      return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    return function(t, u) {
      transform = t, untransform = u;
      return rescale();
    };
  }
  function continuous() {
    return transformer()(identity2, identity2);
  }

  // node_modules/d3-scale/src/tickFormat.js
  function tickFormat(start, stop, count, specifier) {
    var step = tickStep(start, stop, count), precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);
    switch (specifier.type) {
      case "s": {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value)))
          specifier.precision = precision;
        return formatPrefix(specifier, value);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start), Math.abs(stop)))))
          specifier.precision = precision - (specifier.type === "e");
        break;
      }
      case "f":
      case "%": {
        if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step)))
          specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
    }
    return format(specifier);
  }

  // node_modules/d3-scale/src/linear.js
  function linearish(scale) {
    var domain = scale.domain;
    scale.ticks = function(count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };
    scale.tickFormat = function(count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };
    scale.nice = function(count) {
      if (count == null)
        count = 10;
      var d = domain();
      var i0 = 0;
      var i1 = d.length - 1;
      var start = d[i0];
      var stop = d[i1];
      var prestep;
      var step;
      var maxIter = 10;
      if (stop < start) {
        step = start, start = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }
      while (maxIter-- > 0) {
        step = tickIncrement(start, stop, count);
        if (step === prestep) {
          d[i0] = start;
          d[i1] = stop;
          return domain(d);
        } else if (step > 0) {
          start = Math.floor(start / step) * step;
          stop = Math.ceil(stop / step) * step;
        } else if (step < 0) {
          start = Math.ceil(start * step) / step;
          stop = Math.floor(stop * step) / step;
        } else {
          break;
        }
        prestep = step;
      }
      return scale;
    };
    return scale;
  }
  function linear2() {
    var scale = continuous();
    scale.copy = function() {
      return copy(scale, linear2());
    };
    initRange.apply(scale, arguments);
    return linearish(scale);
  }

  // node_modules/d3-scale/src/nice.js
  function nice(domain, interval) {
    domain = domain.slice();
    var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t;
    if (x1 < x0) {
      t = i0, i0 = i1, i1 = t;
      t = x0, x0 = x1, x1 = t;
    }
    domain[i0] = interval.floor(x0);
    domain[i1] = interval.ceil(x1);
    return domain;
  }

  // node_modules/d3-scale/src/time.js
  function date(t) {
    return new Date(t);
  }
  function number4(t) {
    return t instanceof Date ? +t : +new Date(+t);
  }
  function calendar(ticks2, tickInterval, year2, month2, week, day2, hour2, minute2, second2, format2) {
    var scale = continuous(), invert = scale.invert, domain = scale.domain;
    var formatMillisecond = format2(".%L"), formatSecond = format2(":%S"), formatMinute = format2("%I:%M"), formatHour = format2("%I %p"), formatDay = format2("%a %d"), formatWeek = format2("%b %d"), formatMonth = format2("%B"), formatYear2 = format2("%Y");
    function tickFormat2(date2) {
      return (second2(date2) < date2 ? formatMillisecond : minute2(date2) < date2 ? formatSecond : hour2(date2) < date2 ? formatMinute : day2(date2) < date2 ? formatHour : month2(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year2(date2) < date2 ? formatMonth : formatYear2)(date2);
    }
    scale.invert = function(y2) {
      return new Date(invert(y2));
    };
    scale.domain = function(_) {
      return arguments.length ? domain(Array.from(_, number4)) : domain().map(date);
    };
    scale.ticks = function(interval) {
      var d = domain();
      return ticks2(d[0], d[d.length - 1], interval == null ? 10 : interval);
    };
    scale.tickFormat = function(count, specifier) {
      return specifier == null ? tickFormat2 : format2(specifier);
    };
    scale.nice = function(interval) {
      var d = domain();
      if (!interval || typeof interval.range !== "function")
        interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
      return interval ? domain(nice(d, interval)) : scale;
    };
    scale.copy = function() {
      return copy(scale, calendar(ticks2, tickInterval, year2, month2, week, day2, hour2, minute2, second2, format2));
    };
    return scale;
  }
  function time() {
    return initRange.apply(calendar(timeTicks, timeTickInterval, year_default, month_default, sunday, day_default, hour_default, minute_default, second_default, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
  }

  // src/stats/scatterplot.svelte
  var import_iwanthue = __toESM(require_iwanthue());
  function create_if_block2(ctx) {
    let line;
    let updating_data;
    let updating_x_accessor;
    let updating_y_accessor;
    let updating_x_scale;
    let updating_y_scale;
    let current;
    function line_data_binding(value) {
      ctx[32](value);
    }
    function line_x_accessor_binding(value) {
      ctx[33](value);
    }
    function line_y_accessor_binding(value) {
      ctx[34](value);
    }
    function line_x_scale_binding(value) {
      ctx[35](value);
    }
    function line_y_scale_binding(value) {
      ctx[36](value);
    }
    let line_props = {};
    if (ctx[0] !== void 0) {
      line_props.data = ctx[0];
    }
    if (ctx[1] !== void 0) {
      line_props.x_accessor = ctx[1];
    }
    if (ctx[2] !== void 0) {
      line_props.y_accessor = ctx[2];
    }
    if (ctx[14] !== void 0) {
      line_props.x_scale = ctx[14];
    }
    if (ctx[15] !== void 0) {
      line_props.y_scale = ctx[15];
    }
    line = new line_default2({ props: line_props });
    binding_callbacks.push(() => bind(line, "data", line_data_binding));
    binding_callbacks.push(() => bind(line, "x_accessor", line_x_accessor_binding));
    binding_callbacks.push(() => bind(line, "y_accessor", line_y_accessor_binding));
    binding_callbacks.push(() => bind(line, "x_scale", line_x_scale_binding));
    binding_callbacks.push(() => bind(line, "y_scale", line_y_scale_binding));
    return {
      c() {
        create_component(line.$$.fragment);
      },
      m(target, anchor) {
        mount_component(line, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const line_changes = {};
        if (!updating_data && dirty[0] & 1) {
          updating_data = true;
          line_changes.data = ctx2[0];
          add_flush_callback(() => updating_data = false);
        }
        if (!updating_x_accessor && dirty[0] & 2) {
          updating_x_accessor = true;
          line_changes.x_accessor = ctx2[1];
          add_flush_callback(() => updating_x_accessor = false);
        }
        if (!updating_y_accessor && dirty[0] & 4) {
          updating_y_accessor = true;
          line_changes.y_accessor = ctx2[2];
          add_flush_callback(() => updating_y_accessor = false);
        }
        if (!updating_x_scale && dirty[0] & 16384) {
          updating_x_scale = true;
          line_changes.x_scale = ctx2[14];
          add_flush_callback(() => updating_x_scale = false);
        }
        if (!updating_y_scale && dirty[0] & 32768) {
          updating_y_scale = true;
          line_changes.y_scale = ctx2[15];
          add_flush_callback(() => updating_y_scale = false);
        }
        line.$set(line_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(line.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(line.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(line, detaching);
      }
    };
  }
  function create_fragment6(ctx) {
    let div;
    let h1;
    let t02;
    let t12;
    let figure;
    let svg;
    let lineaxis0;
    let updating_scale;
    let updating_height;
    let updating_width;
    let updating_margin;
    let lineaxis1;
    let updating_scale_1;
    let updating_height_1;
    let updating_width_1;
    let updating_margin_1;
    let circles;
    let svg_viewBox_value;
    let t2;
    let legend;
    let updating_groups;
    let updating_hues;
    let t3;
    let popup;
    let updating_mouse_move;
    let updating_mouse_out;
    let figure_resize_listener;
    let current;
    function lineaxis0_scale_binding(value) {
      ctx[24](value);
    }
    function lineaxis0_height_binding(value) {
      ctx[25](value);
    }
    function lineaxis0_width_binding(value) {
      ctx[26](value);
    }
    function lineaxis0_margin_binding(value) {
      ctx[27](value);
    }
    let lineaxis0_props = {
      position: "bottom",
      formater: ctx[19],
      label: ctx[7]
    };
    if (ctx[14] !== void 0) {
      lineaxis0_props.scale = ctx[14];
    }
    if (ctx[11] !== void 0) {
      lineaxis0_props.height = ctx[11];
    }
    if (ctx[12] !== void 0) {
      lineaxis0_props.width = ctx[12];
    }
    if (ctx[13] !== void 0) {
      lineaxis0_props.margin = ctx[13];
    }
    lineaxis0 = new line_axis_default({ props: lineaxis0_props });
    binding_callbacks.push(() => bind(lineaxis0, "scale", lineaxis0_scale_binding));
    binding_callbacks.push(() => bind(lineaxis0, "height", lineaxis0_height_binding));
    binding_callbacks.push(() => bind(lineaxis0, "width", lineaxis0_width_binding));
    binding_callbacks.push(() => bind(lineaxis0, "margin", lineaxis0_margin_binding));
    function lineaxis1_scale_binding(value) {
      ctx[28](value);
    }
    function lineaxis1_height_binding(value) {
      ctx[29](value);
    }
    function lineaxis1_width_binding(value) {
      ctx[30](value);
    }
    function lineaxis1_margin_binding(value) {
      ctx[31](value);
    }
    let lineaxis1_props = {
      position: "left",
      formater: ctx[20],
      label: ctx[8]
    };
    if (ctx[15] !== void 0) {
      lineaxis1_props.scale = ctx[15];
    }
    if (ctx[11] !== void 0) {
      lineaxis1_props.height = ctx[11];
    }
    if (ctx[12] !== void 0) {
      lineaxis1_props.width = ctx[12];
    }
    if (ctx[13] !== void 0) {
      lineaxis1_props.margin = ctx[13];
    }
    lineaxis1 = new line_axis_default({ props: lineaxis1_props });
    binding_callbacks.push(() => bind(lineaxis1, "scale", lineaxis1_scale_binding));
    binding_callbacks.push(() => bind(lineaxis1, "height", lineaxis1_height_binding));
    binding_callbacks.push(() => bind(lineaxis1, "width", lineaxis1_width_binding));
    binding_callbacks.push(() => bind(lineaxis1, "margin", lineaxis1_margin_binding));
    circles = new circles_default({
      props: {
        mapped_data: ctx[16],
        mouse_move: ctx[17],
        mouse_out: ctx[18]
      }
    });
    let if_block = ctx[4] && create_if_block2(ctx);
    function legend_groups_binding(value) {
      ctx[37](value);
    }
    function legend_hues_binding(value) {
      ctx[38](value);
    }
    let legend_props = {};
    if (ctx[9] !== void 0) {
      legend_props.groups = ctx[9];
    }
    if (ctx[10] !== void 0) {
      legend_props.hues = ctx[10];
    }
    legend = new legend_default({ props: legend_props });
    binding_callbacks.push(() => bind(legend, "groups", legend_groups_binding));
    binding_callbacks.push(() => bind(legend, "hues", legend_hues_binding));
    function popup_mouse_move_binding(value) {
      ctx[39](value);
    }
    function popup_mouse_out_binding(value) {
      ctx[40](value);
    }
    let popup_props = {
      data: ctx[0],
      groups: ctx[9],
      hues: ctx[10],
      x_accessor: ctx[1],
      group_accessor: ctx[3],
      tooltip_accessors: ctx[5]
    };
    if (ctx[17] !== void 0) {
      popup_props.mouse_move = ctx[17];
    }
    if (ctx[18] !== void 0) {
      popup_props.mouse_out = ctx[18];
    }
    popup = new popup_default({ props: popup_props });
    binding_callbacks.push(() => bind(popup, "mouse_move", popup_mouse_move_binding));
    binding_callbacks.push(() => bind(popup, "mouse_out", popup_mouse_out_binding));
    return {
      c() {
        div = element("div");
        h1 = element("h1");
        t02 = text(ctx[6]);
        t12 = space();
        figure = element("figure");
        svg = svg_element("svg");
        create_component(lineaxis0.$$.fragment);
        create_component(lineaxis1.$$.fragment);
        create_component(circles.$$.fragment);
        if (if_block)
          if_block.c();
        t2 = space();
        create_component(legend.$$.fragment);
        t3 = space();
        create_component(popup.$$.fragment);
        attr(h1, "class", "text-4xl font-semibold text-indigo-400");
        attr(svg, "height", "100%");
        attr(svg, "width", "100%");
        set_style(svg, "resize", "both");
        attr(svg, "viewBox", svg_viewBox_value = "0 0 " + ctx[12] + " " + ctx[11]);
        attr(svg, "preserveAspectRatio", "xMidYMid meet");
        attr(figure, "class", "flex flex-row w-full h-full items-center");
        add_render_callback(() => ctx[41].call(figure));
        attr(div, "class", "flex flex-col w-full h-full items-center p-12 bg-slate-900");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, h1);
        append(h1, t02);
        append(div, t12);
        append(div, figure);
        append(figure, svg);
        mount_component(lineaxis0, svg, null);
        mount_component(lineaxis1, svg, null);
        mount_component(circles, svg, null);
        if (if_block)
          if_block.m(svg, null);
        append(figure, t2);
        mount_component(legend, figure, null);
        append(figure, t3);
        mount_component(popup, figure, null);
        figure_resize_listener = add_resize_listener(figure, ctx[41].bind(figure));
        current = true;
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & 64)
          set_data(t02, ctx2[6]);
        const lineaxis0_changes = {};
        if (dirty[0] & 128)
          lineaxis0_changes.label = ctx2[7];
        if (!updating_scale && dirty[0] & 16384) {
          updating_scale = true;
          lineaxis0_changes.scale = ctx2[14];
          add_flush_callback(() => updating_scale = false);
        }
        if (!updating_height && dirty[0] & 2048) {
          updating_height = true;
          lineaxis0_changes.height = ctx2[11];
          add_flush_callback(() => updating_height = false);
        }
        if (!updating_width && dirty[0] & 4096) {
          updating_width = true;
          lineaxis0_changes.width = ctx2[12];
          add_flush_callback(() => updating_width = false);
        }
        if (!updating_margin && dirty[0] & 8192) {
          updating_margin = true;
          lineaxis0_changes.margin = ctx2[13];
          add_flush_callback(() => updating_margin = false);
        }
        lineaxis0.$set(lineaxis0_changes);
        const lineaxis1_changes = {};
        if (dirty[0] & 256)
          lineaxis1_changes.label = ctx2[8];
        if (!updating_scale_1 && dirty[0] & 32768) {
          updating_scale_1 = true;
          lineaxis1_changes.scale = ctx2[15];
          add_flush_callback(() => updating_scale_1 = false);
        }
        if (!updating_height_1 && dirty[0] & 2048) {
          updating_height_1 = true;
          lineaxis1_changes.height = ctx2[11];
          add_flush_callback(() => updating_height_1 = false);
        }
        if (!updating_width_1 && dirty[0] & 4096) {
          updating_width_1 = true;
          lineaxis1_changes.width = ctx2[12];
          add_flush_callback(() => updating_width_1 = false);
        }
        if (!updating_margin_1 && dirty[0] & 8192) {
          updating_margin_1 = true;
          lineaxis1_changes.margin = ctx2[13];
          add_flush_callback(() => updating_margin_1 = false);
        }
        lineaxis1.$set(lineaxis1_changes);
        const circles_changes = {};
        if (dirty[0] & 65536)
          circles_changes.mapped_data = ctx2[16];
        if (dirty[0] & 131072)
          circles_changes.mouse_move = ctx2[17];
        if (dirty[0] & 262144)
          circles_changes.mouse_out = ctx2[18];
        circles.$set(circles_changes);
        if (ctx2[4]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & 16) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block2(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(svg, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
        if (!current || dirty[0] & 6144 && svg_viewBox_value !== (svg_viewBox_value = "0 0 " + ctx2[12] + " " + ctx2[11])) {
          attr(svg, "viewBox", svg_viewBox_value);
        }
        const legend_changes = {};
        if (!updating_groups && dirty[0] & 512) {
          updating_groups = true;
          legend_changes.groups = ctx2[9];
          add_flush_callback(() => updating_groups = false);
        }
        if (!updating_hues && dirty[0] & 1024) {
          updating_hues = true;
          legend_changes.hues = ctx2[10];
          add_flush_callback(() => updating_hues = false);
        }
        legend.$set(legend_changes);
        const popup_changes = {};
        if (dirty[0] & 1)
          popup_changes.data = ctx2[0];
        if (dirty[0] & 512)
          popup_changes.groups = ctx2[9];
        if (dirty[0] & 1024)
          popup_changes.hues = ctx2[10];
        if (dirty[0] & 2)
          popup_changes.x_accessor = ctx2[1];
        if (dirty[0] & 8)
          popup_changes.group_accessor = ctx2[3];
        if (dirty[0] & 32)
          popup_changes.tooltip_accessors = ctx2[5];
        if (!updating_mouse_move && dirty[0] & 131072) {
          updating_mouse_move = true;
          popup_changes.mouse_move = ctx2[17];
          add_flush_callback(() => updating_mouse_move = false);
        }
        if (!updating_mouse_out && dirty[0] & 262144) {
          updating_mouse_out = true;
          popup_changes.mouse_out = ctx2[18];
          add_flush_callback(() => updating_mouse_out = false);
        }
        popup.$set(popup_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(lineaxis0.$$.fragment, local);
        transition_in(lineaxis1.$$.fragment, local);
        transition_in(circles.$$.fragment, local);
        transition_in(if_block);
        transition_in(legend.$$.fragment, local);
        transition_in(popup.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(lineaxis0.$$.fragment, local);
        transition_out(lineaxis1.$$.fragment, local);
        transition_out(circles.$$.fragment, local);
        transition_out(if_block);
        transition_out(legend.$$.fragment, local);
        transition_out(popup.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div);
        destroy_component(lineaxis0);
        destroy_component(lineaxis1);
        destroy_component(circles);
        if (if_block)
          if_block.d();
        destroy_component(legend);
        destroy_component(popup);
        figure_resize_listener();
      }
    };
  }
  function instance6($$self, $$props, $$invalidate) {
    let { data } = $$props;
    let { radius = 60 } = $$props;
    let { x_accessor } = $$props;
    let { y_accessor } = $$props;
    let { r_accessor = void 0 } = $$props;
    let { c_accessor } = $$props;
    let { draw_line = false } = $$props;
    let { tooltip_accessors } = $$props;
    let { graph_title } = $$props;
    let { x_label } = $$props;
    let { y_label } = $$props;
    let groups2, hues;
    let [height, width] = [50, 100];
    let margin = 50;
    let x_scale, y_scale, r_scale;
    const [x_formatter, y_formatter] = [timeFormat("%B\n%Y"), format(".2s")];
    let mapped_data;
    let mouse_move, mouse_out;
    function lineaxis0_scale_binding(value) {
      x_scale = value;
      $$invalidate(14, x_scale), $$invalidate(0, data), $$invalidate(1, x_accessor), $$invalidate(21, radius), $$invalidate(13, margin), $$invalidate(12, width);
    }
    function lineaxis0_height_binding(value) {
      height = value;
      $$invalidate(11, height);
    }
    function lineaxis0_width_binding(value) {
      width = value;
      $$invalidate(12, width);
    }
    function lineaxis0_margin_binding(value) {
      margin = value;
      $$invalidate(13, margin);
    }
    function lineaxis1_scale_binding(value) {
      y_scale = value;
      $$invalidate(15, y_scale), $$invalidate(0, data), $$invalidate(2, y_accessor), $$invalidate(11, height), $$invalidate(21, radius), $$invalidate(13, margin);
    }
    function lineaxis1_height_binding(value) {
      height = value;
      $$invalidate(11, height);
    }
    function lineaxis1_width_binding(value) {
      width = value;
      $$invalidate(12, width);
    }
    function lineaxis1_margin_binding(value) {
      margin = value;
      $$invalidate(13, margin);
    }
    function line_data_binding(value) {
      data = value;
      $$invalidate(0, data);
    }
    function line_x_accessor_binding(value) {
      x_accessor = value;
      $$invalidate(1, x_accessor);
    }
    function line_y_accessor_binding(value) {
      y_accessor = value;
      $$invalidate(2, y_accessor);
    }
    function line_x_scale_binding(value) {
      x_scale = value;
      $$invalidate(14, x_scale), $$invalidate(0, data), $$invalidate(1, x_accessor), $$invalidate(21, radius), $$invalidate(13, margin), $$invalidate(12, width);
    }
    function line_y_scale_binding(value) {
      y_scale = value;
      $$invalidate(15, y_scale), $$invalidate(0, data), $$invalidate(2, y_accessor), $$invalidate(11, height), $$invalidate(21, radius), $$invalidate(13, margin);
    }
    function legend_groups_binding(value) {
      groups2 = value;
      $$invalidate(9, groups2), $$invalidate(0, data), $$invalidate(3, c_accessor);
    }
    function legend_hues_binding(value) {
      hues = value;
      $$invalidate(10, hues), $$invalidate(9, groups2), $$invalidate(0, data), $$invalidate(3, c_accessor);
    }
    function popup_mouse_move_binding(value) {
      mouse_move = value;
      $$invalidate(17, mouse_move);
    }
    function popup_mouse_out_binding(value) {
      mouse_out = value;
      $$invalidate(18, mouse_out);
    }
    function figure_elementresize_handler() {
      height = this.clientHeight;
      width = this.clientWidth;
      $$invalidate(11, height);
      $$invalidate(12, width);
    }
    $$self.$$set = ($$props2) => {
      if ("data" in $$props2)
        $$invalidate(0, data = $$props2.data);
      if ("radius" in $$props2)
        $$invalidate(21, radius = $$props2.radius);
      if ("x_accessor" in $$props2)
        $$invalidate(1, x_accessor = $$props2.x_accessor);
      if ("y_accessor" in $$props2)
        $$invalidate(2, y_accessor = $$props2.y_accessor);
      if ("r_accessor" in $$props2)
        $$invalidate(22, r_accessor = $$props2.r_accessor);
      if ("c_accessor" in $$props2)
        $$invalidate(3, c_accessor = $$props2.c_accessor);
      if ("draw_line" in $$props2)
        $$invalidate(4, draw_line = $$props2.draw_line);
      if ("tooltip_accessors" in $$props2)
        $$invalidate(5, tooltip_accessors = $$props2.tooltip_accessors);
      if ("graph_title" in $$props2)
        $$invalidate(6, graph_title = $$props2.graph_title);
      if ("x_label" in $$props2)
        $$invalidate(7, x_label = $$props2.x_label);
      if ("y_label" in $$props2)
        $$invalidate(8, y_label = $$props2.y_label);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty[0] & 9) {
        $:
          $$invalidate(9, groups2 = Array.from(group(data, c_accessor).keys()));
      }
      if ($$self.$$.dirty[0] & 512) {
        $:
          $$invalidate(10, hues = (0, import_iwanthue.default)(groups2.length, {
            "colorSpace": [0, 360, 0, 100, 50, 100],
            "clustering": "force-vector",
            "seed": "exSTATic!"
          }));
      }
      if ($$self.$$.dirty[0] & 2109443) {
        $:
          $$invalidate(14, x_scale = time().domain(extent(data, x_accessor)).range([radius + margin, width - radius - margin]));
      }
      if ($$self.$$.dirty[0] & 2107397) {
        $:
          $$invalidate(15, y_scale = linear2().domain(extent(data, y_accessor)).range([height - radius - margin, radius + margin]));
      }
      if ($$self.$$.dirty[0] & 6291457) {
        $:
          $$invalidate(23, r_scale = linear2().domain(extent(data, r_accessor)).range([0, radius]));
      }
      if ($$self.$$.dirty[0] & 14730767) {
        $:
          $$invalidate(16, mapped_data = data.map((d, i) => ({
            "x": x_scale(x_accessor(d)),
            "y": y_scale(y_accessor(d)),
            "r": r_accessor !== void 0 ? r_scale(r_accessor(d)) : radius,
            "c": hues[groups2.indexOf(c_accessor(d))],
            i
          })));
      }
    };
    return [
      data,
      x_accessor,
      y_accessor,
      c_accessor,
      draw_line,
      tooltip_accessors,
      graph_title,
      x_label,
      y_label,
      groups2,
      hues,
      height,
      width,
      margin,
      x_scale,
      y_scale,
      mapped_data,
      mouse_move,
      mouse_out,
      x_formatter,
      y_formatter,
      radius,
      r_accessor,
      r_scale,
      lineaxis0_scale_binding,
      lineaxis0_height_binding,
      lineaxis0_width_binding,
      lineaxis0_margin_binding,
      lineaxis1_scale_binding,
      lineaxis1_height_binding,
      lineaxis1_width_binding,
      lineaxis1_margin_binding,
      line_data_binding,
      line_x_accessor_binding,
      line_y_accessor_binding,
      line_x_scale_binding,
      line_y_scale_binding,
      legend_groups_binding,
      legend_hues_binding,
      popup_mouse_move_binding,
      popup_mouse_out_binding,
      figure_elementresize_handler
    ];
  }
  var Scatterplot = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance6, create_fragment6, safe_not_equal, {
        data: 0,
        radius: 21,
        x_accessor: 1,
        y_accessor: 2,
        r_accessor: 22,
        c_accessor: 3,
        draw_line: 4,
        tooltip_accessors: 5,
        graph_title: 6,
        x_label: 7,
        y_label: 8
      }, null, [-1, -1]);
    }
  };
  var scatterplot_default = Scatterplot;

  // node_modules/date-fns/esm/_lib/toInteger/index.js
  function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }
    var number5 = Number(dirtyNumber);
    if (isNaN(number5)) {
      return number5;
    }
    return number5 < 0 ? Math.ceil(number5) : Math.floor(number5);
  }

  // node_modules/date-fns/esm/_lib/requiredArgs/index.js
  function requiredArgs(required, args) {
    if (args.length < required) {
      throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
    }
  }

  // node_modules/date-fns/esm/constants/index.js
  var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
  var millisecondsInMinute = 6e4;
  var millisecondsInHour = 36e5;
  var minTime = -maxTime;

  // node_modules/date-fns/esm/parseISO/index.js
  function parseISO(argument, dirtyOptions) {
    requiredArgs(1, arguments);
    var options = dirtyOptions || {};
    var additionalDigits = options.additionalDigits == null ? 2 : toInteger(options.additionalDigits);
    if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
      throw new RangeError("additionalDigits must be 0, 1 or 2");
    }
    if (!(typeof argument === "string" || Object.prototype.toString.call(argument) === "[object String]")) {
      return new Date(NaN);
    }
    var dateStrings = splitDateString(argument);
    var date2;
    if (dateStrings.date) {
      var parseYearResult = parseYear2(dateStrings.date, additionalDigits);
      date2 = parseDate(parseYearResult.restDateString, parseYearResult.year);
    }
    if (!date2 || isNaN(date2.getTime())) {
      return new Date(NaN);
    }
    var timestamp = date2.getTime();
    var time2 = 0;
    var offset;
    if (dateStrings.time) {
      time2 = parseTime(dateStrings.time);
      if (isNaN(time2)) {
        return new Date(NaN);
      }
    }
    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone);
      if (isNaN(offset)) {
        return new Date(NaN);
      }
    } else {
      var dirtyDate = new Date(timestamp + time2);
      var result = new Date(0);
      result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
      result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
      return result;
    }
    return new Date(timestamp + time2 + offset);
  }
  var patterns = {
    dateTimeDelimiter: /[T ]/,
    timeZoneDelimiter: /[Z ]/i,
    timezone: /([Z+-].*)$/
  };
  var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
  var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
  var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
  function splitDateString(dateString) {
    var dateStrings = {};
    var array2 = dateString.split(patterns.dateTimeDelimiter);
    var timeString;
    if (array2.length > 2) {
      return dateStrings;
    }
    if (/:/.test(array2[0])) {
      timeString = array2[0];
    } else {
      dateStrings.date = array2[0];
      timeString = array2[1];
      if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
        dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
        timeString = dateString.substr(dateStrings.date.length, dateString.length);
      }
    }
    if (timeString) {
      var token = patterns.timezone.exec(timeString);
      if (token) {
        dateStrings.time = timeString.replace(token[1], "");
        dateStrings.timezone = token[1];
      } else {
        dateStrings.time = timeString;
      }
    }
    return dateStrings;
  }
  function parseYear2(dateString, additionalDigits) {
    var regex = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)");
    var captures = dateString.match(regex);
    if (!captures)
      return {
        year: NaN,
        restDateString: ""
      };
    var year2 = captures[1] ? parseInt(captures[1]) : null;
    var century = captures[2] ? parseInt(captures[2]) : null;
    return {
      year: century === null ? year2 : century * 100,
      restDateString: dateString.slice((captures[1] || captures[2]).length)
    };
  }
  function parseDate(dateString, year2) {
    if (year2 === null)
      return new Date(NaN);
    var captures = dateString.match(dateRegex);
    if (!captures)
      return new Date(NaN);
    var isWeekDate = !!captures[4];
    var dayOfYear = parseDateUnit(captures[1]);
    var month2 = parseDateUnit(captures[2]) - 1;
    var day2 = parseDateUnit(captures[3]);
    var week = parseDateUnit(captures[4]);
    var dayOfWeek = parseDateUnit(captures[5]) - 1;
    if (isWeekDate) {
      if (!validateWeekDate(year2, week, dayOfWeek)) {
        return new Date(NaN);
      }
      return dayOfISOWeekYear(year2, week, dayOfWeek);
    } else {
      var date2 = new Date(0);
      if (!validateDate(year2, month2, day2) || !validateDayOfYearDate(year2, dayOfYear)) {
        return new Date(NaN);
      }
      date2.setUTCFullYear(year2, month2, Math.max(dayOfYear, day2));
      return date2;
    }
  }
  function parseDateUnit(value) {
    return value ? parseInt(value) : 1;
  }
  function parseTime(timeString) {
    var captures = timeString.match(timeRegex);
    if (!captures)
      return NaN;
    var hours2 = parseTimeUnit(captures[1]);
    var minutes2 = parseTimeUnit(captures[2]);
    var seconds2 = parseTimeUnit(captures[3]);
    if (!validateTime(hours2, minutes2, seconds2)) {
      return NaN;
    }
    return hours2 * millisecondsInHour + minutes2 * millisecondsInMinute + seconds2 * 1e3;
  }
  function parseTimeUnit(value) {
    return value && parseFloat(value.replace(",", ".")) || 0;
  }
  function parseTimezone(timezoneString) {
    if (timezoneString === "Z")
      return 0;
    var captures = timezoneString.match(timezoneRegex);
    if (!captures)
      return 0;
    var sign2 = captures[1] === "+" ? -1 : 1;
    var hours2 = parseInt(captures[2]);
    var minutes2 = captures[3] && parseInt(captures[3]) || 0;
    if (!validateTimezone(hours2, minutes2)) {
      return NaN;
    }
    return sign2 * (hours2 * millisecondsInHour + minutes2 * millisecondsInMinute);
  }
  function dayOfISOWeekYear(isoWeekYear, week, day2) {
    var date2 = new Date(0);
    date2.setUTCFullYear(isoWeekYear, 0, 4);
    var fourthOfJanuaryDay = date2.getUTCDay() || 7;
    var diff = (week - 1) * 7 + day2 + 1 - fourthOfJanuaryDay;
    date2.setUTCDate(date2.getUTCDate() + diff);
    return date2;
  }
  var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function isLeapYearIndex(year2) {
    return year2 % 400 === 0 || year2 % 4 === 0 && year2 % 100 !== 0;
  }
  function validateDate(year2, month2, date2) {
    return month2 >= 0 && month2 <= 11 && date2 >= 1 && date2 <= (daysInMonths[month2] || (isLeapYearIndex(year2) ? 29 : 28));
  }
  function validateDayOfYearDate(year2, dayOfYear) {
    return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year2) ? 366 : 365);
  }
  function validateWeekDate(_year, week, day2) {
    return week >= 1 && week <= 53 && day2 >= 0 && day2 <= 6;
  }
  function validateTime(hours2, minutes2, seconds2) {
    if (hours2 === 24) {
      return minutes2 === 0 && seconds2 === 0;
    }
    return seconds2 >= 0 && seconds2 < 60 && minutes2 >= 0 && minutes2 < 60 && hours2 >= 0 && hours2 < 25;
  }
  function validateTimezone(_hours, minutes2) {
    return minutes2 >= 0 && minutes2 <= 59;
  }

  // src/stats/stats.svelte
  function create_fragment7(ctx) {
    let div;
    let scatterplot0;
    let t02;
    let scatterplot1;
    let t12;
    let scatterplot2;
    let t2;
    let scatterplot3;
    let current;
    scatterplot0 = new scatterplot_default({
      props: {
        data: ctx[0],
        x_accessor: ctx[3],
        y_accessor: ctx[4],
        r_accessor: func_2,
        c_accessor: func_3,
        tooltip_accessors: ctx[2],
        graph_title: "Immersion Gains",
        x_label: "Date",
        y_label: "Reading Speed"
      }
    });
    scatterplot1 = new scatterplot_default({
      props: {
        data: ctx[0],
        x_accessor: ctx[5],
        y_accessor: ctx[6],
        r_accessor: func_6,
        c_accessor: func_7,
        tooltip_accessors: ctx[2],
        graph_title: "Immersion Quantity",
        x_label: "Date",
        y_label: "Time Read"
      }
    });
    scatterplot2 = new scatterplot_default({
      props: {
        data: ctx[0],
        x_accessor: ctx[7],
        y_accessor: ctx[8],
        c_accessor: func_10,
        radius: 7,
        draw_line: true,
        tooltip_accessors: ctx[2],
        graph_title: "Immersion Gains",
        x_label: "Date",
        y_label: "Reading Speed"
      }
    });
    scatterplot3 = new scatterplot_default({
      props: {
        data: ctx[0],
        x_accessor: ctx[9],
        y_accessor: ctx[10],
        c_accessor: func_13,
        radius: 7,
        draw_line: true,
        tooltip_accessors: ctx[2],
        graph_title: "Immersion Quantity",
        x_label: "Date",
        y_label: "Time Read"
      }
    });
    return {
      c() {
        div = element("div");
        create_component(scatterplot0.$$.fragment);
        t02 = space();
        create_component(scatterplot1.$$.fragment);
        t12 = space();
        create_component(scatterplot2.$$.fragment);
        t2 = space();
        create_component(scatterplot3.$$.fragment);
        attr(div, "class", "flex flex-col h-full w-full absolute p-20 gap-20");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        mount_component(scatterplot0, div, null);
        append(div, t02);
        mount_component(scatterplot1, div, null);
        append(div, t12);
        mount_component(scatterplot2, div, null);
        append(div, t2);
        mount_component(scatterplot3, div, null);
        current = true;
      },
      p(ctx2, [dirty]) {
        const scatterplot0_changes = {};
        if (dirty & 1)
          scatterplot0_changes.data = ctx2[0];
        scatterplot0.$set(scatterplot0_changes);
        const scatterplot1_changes = {};
        if (dirty & 1)
          scatterplot1_changes.data = ctx2[0];
        scatterplot1.$set(scatterplot1_changes);
        const scatterplot2_changes = {};
        if (dirty & 1)
          scatterplot2_changes.data = ctx2[0];
        scatterplot2.$set(scatterplot2_changes);
        const scatterplot3_changes = {};
        if (dirty & 1)
          scatterplot3_changes.data = ctx2[0];
        scatterplot3.$set(scatterplot3_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(scatterplot0.$$.fragment, local);
        transition_in(scatterplot1.$$.fragment, local);
        transition_in(scatterplot2.$$.fragment, local);
        transition_in(scatterplot3.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(scatterplot0.$$.fragment, local);
        transition_out(scatterplot1.$$.fragment, local);
        transition_out(scatterplot2.$$.fragment, local);
        transition_out(scatterplot3.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div);
        destroy_component(scatterplot0);
        destroy_component(scatterplot1);
        destroy_component(scatterplot2);
        destroy_component(scatterplot3);
      }
    };
  }
  var func_2 = (d) => d.chars_read;
  var func_3 = (d) => d.name;
  var func_6 = (d) => d.chars_read;
  var func_7 = (d) => d.name;
  var func_10 = (d) => d.name;
  var func_13 = (d) => d.name;
  function instance7($$self, $$props, $$invalidate) {
    const SECS_TO_HRS = 60 * 60;
    let { data } = $$props;
    const uuid_groups = group(data, (d) => d.uuid);
    const time_read_per = rollup(data, (v) => sum(v, (d) => d.time_read / SECS_TO_HRS), (d) => d.uuid);
    const chars_read_per = rollup(data, (v) => sum(v, (d) => d.chars_read), (d) => d.uuid);
    const read_speed_per = rollup(data, (v) => sum(v, (d) => d.read_speed * SECS_TO_HRS), (d) => d.uuid);
    const tooltip_accessors = {
      "Chars Read": (d) => d.chars_read,
      "Time Read": (d) => d.time_read / SECS_TO_HRS,
      "Read Speed": (d) => Math.round(d.read_speed * SECS_TO_HRS)
    };
    const func = (d) => parseISO(d.date);
    const func_1 = (d) => d.read_speed * SECS_TO_HRS;
    const func_4 = (d) => parseISO(d.date);
    const func_5 = (d) => d.time_read / SECS_TO_HRS;
    const func_8 = (d) => parseISO(d.date);
    const func_9 = (d) => d.read_speed * SECS_TO_HRS;
    const func_11 = (d) => parseISO(d.date);
    const func_12 = (d) => d.time_read / SECS_TO_HRS;
    $$self.$$set = ($$props2) => {
      if ("data" in $$props2)
        $$invalidate(0, data = $$props2.data);
    };
    return [
      data,
      SECS_TO_HRS,
      tooltip_accessors,
      func,
      func_1,
      func_4,
      func_5,
      func_8,
      func_9,
      func_11,
      func_12
    ];
  }
  var Stats = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance7, create_fragment7, safe_not_equal, { data: 0 });
    }
  };
  var stats_default = Stats;

  // src/stats/stats_inject.ts
  console.log("Injected");
  var setup = async () => {
    new stats_default({
      target: document.documentElement,
      props: {
        data: await getData()
      }
    });
  };
  setup();
})();
