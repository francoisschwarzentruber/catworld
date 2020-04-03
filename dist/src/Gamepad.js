var testForConnections = (function () {
    // Keep track of the connection count
    var connectionCount = 0;
    // Return a function that does the actual tracking
    return function () {
        var gamepads = navigator.getGamepads();
        var count = 0;
        var diff;
        for (var i = gamepads.length - 1; i >= 0; i--) {
            var g = gamepads[i];
            // Make sure they're not null and connected
            if (g && g.connected) {
                count++;
            }
        }
        // Return any changes
        diff = count - connectionCount;
        connectionCount = count;
        return diff;
    };
}());
/**
 * Main animation frame handler
 */
export function gamePadHandler(f) {
    var tc = testForConnections();
    if (tc > 0) {
        console.log(tc + " gamepads connected");
    }
    else if (tc < 0) {
        console.log((-tc) + " gamepads disconnected");
    }
    else {
        // Gamepads neither connected nor disconnected.
    }
    var gamepads = navigator.getGamepads();
    if (gamepads.length > 0)
        f(gamepads[0]);
}
//# sourceMappingURL=Gamepad.js.map