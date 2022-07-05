console.log("CharTracker")
const socket = new WebSocket("ws://localhost:9001")

socket.onmessage = function (event) {
    console.log(event.data)
}
