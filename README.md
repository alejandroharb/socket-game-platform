# socket-game-platform
A Game Platform, for games that use mobile devices as remote controllers for the characters.

![alt text](https://github.com/alejandroharb/socket-game-platform/blob/master/public/img/instructional/pinataGame.png "Game View")

## Mobile Phones as controllers

![alt text](https://github.com/alejandroharb/socket-game-platform/blob/master/public/img/instructional/phonePlayer1.png "Mobile View")
![alt text](https://github.com/alejandroharb/socket-game-platform/blob/master/public/img/instructional/phonePlayer2.png "Mobile View Player 2")

Phone devices are synced with the game once a player joins a room.

The player moves the phone to control their character!
1. The Phone's Accelerometer Data (via Browser) is detected
2. Web socket connection (Socket.IO) routes the X and Y acceleration to the server
3. Server sends out the accelerometer data to the correct game and correct player
4. The game graphics are updated with the movements!

## Some Cool Things:

### P5.js & Movement Simulations
```javascript
f = -K * (ps); // f=-ky
as = f / M; // Set the acceleration, f=ma == a=f/m
vs += as; // Set the velocity
vs *= D; // damping
ps = ps + vs; // Updated position
```
Mathematical Model for Spring Movement of the Piñata

### Sockets with Rooms & Data Transfer
```javascript
socket.on('input', (DataPackage) => {
    io.sockets.in(DataPackage.roomId).emit('input', DataPackage);
});
```
Socket listens for mobile accelerometer data, and emits the same data to specific game (the room).

### Javascript Listener for Device Motion
```javascript
window.addEventListener('devicemotion', (e) => {
    // get phone acceleration components
    if (acceptingData) {
        acceptingData = false;
        timeoutVariable = setTimeout(() => {
            acceptingData = true;
        }, 50);
//
    let a_x = event.accelerationIncludingGravity.x; // x-acceleration
    let a_y = event.accelerationIncludingGravity.y; // y-acceleration
    let a_z = event.accelerationIncludingGravity.z;// z-acceleration

    // compile acceleration componenets in one acceleration object
    let data = {
        acc: {
            x: a_x,
            y: a_y,
            z: a_z
        }
    }

    e.preventDefault();
    // send acceleration components to 'input' socket
    socket.emit('input', new DataPackage(roomId, data, 'acceleration', playerId, playerSelection));
    }
}, true);
```
