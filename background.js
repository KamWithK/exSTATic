console.log("CharTracker")

function connectToWebSocket(_) {
    const socket = new WebSocket("ws://localhost:9001")

    socket.onmessage = lineFetched
    socket.onopen = connectionOpened
    socket.onclose = connectToWebSocket
}

function connectionOpened(event) {
    console.log("Connected")
}

function lineFetched(event) {
    data = JSON.parse(event.data)
    console.log(data)
}

connectToWebSocket()
