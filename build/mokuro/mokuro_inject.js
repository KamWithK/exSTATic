(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

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
      const uuid_date_key = JSON.stringify([this.uuid, dateNowString()]);
      this.today_stats = (await browser.storage.local.get(uuid_date_key))[uuid_date_key];
    }
    async updateDetails(details) {
      Object.assign(this.details, details);
      let detail_entries = {};
      detail_entries[this.uuid] = this.details;
      await browser.storage.local.set(detail_entries);
    }
    async setDailyStats(date, values) {
      const uuid_date_key = JSON.stringify([this.uuid, date]);
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
      const date_keys = Object.keys(date_stat_adds).map((date) => JSON.stringify([this.uuid, date]));
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
      const line_key = JSON.stringify([this.uuid, this.details["last_line_added"] + 1]);
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
      const max_line_id = this.details["last_line_added"];
      const min_line_id = max_lines <= 0 | max_lines === void 0 | isNaN(max_lines) ? 0 : Math.max(0, this.details["last_line_added"] - max_lines + 1);
      const id_queries = [...Array(max_line_id - min_line_id + 1).keys()].map((index) => JSON.stringify([this.uuid, min_line_id + index]));
      const lines = await browser.storage.local.get(id_queries);
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
      const media_entries = await browser2.storage.local.get("media");
      const media_key = JSON.stringify([given_identifier, this.type]);
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
      const media_key = JSON.stringify([given_identifier, this.type]);
      if (!media_entries["media"].hasOwnProperty(media_key)) {
        let new_uuid = uuid !== void 0 ? uuid : crypto.randomUUID();
        media_entries["media"][media_key] = new_uuid;
        const details_entry = await browser2.storage.local.get(new_uuid);
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
      const type_storage = new TypeStorage(type);
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
        const event2 = new Event("status_active");
        document.dispatchEvent(event2);
      }
    }
    stop_ticker(event = true) {
      this.previous_time = void 0;
      if (event) {
        const event2 = new Event("status_inactive");
        document.dispatchEvent(event2);
      }
    }
    async #ticker() {
      const time_now = timeNowSeconds();
      if (this.instance_storage == void 0 || this.previous_time == void 0) {
        return;
      }
      const time_between_lines = this.details["last_active_at"] !== void 0 ? time_now - this.details["last_active_at"] : 0;
      const time_between_ticks = time_now - this.previous_time;
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
      const [type_storage, instance_storage] = await super.build("mokuro");
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

  // src/messaging/socket_actions.js
  var browser4 = require_browser_polyfill();
  var SPLIT_PATH = /\\|\//g;

  // node_modules/svelte/internal/index.mjs
  function noop() {
  }
  function assign(tar, src) {
    for (const k in src)
      tar[k] = src[k];
    return tar;
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
  function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
      const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
      return definition[0](slot_ctx);
    }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === void 0) {
        return lets;
      }
      if (typeof lets === "object") {
        const merged = [];
        const len = Math.max($$scope.dirty.length, lets.length);
        for (let i = 0; i < len; i += 1) {
          merged[i] = $$scope.dirty[i] | lets[i];
        }
        return merged;
      }
      return $$scope.dirty | lets;
    }
    return $$scope.dirty;
  }
  function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
      const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
      slot.p(slot_context, slot_changes);
    }
  }
  function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
      const dirty = [];
      const length = $$scope.ctx.length / 32;
      for (let i = 0; i < length; i++) {
        dirty[i] = -1;
      }
      return dirty;
    }
    return -1;
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
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
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
  function init(component, options, instance3, create_fragment3, not_equal, props, append_styles, dirty = [-1]) {
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
    $$.ctx = instance3 ? instance3(component, options.props || {}, (i, ret, ...rest) => {
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
    $$.fragment = create_fragment3 ? create_fragment3($$.ctx) : false;
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
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
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
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
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

  // src/components/stat_bar.svelte
  function create_else_block(ctx) {
    let t;
    return {
      c() {
        t = text("bedtime");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_if_block(ctx) {
    let t;
    return {
      c() {
        t = text("hourglass_bottom");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(t);
      }
    };
  }
  function create_fragment(ctx) {
    let div8;
    let div0;
    let t0;
    let t1;
    let div1;
    let t3;
    let span0;
    let t5;
    let div2;
    let t6;
    let t7;
    let div3;
    let t9;
    let span1;
    let t11;
    let div4;
    let t12;
    let t13;
    let div5;
    let t15;
    let span2;
    let t17;
    let div6;
    let t18;
    let t19;
    let div7;
    let t21;
    let span3;
    let t22;
    let current;
    function select_block_type(ctx2, dirty) {
      if (ctx2[0])
        return create_if_block;
      return create_else_block;
    }
    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type(ctx);
    const default_slot_template = ctx[7].default;
    const default_slot = create_slot(default_slot_template, ctx, ctx[6], null);
    return {
      c() {
        div8 = element("div");
        div0 = element("div");
        t0 = text(ctx[1]);
        t1 = space();
        div1 = element("div");
        div1.textContent = "Chars";
        t3 = space();
        span0 = element("span");
        span0.textContent = "auto_stories";
        t5 = space();
        div2 = element("div");
        t6 = text(ctx[2]);
        t7 = space();
        div3 = element("div");
        div3.textContent = "Lines";
        t9 = space();
        span1 = element("span");
        span1.textContent = "drive_file_rename_outline";
        t11 = space();
        div4 = element("div");
        t12 = text(ctx[3]);
        t13 = space();
        div5 = element("div");
        div5.textContent = "Elapsed";
        t15 = space();
        span2 = element("span");
        span2.textContent = "timer";
        t17 = space();
        div6 = element("div");
        t18 = text(ctx[4]);
        t19 = space();
        div7 = element("div");
        div7.textContent = "Chars / Hour";
        t21 = space();
        span3 = element("span");
        if_block.c();
        t22 = space();
        if (default_slot)
          default_slot.c();
        attr(div0, "id", "chars_read");
        attr(div0, "class", "stat-numbers svelte-1127kl9");
        attr(div1, "class", "stat-annotation svelte-1127kl9");
        attr(span0, "class", "material-icons");
        attr(div2, "id", "lines_read");
        attr(div2, "class", "stat-numbers svelte-1127kl9");
        attr(div3, "class", "stat-annotation svelte-1127kl9");
        attr(span1, "class", "material-icons");
        attr(div4, "id", "elapsed_time");
        attr(div4, "class", "stat-numbers svelte-1127kl9");
        attr(div5, "class", "stat-annotation svelte-1127kl9");
        attr(span2, "class", "material-icons");
        attr(div6, "id", "chars_per_hour");
        attr(div6, "class", "stat-numbers svelte-1127kl9");
        attr(div7, "class", "stat-annotation svelte-1127kl9");
        attr(span3, "id", "activity_symbol");
        attr(span3, "class", "material-icons");
        attr(div8, "class", "flex flex-row menu-bar h-full p-3 gap-3 items-center");
      },
      m(target, anchor) {
        insert(target, div8, anchor);
        append(div8, div0);
        append(div0, t0);
        append(div8, t1);
        append(div8, div1);
        append(div8, t3);
        append(div8, span0);
        append(div8, t5);
        append(div8, div2);
        append(div2, t6);
        append(div8, t7);
        append(div8, div3);
        append(div8, t9);
        append(div8, span1);
        append(div8, t11);
        append(div8, div4);
        append(div4, t12);
        append(div8, t13);
        append(div8, div5);
        append(div8, t15);
        append(div8, span2);
        append(div8, t17);
        append(div8, div6);
        append(div6, t18);
        append(div8, t19);
        append(div8, div7);
        append(div8, t21);
        append(div8, span3);
        if_block.m(span3, null);
        append(div8, t22);
        if (default_slot) {
          default_slot.m(div8, null);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (!current || dirty & 2)
          set_data(t0, ctx2[1]);
        if (!current || dirty & 4)
          set_data(t6, ctx2[2]);
        if (!current || dirty & 8)
          set_data(t12, ctx2[3]);
        if (!current || dirty & 16)
          set_data(t18, ctx2[4]);
        if (current_block_type !== (current_block_type = select_block_type(ctx2, dirty))) {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(span3, null);
          }
        }
        if (default_slot) {
          if (default_slot.p && (!current || dirty & 64)) {
            update_slot_base(default_slot, default_slot_template, ctx2, ctx2[6], !current ? get_all_dirty_from_scope(ctx2[6]) : get_slot_changes(default_slot_template, ctx2[6], dirty, null), null);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div8);
        if_block.d();
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let SECS_TO_HOURS = 60 * 60;
    let { media_storage } = $$props;
    let { active = false } = $$props;
    let chars, lines, time, speed;
    const statsExist = (media_storage2) => media_storage2.instance_storage != void 0 ? media_storage2.instance_storage.today_stats : void 0;
    const getStat = (daily_stats, stat_key) => daily_stats != void 0 && daily_stats.hasOwnProperty(stat_key) ? daily_stats[stat_key] : 0;
    const getTime = (time_secs) => {
      const date = new Date(0);
      date.setSeconds(Math.round(time_secs));
      return date.toISOString().substring(11, 19);
    };
    const getSpeed = (chars2, time_secs) => chars2 === void 0 || time_secs === void 0 || isNaN(chars2) || isNaN(time_secs) || chars2 === 0 || time_secs === 0 ? 0 .toLocaleString() : (chars2 / time_secs * SECS_TO_HOURS).toLocaleString();
    const calculateStats = () => {
      const daily_stats = statsExist(media_storage);
      const char_count = getStat(daily_stats, "chars_read");
      const line_count = getStat(daily_stats, "lines_read");
      const time_secs = getStat(daily_stats, "time_read");
      $$invalidate(1, chars = char_count.toLocaleString());
      $$invalidate(2, lines = line_count.toLocaleString());
      $$invalidate(3, time = getTime(time_secs));
      $$invalidate(4, speed = getSpeed(char_count, time_secs));
    };
    calculateStats();
    document.addEventListener("status_active", calculateStats);
    document.addEventListener("status_inactive", calculateStats);
    $$self.$$set = ($$props2) => {
      if ("media_storage" in $$props2)
        $$invalidate(5, media_storage = $$props2.media_storage);
      if ("active" in $$props2)
        $$invalidate(0, active = $$props2.active);
      if ("$$scope" in $$props2)
        $$invalidate(6, $$scope = $$props2.$$scope);
    };
    return [active, chars, lines, time, speed, media_storage, $$scope, slots];
  }
  var Stat_bar = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment, safe_not_equal, { media_storage: 5, active: 0 });
    }
  };
  var stat_bar_default = Stat_bar;

  // src/mokuro/mokuro.svelte
  function create_fragment2(ctx) {
    let div1;
    let div0;
    let statbar;
    let current;
    statbar = new stat_bar_default({
      props: { media_storage: ctx[0] }
    });
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        create_component(statbar.$$.fragment);
        attr(div0, "class", "h-10 grow rounded-[3px] z-50");
        set_style(div0, "background", "var(--color1)");
        set_style(div0, "box-shadow", "0px 0px 8px 0px var(--color3a)");
        attr(div1, "class", "flex flex-col-reverse items-end content-center m-[5px]");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, div0);
        mount_component(statbar, div0, null);
        current = true;
      },
      p(ctx2, [dirty]) {
        const statbar_changes = {};
        if (dirty & 1)
          statbar_changes.media_storage = ctx2[0];
        statbar.$set(statbar_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(statbar.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(statbar.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div1);
        destroy_component(statbar);
      }
    };
  }
  function instance2($$self, $$props, $$invalidate) {
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
    let { mokuro_storage: mokuro_storage2 } = $$props;
    const userActive = () => __awaiter(void 0, void 0, void 0, function* () {
      const time = timeNowSeconds();
      if (mokuro_storage2.instance_storage === void 0)
        return;
      if (mokuro_storage2.previous_time === void 0) {
        yield mokuro_storage2.instance_storage.updateDetails({ "last_active_at": time });
        mokuro_storage2.start_ticker();
      } else {
        mokuro_storage2.stop_ticker();
      }
    });
    document.getElementById("pagesContainer").addEventListener("dblclick", userActive);
    $$self.$$set = ($$props2) => {
      if ("mokuro_storage" in $$props2)
        $$invalidate(0, mokuro_storage2 = $$props2.mokuro_storage);
    };
    return [mokuro_storage2];
  }
  var Mokuro = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment2, safe_not_equal, { mokuro_storage: 0 });
    }
  };
  var mokuro_default = Mokuro;

  // src/mokuro/mokuro_inject.ts
  var browser5 = require_browser_polyfill();
  var material_cdn = document.createElement("link");
  material_cdn.href = browser5.extension.getURL("build/external/material_icons.css");
  material_cdn.rel = "stylesheet";
  document.head.appendChild(material_cdn);
  console.log("Injected");
  var mokuro_storage;
  function getVolumeSeries() {
    const paths = decodeURI(window.location.href).split(SPLIT_PATH);
    const volume = paths[paths.length - 1].replace(/\.html.*$/, "");
    const series = paths[paths.length - 2];
    return [volume, series];
  }
  function getPage() {
    const [current_page, total_pages] = document.getElementById("pageIdxDisplay").innerText.split("/");
    return [Number.parseInt(current_page) - 1, Number.parseInt(total_pages)];
  }
  var getGivenID = (series, volume) => JSON.stringify([series, volume]);
  async function setup() {
    mokuro_storage = await MokuroStorage.build(true);
    const [volume, series] = getVolumeSeries();
    const [current_page, total_pages] = getPage();
    await mokuro_storage.changeInstance(void 0, getGivenID(series, volume));
    await mokuro_storage.setDetails(series, total_pages);
    await mokuro_storage.instance_storage.updateDetails({ "last_page_read": current_page });
    const svelte_div = document.createElement("div");
    document.body.insertBefore(svelte_div, document.getElementById("showMenuA"));
    new mokuro_default({
      target: svelte_div,
      props: {
        mokuro_storage
      }
    });
  }
  setup();
  var observer = new MutationObserver(async (_) => {
    const [volume, series] = getVolumeSeries();
    const [current_page, total_pages] = getPage();
    const get_page = current_page > mokuro_storage.details["last_page_read"] ? current_page - 1 : current_page;
    const lines = Array.from(document.getElementById(`page${get_page}`).firstChild.childNodes).map((element2) => Array.from(element2.childNodes).reduce((so_far, node) => `${so_far}${node.textContent}`, ""));
    await mokuro_storage.changeInstance(void 0, getGivenID(series, volume));
    await mokuro_storage.setDetails(series, total_pages);
    await mokuro_storage.processPage(current_page, lines, dateNowString());
  });
  observer.observe(document.getElementById("pageIdxDisplay"), { "childList": true, "subtree": true });
})();
