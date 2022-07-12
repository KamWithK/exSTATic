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

  // src/calculations.js
  var IGNORE = /[〔〕《》〖〗〘〙〚〛【】「」［］『』｛｝\[\]()（）｟｠〈〉≪≫。、.,※＊'：！?？‥…―─ｰ〽～→♪♪ ♫ ♬ ♩\"　\t\n]/g;
  var SPLIT = /[\n。.！?？]/g;
  function charsInLine(line2) {
    return line2.replaceAll(IGNORE, "").length;
  }
  function lineSplitCount(line2) {
    return line2.split(SPLIT).length;
  }
  function dateNowString() {
    rn = new Date();
    return rn.getFullYear() + "/" + (rn.getMonth() + 1) + "/" + rn.getDate();
  }
  function timeNowSeconds() {
    rn = new Date();
    return rn.getTime() / 1e3;
  }

  // src/storage.js
  var MAX_TIME_AWAY = 60;
  async function previousGameEntry() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get("previously_hooked", function(game_entry2) {
        if (game_entry2 === void 0 || game_entry2["previously_hooked"] === void 0) {
          reject();
        }
        chrome.storage.local.get(game_entry2["previously_hooked"], function(game_entry3) {
          resolve(game_entry3);
        });
      });
    });
  }
  async function todayGameEntry() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get("previously_hooked", function(game_entry2) {
        if (game_entry2 === void 0 || game_entry2["previously_hooked"] === void 0) {
          reject();
        }
        chrome.storage.local.get(game_entry2["previously_hooked"] + "_" + dateNowString(), function(game_entry3) {
          resolve(game_entry3);
        });
      });
    });
  }
  function safeDeleteLine(process_path2, line_id2, line2) {
    line_key = JSON.stringify([process_path2, line_id2]);
    chrome.storage.local.remove(line_key);
    chrome.storage.local.get(process_path2, function(game_entry2) {
      last_read_date = game_entry2[process_path2]["dates_read_on"].at(-1);
      game_date_key = process_path2 + "_" + last_read_date;
      chrome.storage.local.get(game_date_key, function(game_entry3) {
        game_entry3[game_date_key]["lines_read"] -= lineSplitCount(line2);
        game_entry3[game_date_key]["chars_read"] -= charsInLine(line2);
        chrome.storage.local.set(game_entry3);
      });
    });
  }
  function setConstants() {
    chrome.storage.local.get("afk_max_time", function(afk_max_entry) {
      if ("afk_max_time" in afk_max_entry) {
        MAX_TIME_AWAY = afk_max_entry["afk_max_time"];
      }
    });
  }
  setConstants();

  // src/check_entry_type.js
  function isGameEntry(key, new_value) {
    try {
      return typeof key === "string" && typeof new_value == "object" && "name" in new_value && "dates_read_on" in new_value && "last_line_added" in new_value;
    } catch {
    }
    return false;
  }
  function isGameDateEntry(key, new_value) {
    try {
      return typeof key === "string" && typeof new_value == "object" && "lines_read" in new_value && "chars_read" in new_value && "time_read" in new_value && "last_line_recieved" in new_value;
    } catch {
    }
    return false;
  }
  function isLineEntry(key, old_value, new_value) {
    try {
      parsed = JSON.parse(key);
      if (old_value == void 0 && typeof new_value == "string" && typeof key === "string" && parsed.length == 2 && typeof parsed[0] === "string" && Number.isInteger(parsed[1])) {
        return parsed;
      }
    } catch {
    }
    return false;
  }

  // src/stats.js
  var browser = require_browser_polyfill();
  var SECS_TO_HRS = 60 * 60;
  async function getGameData(process_path2) {
    game_entry = (await browser.storage.local.get(process_path2))[process_path2];
    game_date_keys = game_entry["dates_read_on"].map((date2) => process_path2 + "_" + date2);
    game_date_entries = await browser.storage.local.get(game_date_keys);
    return Object.values(game_date_entries).map((game_date_entry2, index) => {
      delete game_date_entry2["last_line_recieved"];
      game_date_entry2["time_read"] = game_date_entry2["time_read"] / SECS_TO_HRS;
      game_date_entry2["read_speed"] = game_date_entry2["chars_read"] / game_date_entry2["time_read"];
      game_date_entry2["date"] = game_entry["dates_read_on"][index];
      game_date_entry2["process_path"] = process_path2;
      game_date_entry2["name"] = game_entry["name"];
      return game_date_entry2;
    });
  }
  async function getData() {
    games = (await browser.storage.local.get("games"))["games"];
    game_data = games.map((game) => getGameData(game));
    return (await Promise.all(game_data)).flat();
  }
  async function exportStats() {
    data = await getData();
    console.log(data.map((entry) => entry));
    csv_string = Object.keys(data[0]).join(",") + "\r\n" + data.map((entry) => Object.values(entry).join(",")).join("\r\n");
    chrome.runtime.sendMessage({
      "action": "export_csv",
      "csv": [csv_string],
      "blob_options": { "type": "text/csv" },
      "filename": "chartracker_stats.csv"
    });
  }

  // src/tracker_inject.js
  console.log("Injected");
  var SECS_TO_HOURS = 60 * 60;
  var MAX_TIME_AWAY2 = 60;
  var REFRESH_STATS_INTERVAL = 1e3;
  var previous_game;
  var previous_time;
  var chars_read;
  var time_read;
  var idle_time_added = true;
  function gameNameChanged(event) {
    chrome.storage.local.get(previous_game, function(game_entry2) {
      game_entry2[previous_game]["name"] = event["target"].value;
      chrome.storage.local.set(game_entry2);
    });
  }
  document.getElementById("game_name").onchange = gameNameChanged;
  async function showNameTitle(game_name) {
    game_name_heading = document.getElementById("game_name");
    game_name_heading.disabled = true;
    game_name_heading.value = game_name;
    game_name_heading.disabled = false;
    document.title = "CharTracker | " + game_name;
  }
  function deleteLine(event) {
    confirmed = confirm("Are you sure you'd like to delete this line?\nChar and line statistics will be modified accordingly however time read won't change...");
    if (confirmed) {
      element_div = event["target"].parentNode;
      line_id = Number.parseInt(element_div.dataset.line_id);
      line = element_div.querySelector(".sentence").textContent;
      safeDeleteLine(previous_game, line_id, line);
      element_div.remove();
    }
  }
  function newLineDiv(line2, line_id2) {
    container_div = document.createElement("div");
    new_svg = document.createElement("svg");
    new_p = document.createElement("p");
    new_button = document.createElement("button");
    container_div.classList.add("sentence-entry");
    new_svg.classList.add("circle-bullet-point");
    new_p.classList.add("sentence");
    new_button.classList.add("delete-button");
    new_button.classList.add("material-icons");
    container_div.dataset.line_id = line_id2;
    new_p.innerHTML = line2;
    new_button.innerHTML = "delete";
    new_button.onclick = deleteLine;
    container_div.appendChild(new_svg);
    container_div.appendChild(new_p);
    container_div.appendChild(new_button);
    return container_div;
  }
  function insertLine(line2, line_id2) {
    entry_holder = document.getElementById("entry_holder");
    new_div = newLineDiv(line2, line_id2);
    entry_holder.appendChild(new_div);
  }
  async function bulkLineAdd(game_entry2, game_name) {
    max_line_id = game_entry2["last_line_added"];
    id_queries = [...Array(max_line_id + 1).keys()].map((id) => JSON.stringify([game_name, id]));
    chrome.storage.local.get(id_queries, function(game_date_entries2) {
      line_divs = [];
      for (let [key, line2] of Object.entries(game_date_entries2)) {
        line_id = JSON.parse(key)[1];
        line_divs.push(newLineDiv(line2, line_id));
      }
      document.getElementById("entry_holder").replaceChildren(...line_divs);
    });
  }
  function setStats(chars_read2, time_read2) {
    document.getElementById("chars_read").innerHTML = chars_read2.toLocaleString();
    average = Math.round(chars_read2 / (time_read2 / SECS_TO_HOURS));
    document.getElementById("chars_per_hour").innerHTML = average.toLocaleString();
    date = new Date(0);
    date.setSeconds(time_read2);
    document.getElementById("elapsed_time").innerHTML = date.toISOString().substr(11, 8);
  }
  document.getElementById("font").onchange = function(event) {
    chrome.storage.local.set({
      "font": event["target"].value
    });
    document.documentElement.style.setProperty("--default-jp-font", event["target"].value);
  };
  document.getElementById("font_size").onchange = function(event) {
    chrome.storage.local.set({
      "font_size": event["target"].value
    });
    document.documentElement.style.setProperty("--default-jp-font-size", event["target"].value + "rem");
  };
  document.getElementById("afk_max_time").onchange = function(event) {
    chrome.storage.local.set({ "afk_max_time": event["target"].value });
  };
  document.getElementById("view_stats").onclick = function(event) {
    url = chrome.runtime.getURL("docs/stats.html");
    chrome.runtime.sendMessage({
      "action": "open_tab",
      "url": "https://kamwithk.github.io/CharTracker/stats.html"
    });
  };
  async function startup() {
    document.getElementById("entry_holder").replaceChildren();
    try {
      chrome.storage.local.get(["font", "font_size", "afk_max_time"], function(property_entries) {
        if (property_entries.hasOwnProperty("font")) {
          document.getElementById("font").value = property_entries["font"];
          document.documentElement.style.setProperty("--default-jp-font", property_entries["font"]);
        }
        if (property_entries.hasOwnProperty("font_size")) {
          document.getElementById("font_size").value = property_entries["font_size"];
          document.documentElement.style.setProperty("--default-jp-font-size", property_entries["font_size"] + "rem");
        }
        if (property_entries.hasOwnProperty("afk_max_time")) {
          MAX_TIME_AWAY2 = property_entries["afk_max_time"];
          document.getElementById("afk_max_time").value = property_entries["afk_max_time"];
        }
      });
      game_entry = await previousGameEntry();
      previous_game = Object.keys(game_entry)[0];
      bulkLineAdd(game_entry[previous_game], previous_game);
      showNameTitle(game_entry[previous_game]["name"]);
      today_previous_game = await todayGameEntry();
      today_previous_game = today_previous_game[Object.keys(today_previous_game)[0]];
      previous_time = today_previous_game["last_line_recieved"];
      chars_read = today_previous_game["chars_read"];
      time_read = today_previous_game["time_read"];
      setStats(chars_read, time_read);
    } catch {
    }
  }
  startup();
  setInterval(async function() {
    time_now = timeNowSeconds();
    time_between_lines = time_now - previous_time;
    if (time_between_lines <= MAX_TIME_AWAY2) {
      idle_time_added = false;
      time_so_far = time_read + time_between_lines;
      setStats(chars_read, time_so_far);
    } else {
      if (!idle_time_added) {
        time_read += MAX_TIME_AWAY2;
        setStats(chars_read, time_read);
        game_entry = await todayGameEntry();
        game_entry[Object.keys(game_entry)[0]]["time_read"] = time_read;
        chrome.storage.local.set(game_entry);
        idle_time_added = true;
      }
    }
  }, REFRESH_STATS_INTERVAL);
  chrome.storage.local.onChanged.addListener(function(changes, _) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (isGameEntry(key, newValue)) {
        if (key != previous_game) {
          previous_game = key;
          showNameTitle(newValue["name"]);
          bulkLineAdd(newValue, key);
        }
      }
      if (isGameDateEntry(key, newValue)) {
        previous_time = newValue["last_line_recieved"];
        chars_read = newValue["chars_read"];
        time_read = newValue["time_read"];
      }
      key = isLineEntry(key, oldValue, newValue);
      if (key) {
        process_path = key[0];
        line_id = key[1];
        line = newValue;
        if (process_path == previous_game) {
          insertLine(line, line_id);
        }
      }
    }
  });
  document.getElementById("export_stats").onclick = exportStats;
})();
