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

  // node_modules/date-fns/esm/_lib/toInteger/index.js
  function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }
    var number = Number(dirtyNumber);
    if (isNaN(number)) {
      return number;
    }
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }

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

  // node_modules/date-fns/esm/constants/index.js
  var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
  var millisecondsInMinute = 6e4;
  var millisecondsInHour = 36e5;
  var minTime = -maxTime;

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
    var date;
    if (dateStrings.date) {
      var parseYearResult = parseYear(dateStrings.date, additionalDigits);
      date = parseDate(parseYearResult.restDateString, parseYearResult.year);
    }
    if (!date || isNaN(date.getTime())) {
      return new Date(NaN);
    }
    var timestamp = date.getTime();
    var time = 0;
    var offset;
    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
      if (isNaN(time)) {
        return new Date(NaN);
      }
    }
    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone);
      if (isNaN(offset)) {
        return new Date(NaN);
      }
    } else {
      var dirtyDate = new Date(timestamp + time);
      var result = new Date(0);
      result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
      result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
      return result;
    }
    return new Date(timestamp + time + offset);
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
    var array = dateString.split(patterns.dateTimeDelimiter);
    var timeString;
    if (array.length > 2) {
      return dateStrings;
    }
    if (/:/.test(array[0])) {
      timeString = array[0];
    } else {
      dateStrings.date = array[0];
      timeString = array[1];
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
  function parseYear(dateString, additionalDigits) {
    var regex = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)");
    var captures = dateString.match(regex);
    if (!captures)
      return {
        year: NaN,
        restDateString: ""
      };
    var year = captures[1] ? parseInt(captures[1]) : null;
    var century = captures[2] ? parseInt(captures[2]) : null;
    return {
      year: century === null ? year : century * 100,
      restDateString: dateString.slice((captures[1] || captures[2]).length)
    };
  }
  function parseDate(dateString, year) {
    if (year === null)
      return new Date(NaN);
    var captures = dateString.match(dateRegex);
    if (!captures)
      return new Date(NaN);
    var isWeekDate = !!captures[4];
    var dayOfYear = parseDateUnit(captures[1]);
    var month = parseDateUnit(captures[2]) - 1;
    var day = parseDateUnit(captures[3]);
    var week = parseDateUnit(captures[4]);
    var dayOfWeek = parseDateUnit(captures[5]) - 1;
    if (isWeekDate) {
      if (!validateWeekDate(year, week, dayOfWeek)) {
        return new Date(NaN);
      }
      return dayOfISOWeekYear(year, week, dayOfWeek);
    } else {
      var date = new Date(0);
      if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
        return new Date(NaN);
      }
      date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
      return date;
    }
  }
  function parseDateUnit(value) {
    return value ? parseInt(value) : 1;
  }
  function parseTime(timeString) {
    var captures = timeString.match(timeRegex);
    if (!captures)
      return NaN;
    var hours = parseTimeUnit(captures[1]);
    var minutes = parseTimeUnit(captures[2]);
    var seconds = parseTimeUnit(captures[3]);
    if (!validateTime(hours, minutes, seconds)) {
      return NaN;
    }
    return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1e3;
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
    var sign = captures[1] === "+" ? -1 : 1;
    var hours = parseInt(captures[2]);
    var minutes = captures[3] && parseInt(captures[3]) || 0;
    if (!validateTimezone(hours, minutes)) {
      return NaN;
    }
    return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
  }
  function dayOfISOWeekYear(isoWeekYear, week, day) {
    var date = new Date(0);
    date.setUTCFullYear(isoWeekYear, 0, 4);
    var fourthOfJanuaryDay = date.getUTCDay() || 7;
    var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
  }
  var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function isLeapYearIndex(year) {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
  }
  function validateDate(year, month, date) {
    return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
  }
  function validateDayOfYearDate(year, dayOfYear) {
    return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
  }
  function validateWeekDate(_year, week, day) {
    return week >= 1 && week <= 53 && day >= 0 && day <= 6;
  }
  function validateTime(hours, minutes, seconds) {
    if (hours === 24) {
      return minutes === 0 && seconds === 0;
    }
    return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
  }
  function validateTimezone(_hours, minutes) {
    return minutes >= 0 && minutes <= 59;
  }

  // src/calculations.js
  var IGNORE = /[〔〕《》〖〗〘〙〚〛【】「」［］『』｛｝\[\]()（）｟｠〈〉≪≫。、.,※＊'：！?？‥…―─ｰ〽～→♪♪ ♫ ♬ ♩\"　\t\n]/g;
  var SPLIT = /[\n。.！?？]/g;
  function charsInLine(line) {
    return line.replaceAll(IGNORE, "").length;
  }
  function lineSplitCount(line) {
    return line.split(SPLIT).filter((value) => value != "").length;
  }
  function dateNowString() {
    rn = new Date();
    return formatISO(rn, { "representation": "date" });
  }
  function timeNowSeconds() {
    let rn2 = new Date();
    return rn2.getTime() / 1e3;
  }

  // src/storage/instance_storage.js
  var browser2 = require_browser_polyfill();
  var InstanceStorage = class {
    constructor(uuid) {
      this.uuid = uuid;
    }
    async setup() {
      this.details = (await browser2.storage.local.get(this.uuid))[this.uuid];
      let uuid_date_key = JSON.stringify([this.uuid, dateNowString()]);
      this.today_stats = (await browser2.storage.local.get(uuid_date_key))[uuid_date_key];
    }
    async updateDetails(details) {
      Object.assign(this.details, details);
      let detail_entries = {};
      detail_entries[this.uuid] = this.details;
      await browser2.storage.local.set(detail_entries);
    }
    async setDailyStats(date, values) {
      let uuid_date_key = JSON.stringify([this.uuid, date]);
      let daily_stats_entry = await browser2.storage.local.get(uuid_date_key);
      daily_stats_entry[uuid_date_key] = values;
      if (date == dateNowString()) {
        this.today_stats = daily_stats_entry[uuid_date_key];
      }
      await browser2.storage.local.set(daily_stats_entry);
    }
    async addDailyStats(date, values, multiple = 1) {
      let uuid_date_key = JSON.stringify([this.uuid, date]);
      let daily_stats_entry = await browser2.storage.local.get(uuid_date_key);
      if (!daily_stats_entry.hasOwnProperty(uuid_date_key)) {
        daily_stats_entry[uuid_date_key] = {};
      }
      Object.entries(values).forEach(([stat_key, stat_value]) => {
        if (!daily_stats_entry[uuid_date_key].hasOwnProperty(stat_key)) {
          daily_stats_entry[uuid_date_key][stat_key] = 0;
        }
        daily_stats_entry[uuid_date_key][stat_key] += stat_value * multiple;
      });
      if (date == dateNowString()) {
        this.today_stats = daily_stats_entry[uuid_date_key];
      }
      await browser2.storage.local.set(daily_stats_entry);
    }
    async subDailyStats(date, values, multiple = 1) {
      await this.addDailyStats(date, values, -1 * multiple);
    }
    async insertLine(line, time) {
      let line_key = JSON.stringify([this.uuid, this.details["last_line_added"] + 1]);
      let line_entry = {};
      line_entry[line_key] = line;
      this.updateDetails({
        "last_line_added": this.details["last_line_added"] + 1,
        "last_active_at": time
      });
      await browser2.storage.local.set(line_entry);
    }
    async deleteLine(line_id) {
      await browser2.storage.local.remove(JSON.stringify([this.uuid, line_id]));
    }
    async getLines() {
      if (!this.details.hasOwnProperty("last_line_added")) {
        return;
      }
      let max_line_id = this.details["last_line_added"];
      let min_line_id = 0;
      let id_queries = [...Array(max_line_id - min_line_id + 1).keys()].map((index) => JSON.stringify([this.uuid, min_line_id + index]));
      return browser2.storage.local.get(id_queries);
    }
    async addToDate(date) {
      let day_entries = await browser2.storage.local.get(date);
      if (!day_entries.hasOwnProperty(date)) {
        day_entries[date] = [];
      }
      if (!day_entries[date].includes(this.uuid)) {
        day_entries[date].push(this.uuid);
        await browser2.storage.local.set(day_entries);
      }
    }
  };

  // src/storage/type_storage.js
  var browser3 = require_browser_polyfill();
  var TypeStorage = class {
    constructor(type) {
      this.type = type;
    }
    async setup() {
      let types_list = await browser3.storage.local.get("types");
      if (!types_list.hasOwnProperty("types")) {
        types_list["types"] = [];
      }
      if (!types_list["types"].includes(this.type)) {
        types_list["types"].push(this.type);
      }
      await browser3.storage.local.set(types_list);
      let type_dict = await browser3.storage.local.get(this.type);
      if (!type_dict.hasOwnProperty(this.type)) {
        type_dict[this.type] = {};
      }
      this.properties = type_dict[this.type];
      await browser3.storage.local.set(type_dict);
    }
    async updateProperties(properties) {
      Object.assign(this.properties, properties);
      let properties_entry = {};
      properties_entry[this.type] = this.properties;
      await browser3.storage.local.set(properties_entry);
    }
    async getMedia(given_identifier) {
      let media_entries = await browser3.storage.local.get("media");
      let media_key = JSON.stringify([given_identifier, this.type]);
      if (media_entries.hasOwnProperty("media") && media_entries["media"].hasOwnProperty(media_key)) {
        return media_entries["media"][media_key];
      } else {
        return this.addMedia(given_identifier);
      }
    }
    async addMedia(given_identifier) {
      let media_entries = await browser3.storage.local.get("media");
      if (!media_entries.hasOwnProperty("media")) {
        media_entries["media"] = {};
      }
      let media_key = JSON.stringify([given_identifier, this.type]);
      if (!media_entries["media"].hasOwnProperty(media_key)) {
        let uuid = crypto.randomUUID();
        media_entries["media"][media_key] = uuid;
        let details_entry = await browser3.storage.local.get(uuid);
        if (!details_entry.hasOwnProperty(uuid)) {
          media_entries[uuid] = {
            "name": given_identifier,
            "last_line_added": -1
          };
        }
        await browser3.storage.local.set(media_entries);
      }
      return media_entries["media"][media_key];
    }
  };

  // src/storage/media_storage.js
  var REFRESH_STATS_INTERVAL = 100;
  var MediaStorage = class {
    constructor(type_storage2, instance_storage2, live_stat_update = false) {
      this.type_storage = type_storage2;
      this.instance_storage = instance_storage2;
      this.properties = this.type_storage.properties;
      if (this.instance_storage !== void 0) {
        this.details = this.instance_storage.details;
        this.uuid = this.properties["previous_uuid"];
      }
      if (live_stat_update) {
        this.previous_time = void 0;
        setInterval(this.#ticker.bind(this), REFRESH_STATS_INTERVAL);
      }
    }
    static async build(type, live_stat_update) {
      let type_storage2 = new TypeStorage(type);
      await type_storage2.setup();
      let instance_storage2;
      if (type_storage2.properties.hasOwnProperty("previous_uuid")) {
        instance_storage2 = new InstanceStorage(type_storage2.properties["previous_uuid"]);
        await instance_storage2.setup();
        const event = new CustomEvent("media_changed", {
          "detail": {
            "uuid": instance_storage2.uuid,
            "name": instance_storage2.details["name"],
            "lines": await instance_storage2.getLines()
          }
        });
        document.dispatchEvent(event);
      } else {
        instance_storage2 = void 0;
      }
      return new MediaStorage(type_storage2, instance_storage2, live_stat_update);
    }
    async changeInstance(new_uuid, given_identifier = void 0) {
      if (new_uuid == void 0 && given_identifier !== void 0) {
        new_uuid = await this.type_storage.getMedia(given_identifier);
      }
      if (this.uuid == new_uuid) {
        return;
      }
      if (this.type_storage.properties["previous_uuid"] != new_uuid) {
        this.type_storage.updateProperties({ "previous_uuid": new_uuid });
      }
      this.instance_storage = new InstanceStorage(new_uuid);
      await this.instance_storage.setup();
      this.uuid = this.instance_storage.uuid;
      this.details = this.instance_storage.details;
      const event = new CustomEvent("media_changed", {
        "detail": {
          "uuid": this.uuid,
          "name": this.instance_storage.details["name"],
          "lines": await this.instance_storage.getLines()
        }
      });
      document.dispatchEvent(event);
    }
    async addLine(line, date, time) {
      let previous_line_key = JSON.stringify([this.uuid, this.details["last_line_added"]]);
      let previous_line = (await browser.storage.local.get(previous_line_key))[previous_line_key];
      if (line != previous_line) {
        if (this.previous_time == void 0) {
          this.previous_time = timeNowSeconds();
        }
        await this.instance_storage.insertLine(line, time);
        await this.instance_storage.addDailyStats(date, {
          "lines_read": lineSplitCount(line),
          "chars_read": charsInLine(line)
        });
        await this.instance_storage.addToDate(date);
        const event = new CustomEvent("new_line", {
          "detail": {
            "line": line,
            "line_id": this.details["last_line_added"]
          }
        });
        document.dispatchEvent(event);
      }
    }
    async deleteLine(line_id, line, date) {
      this.instance_storage.deleteLine(line_id);
      this.instance_storage.subDailyStats(this.uuid, date, {
        "lines_read": lineSplitCount(line),
        "chars_read": charsInLine(line)
      });
    }
    async #ticker() {
      let time_now = timeNowSeconds();
      if (this.instance_storage == void 0 || this.previous_time == void 0) {
        return;
      }
      let time_between_lines = this.details["last_active_at"] !== void 0 ? time_now - this.details["last_active_at"] : 0;
      let time_between_ticks = time_now - this.previous_time;
      this.previous_time = time_now;
      console.log(time_between_lines, time_between_ticks);
      let event;
      if (time_between_lines <= this.type_storage.properties["afk_max_time"]) {
        await this.instance_storage.addDailyStats(dateNowString(), {
          "time_read": time_between_ticks
        });
        event = new Event("status_active");
      } else {
        this.previous_time = void 0;
        event = new Event("status_inactive");
      }
      document.dispatchEvent(event);
    }
  };

  // src/data_wrangling/data_extraction.js
  var browser4 = require_browser_polyfill();
  var SECS_TO_HRS = 60 * 60;
  async function getGameData(process_path) {
    let game_entry = (await browser4.storage.local.get(process_path))[process_path];
    let game_date_keys = game_entry["dates_read_on"].map((date) => process_path + "_" + date);
    let game_date_entries = await browser4.storage.local.get(game_date_keys);
    return Object.values(game_date_entries).map((game_date_entry, index) => {
      delete game_date_entry["last_line_recieved"];
      game_date_entry["time_read"] = game_date_entry["time_read"] / SECS_TO_HRS;
      game_date_entry["read_speed"] = game_date_entry["chars_read"] / game_date_entry["time_read"];
      game_date_entry["date"] = game_entry["dates_read_on"][index];
      game_date_entry["process_path"] = process_path;
      game_date_entry["name"] = game_entry["name"];
      return game_date_entry;
    });
  }
  async function getData() {
    let games = (await browser4.storage.local.get("games"))["games"];
    let game_data = games.map((game) => getGameData(game));
    let data = (await Promise.all(game_data)).flat();
    data.sort((first, second) => parseISO(first.date) - parseISO(second.date));
    return data;
  }
  async function exportStats() {
    let data = await getData();
    let csv_string = Object.keys(data[0]).join(",") + "\r\n" + data.map((entry) => Object.values(entry).join(",")).join("\r\n");
    chrome.runtime.sendMessage({
      "action": "export_csv",
      "csv": [csv_string],
      "blob_options": { "type": "text/csv" },
      "filename": "exSTATic_stats.csv"
    });
  }

  // src/vn/ui_properties.js
  var browser5 = require_browser_polyfill();
  var media_storage;
  var type_storage;
  var instance_storage;
  function setStorage(media_storage_) {
    media_storage = media_storage_;
    type_storage = media_storage_.type_storage;
    instance_storage = media_storage_.instance_storage;
  }
  function useProperty(element_id, global_css_property = false, units = "") {
    let element = document.getElementById(element_id);
    let properties = {};
    properties[element_id] = element.value;
    type_storage.updateProperties(properties);
    if (global_css_property) {
      document.documentElement.style.setProperty(global_css_property, element.value + units);
    }
  }
  function setupProperty(element_id, event_type, global_css_property = false, units = "") {
    let element = document.getElementById(element_id);
    if (type_storage.properties.hasOwnProperty(element_id)) {
      element.value = type_storage.properties[element_id];
    }
    useProperty(element_id, global_css_property, units);
    if (event_type) {
      element.addEventListener(event_type, (event) => {
        useProperty(event["target"].id, global_css_property, units);
      });
    }
  }
  function gameNameModified(event) {
    instance_storage.updateDetails({
      "name": event["target"].value
    });
    showNameTitle(event["target"].value);
  }
  async function userActive() {
    let time = timeNowSeconds();
    await instance_storage.updateDetails({ "last_active_at": time });
    media_storage.previous_time = time;
  }
  function openStats() {
    browser5.runtime.sendMessage({
      "action": "open_tab",
      "url": "https://kamwithk.github.io/exSTATic/stats.html"
    });
  }
  function setupProperties() {
    setupProperty("font", "change", "--default-jp-font");
    setupProperty("font_size", "change", "--default-jp-font-size", "rem");
    setupProperty("afk_max_time", "change");
    setupProperty("inactivity_blur", "change");
    setupProperty("bottom_line_padding", "change");
    document.getElementById("game_name").addEventListener("change", gameNameModified);
    document.getElementById("entry_holder").addEventListener("click", userActive);
    document.getElementById("view_stats").addEventListener("click", openStats);
    document.getElementById("export_stats").addEventListener("click", exportStats);
  }

  // src/vn/tracker_inject.js
  console.log("Injected");
  var browser6 = require_browser_polyfill();
  var SECS_TO_HOURS = 60 * 60;
  var media_storage2;
  async function setup() {
    media_storage2 = await MediaStorage.build("vn", true);
    var port = browser6.runtime.connect({ "name": "vn_lines" });
    port.onMessage.addListener(async (data) => {
      await media_storage2.changeInstance(void 0, data["process_path"]);
      await media_storage2.addLine(data["line"], data["date"], data["time"]);
    });
    setStorage(media_storage2);
    setupProperties();
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
    document.documentElement.style.setProperty("--default-inactivity-blur", media_storage2.properties["inactivity_blur"] + "px");
    setStats();
  }
  document.addEventListener("status_inactive", setInactive);
  function deleteLine(event) {
    confirmed = confirm("Are you sure you'd like to delete this line?\nChar and line statistics will be modified accordingly (assuming read today) however time read won't change...");
    if (confirmed) {
      let element_div = event["target"].parentNode;
      let line_id = Number.parseInt(element_div.dataset.line_id);
      let line = element_div.querySelector(".sentence").textContent;
      media_storage2.deleteLine(line_id, line, dateNowString());
      element_div.remove();
    }
  }
  function newLineDiv(line, line_id) {
    let container_div = document.createElement("div");
    let new_svg = document.createElement("svg");
    let new_p = document.createElement("p");
    let new_button = document.createElement("button");
    container_div.classList.add("sentence-entry");
    new_svg.classList.add("circle-bullet-point");
    new_p.classList.add("sentence");
    new_button.classList.add("delete-button");
    new_button.classList.add("material-icons");
    container_div.dataset.line_id = line_id;
    new_p.innerHTML = line;
    new_button.innerHTML = "delete";
    new_button.onclick = deleteLine;
    container_div.appendChild(new_svg);
    container_div.appendChild(new_p);
    container_div.appendChild(new_button);
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
    if (media_storage2.instance_storage == void 0 || media_storage2.instance_storage.today_stats == void 0) {
      return;
    }
    let chars_read = media_storage2.instance_storage.today_stats["chars_read"];
    let time_read = media_storage2.instance_storage.today_stats["time_read"];
    if (chars_read !== void 0) {
      document.getElementById("chars_read").innerHTML = chars_read.toLocaleString();
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
    let line_divs = Object.entries(event.detail["lines"]).map(([key, line]) => newLineDiv(line, JSON.parse(key)[1])).sort((first, second) => first.dataset.line_id - second.dataset.line_id);
    document.getElementById("entry_holder").replaceChildren(...line_divs);
  }
  document.addEventListener("media_changed", gameChanged);
  function lineAdded(event) {
    document.getElementById("entry_holder").appendChild(newLineDiv(event.detail["line"], event.detail["line_id"]));
  }
  document.addEventListener("new_line", lineAdded);
})();
