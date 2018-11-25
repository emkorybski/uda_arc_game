
var randMoveVals = [4,6,8];

// all 3 'update()' values are dt values
var allDts = [5.5,4,7];

var allYs = [150,220,70];

var allXs = [-20,-10,-25];

var playerPositionX = [];

var playerPositionY = [];

var collision_alert = document.getElementById("collision-alert");

// Boom! alert handled
collision_alert.addEventListener("transitionend", function(){
   this.classList.remove("animated");
});

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.rnd = Math.floor(Math.random() * Math.floor(3));
    this.x = allXs[this.rnd];
    this.y = allYs[this.rnd];
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log(randNum);
    this.x = this.x + randMoveVals[this.rnd];
    this.x*dt;

    // detect collision with player
    if (this.x < playerPositionX[0] + 25  && this.x + 30  > playerPositionX[0] &&
        this.y < playerPositionY[0] + 30 && this.y + 30 > playerPositionY[0]) {
        // objects are touching
        collision_alert.classList.add("animated");
        player.player_x = 200;
        player.player_y = 350;
    }
};

// Now instantiate your objects.
// ADD up to 3 bugs and loop+rotate the with different x, y and delay params
var bug_1 = new Enemy();
    bug_1.update(7);

var bug_2 = new Enemy();
    bug_2.update(5);

var bug_3 = new Enemy();
    bug_3.update(3);

// Place all enemy objects in an array called allEnemies
var allEnemies = [bug_1, bug_2, bug_3];

// enemies/bugs in a ticker loop
setInterval(function(){
    // for each of the 3 bugs display one every turn, just appearing in different places on the pavement
    var el = allEnemies[Math.floor(Math.random() * Math.floor(3))];
    el.update(allDts[Math.floor(Math.random() * Math.floor(3))], player);
    el.y = allYs[el.rnd];
    el.x = allXs[el.rnd];

}, 2000);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Place the player object in a variable called player
var Player = function(){
    this.player_sprite = 'images/char-boy.png';
    this.player_x = 200;
    this.player_y = 350;
};

Player.prototype.update = function(kc){
    if(kc === 'left'){
        this.player_x = this.player_x - 25;
    }
    if(kc === 'up'){
        this.player_y = this.player_y - 20;
    }
    if(kc === 'right'){
        this.player_x = this.player_x + 25;
    }
    if(kc === 'down'){
        this.player_y = this.player_y + 20;
    }

    // handle hitting water
    if(this.player_y < 50){
        this.player_x = 200;
        this.player_y = 350;
    }

    // handle moving off screen
    if(this.player_y > 420){
        this.player_y = 420;
    }
    if(this.player_x < 0){
        this.player_x = 0;
    }
    if(this.player_x > 420 ){
        this.player_x = 420;
    }

    // update player position in globally accessible array for player object to access and detect a collision
    if(playerPositionX.length == 0){
        playerPositionX.push(this.player_x);
    } else {
        playerPositionX.pop();
        playerPositionX.push(this.player_x);
    }

    if(playerPositionY.length == 0){
        playerPositionY.push(this.player_y);
    } else {
        playerPositionY.pop();
        playerPositionY.push(this.player_y);
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.player_sprite), this.player_x, this.player_y);
};

Player.prototype.handleInput = function(direction){
    this.update(direction);
};

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});



