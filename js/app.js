
var randVals = [3,7,9,2,7,4,8,2,10,6,9];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -40;
    this.y = 80;
    this.rnd = Math.floor(Math.random() * Math.floor(7));
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
    this.x = this.x + randVals[this.rnd];
    this.x*dt;
};

// Now instantiate your objects.
// ADD up to 3 bugs and loop+rotate the with different x, y and delay params
var bug_1 = new Enemy();
var bug_2 = new Enemy();
    bug_2.update(5);
    bug_2.y = 150;
    bug_2.x = 0;
var bug_3 = new Enemy();
    bug_3.update(3.5);
    bug_3.y = 220;
    bug_3.x = -1;

// bugs in a loop
setInterval(function(){
    bug_1.update(3);
    bug_1.y = 80;
    bug_1.x = -50;

    bug_2.update(9);
    bug_2.y = 150;
    bug_2.x = -20;

    bug_3.update(6);
    bug_3.y = 220;
    bug_3.x = -100;

}, 2000); // 33 milliseconds = ~ 30 frames per sec


// Place all enemy objects in an array called allEnemies
var allEnemies = [bug_1, bug_2, bug_3];

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
    // ctx.drawImage(Resources.get(this.sprite), this.x*dt, this.y);
    if(kc === 'left'){
        this.player_x = this.player_x - 20;
    }
    if(kc === 'up'){
        this.player_y = this.player_y - 15;
    }
    if(kc === 'right'){
        this.player_x = this.player_x + 20;
    }
    if(kc === 'down'){
        this.player_y = this.player_y + 15;
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
    console.log(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});
