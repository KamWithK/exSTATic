(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

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

  // src/mokuro/mokuro_storage.js
  var browser3 = require_browser_polyfill();
  var MokuroStorage = class extends MediaStorage {
    static async build(live_stat_update = false) {
      let [type_storage, instance_storage] = await super.build("mokuro");
      await MokuroStorage.setPages(instance_storage);
      await type_storage.updateProperties({ "afk_max_time": 60 });
      return new MokuroStorage(type_storage, instance_storage, live_stat_update);
    }
    static async setPages(instance_storage) {
      if (instance_storage === void 0)
        return;
      let details = {};
      if (instance_storage.details["last_page_read"] === void 0) {
        details["last_page_read"] = 0;
      }
      await instance_storage.updateDetails(details);
    }
    async setDetails(series, page_count) {
      if (this.details["series"] === void 0) {
        this.instance_storage.updateDetails({ "series": series });
      }
      if (this.details["page_count"] !== page_count) {
        this.instance_storage.updateDetails({ "page_count": page_count });
      }
    }
    async changeInstance(new_uuid, given_identifier = void 0) {
      await super.changeInstance(new_uuid, given_identifier);
      await MokuroStorage.setPages(this.instance_storage);
    }
    async processPage(page_num, lines, date) {
      let stats = {};
      stats["chars_read"] = lines.reduce((total, line) => total + charsInLine(line), 0);
      stats["lines_read"] = lines.reduce((total, line) => total + lineSplitCount(line), 0);
      stats["pages_read"] = Math.abs(page_num - this.details["last_page_read"]);
      if (page_num > this.details["last_page_read"]) {
        await this.instance_storage.addDailyStats(date, stats);
        this.start_ticker(false);
      } else if (page_num < this.details["last_page_read"]) {
        await this.instance_storage.subDailyStats(date, stats);
        this.stop_ticker();
      }
      await this.instance_storage.updateDetails({ "last_page_read": page_num });
      await this.instance_storage.addToDates(date);
      await this.instance_storage.addToDate(date);
    }
  };

  // src/mokuro/mokuro_inject.js
  console.log("Injected");
  var SPLIT_PATH = /\\|\//g;
  var mokuro_storage;
  function getVolumeSeries() {
    let paths = decodeURI(window.location.href).split(SPLIT_PATH);
    let volume = paths[paths.length - 1].replace(/\.html.*$/, "");
    let series = paths[paths.length - 2];
    return [volume, series];
  }
  function getPage() {
    let [current_page, total_pages] = document.getElementById("pageIdxDisplay").innerText.split("/");
    current_page = Number.parseInt(current_page) - 1;
    total_pages = Number.parseInt(total_pages);
    return [current_page, total_pages];
  }
  var getGivenID = (series, volume) => JSON.stringify([series, volume]);
  async function setup() {
    mokuro_storage = await MokuroStorage.build(true);
    const [volume, series] = getVolumeSeries();
    const [current_page, total_pages] = getPage();
    await mokuro_storage.changeInstance(void 0, getGivenID(series, volume));
    await mokuro_storage.setDetails(series, total_pages);
    await mokuro_storage.instance_storage.updateDetails({ "last_page_read": current_page });
  }
  setup();
  var observer = new MutationObserver(async (_) => {
    const [volume, series] = getVolumeSeries();
    const [current_page, total_pages] = getPage();
    const get_page = current_page > mokuro_storage.details["last_page_read"] ? current_page - 1 : current_page;
    const lines = Array.from(document.getElementById(`page${get_page}`).firstChild.childNodes).map((element) => Array.from(element.childNodes).reduce((so_far, node) => `${so_far}${node.textContent}`, ""));
    await mokuro_storage.changeInstance(void 0, getGivenID(series, volume));
    await mokuro_storage.setDetails(series, total_pages);
    await mokuro_storage.processPage(current_page, lines, dateNowString());
  });
  observer.observe(document.getElementById("pageIdxDisplay"), { "childList": true, "subtree": true });
})();
