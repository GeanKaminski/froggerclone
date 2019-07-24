let pointsHTML = document.querySelector("#level");
var points = 0;


// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 550) {
        this.x = -100;
        // dificulty increases with the points
        if (points > 0) {
        this.speed = 100 * points + Math.floor(Math.random() * 600)
    	} 
    	else {
    		this.speed = 100 + Math.floor(Math.random() * 600)
    	}

    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        35 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Winner case and Boundaries 
Player.prototype.update = function() {

    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        points = points + 1;
  	// console.log(points);
  		pointsHTML.innerHTML = `Level: ${points}`;
    }
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

// Position "y" where the enemies will are created
let enemyPosition = [60, 140, 220];
let player = new Player(200, 380, 50);
let enemy;

enemyPosition.forEach(function(posY) {
    if (points > 0) {
        enemy = new Enemy(0, posY, 100 * points + Math.floor(Math.random() * 600));
    	} 
    	else {
    	enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 600));
    	}
    allEnemies.push(enemy);
});

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
