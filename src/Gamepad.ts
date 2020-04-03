

let testForConnections = (function() {

    // Keep track of the connection count
    let connectionCount = 0;

    // Return a function that does the actual tracking
    return function () {
        let gamepads = navigator.getGamepads();
        let count = 0;
        let diff;

        for (let i = gamepads.length - 1; i >= 0; i--) {
            let g = gamepads[i];

            // Make sure they're not null and connected
            if (g && g.connected) {
                count++;
            }
        }

        // Return any changes
        diff = count - connectionCount;

        connectionCount = count;

        return diff;
    }
}());




/**
 * Main animation frame handler
 */
export function gamePadHandler(f) {

    let tc = testForConnections();

    if (tc > 0) {
        console.log(tc + " gamepads connected");
    } else if (tc < 0) {
        console.log((-tc) + " gamepads disconnected");
    } else {
        // Gamepads neither connected nor disconnected.
    }
   let gamepads = navigator.getGamepads();
    if(gamepads.length > 0)
        f(gamepads[0]);
}



