console.log("exSTATic")

import { message_action } from "./messaging/message_actions"
import { SocketManager } from "./messaging/socket_actions"

// Message passing is used for actions which can only be performed on the background page
chrome.runtime.onMessage.addListener(message_action)

new SocketManager("ws://localhost:9001")
