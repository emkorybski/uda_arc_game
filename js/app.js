// Enemy counter
var counter = 1;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.x_final = 400;
    this.y = 80;
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

    this.x = this.x + 10;
    this.x*dt;
};

Enemy.prototype.counterUp = function(){
    counter++;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
var bug_1 = new Enemy();
bug_1.update(2);

var bug_2 = new Enemy();
setTimeout(function(){
    bug_1.update(10);
    bug_2.y = 180;
    bug_2.x = 0;
}, 600);

// ADD up to 5 bugs and loop+rotate the with different x, y and delay params

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [bug_1, bug_2];

var player = {
    player_sprite: 'images/char-boy.png',
    player_x: 200,
    player_y: 350,
    update: function(){
        // ctx.drawImage(Resources.get(this.sprite), this.x*dt, this.y);
    },
    render: function(){
        ctx.drawImage(Resources.get(this.player_sprite), this.player_x, this.player_y);
    },
    handleInput: function(){

    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
