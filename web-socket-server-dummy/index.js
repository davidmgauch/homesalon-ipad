const WebSocket = require('ws');

const PORT = 8080
const MAX_STATE_INDEX = 6

const webSockerServer = new WebSocket.Server({ port: PORT });
console.log('WebSocket dummy server listening on port ' + PORT)


let state = null


webSockerServer.on('connection', (socket) => {
    console.log('client connected')

    var stdin = process.openStdin();

    stdin.addListener('data', (input) => {
        const trimmedInput = input.toString().trim()
        if (trimmedInput.length === 0) {
            state = null
            console.log('Resetting state to null')
            socket.send(state)
            return
        }

        const inputAsNumber = parseInt(trimmedInput)
        if (isNaN(inputAsNumber)) {
            console.error('Input is not a number: ' + input)
            return
        }

        if (inputAsNumber < 0 || inputAsNumber > MAX_STATE_INDEX) {
            console.error(`Input is not in range [0,${MAX_STATE_INDEX}]: ${inputAsNumber}`)
            return
        }

        state = inputAsNumber
        socket.send(state)
    })

    socket.send(state);
});
