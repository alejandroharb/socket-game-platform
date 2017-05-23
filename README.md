# socket-game-platform
A Game Platform, for games that use mobile devices as remote controllers for the characters.

![alt text](https://github.com/alejandroharb/socket-game-platform/public/img/instructional/pinataGame.png "Game View")

## Mobile Phones as controllers

![alt text](https://github.com/alejandroharb/socket-game-platform/public/img/instructional/phonePlayer1.png "Mobile View")
![alt text](https://github.com/alejandroharb/socket-game-platform/public/img/instructional/phonePlayer2.png "Mobile View Player 2")

Phone devices are synced with the game once a player joins a room.

The player moves the phone to control their character!
1. The Phone's Accelerometer Data (via Browser) is detected
2. Web socket connection (Socket.IO) routes the X and Y acceleration to the server
3. Server sends out the accelerometer data to the correct game and correct player
4. The game graphics are updated with the movements!
