// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  if (this.x > 505) {
    this.x = 0;
    this.speed = 100 + Math.floor(Math.random() * 220);
  };
  // check for collisions with enemies and the player
  if (player.x < this.x + 80 &&
    player.x + 80 > this.x &&
    player.y < this.y + 30 &&
    30 + player.y > this.y) {
    player.x = 202;
    player.y = 404;
    record.updateHits();
  };

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class & character
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.player = 'images/char-boy.png';
}
// This class requires an update(), render()
Player.prototype.update = function(dt) {
  return Player;
}
// Renders the player character
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
}
// Player handleInput() method enables the player to move anywhere in within the x and y axis
Player.prototype.handleInput = function(moveKey) {
  if (moveKey == 'left' && this.x > 0) {
    this.x -= 102;
  }
  if (moveKey == 'right' && this.x < 404) {
    this.x += 102;
  }
  if (moveKey == 'up' && this.y > 0) {
    this.y -= 83;
  }
  if (moveKey == 'down' && this.y < 404) {
    this.y += 83;
  }
  if (this.y < 0) {
    setTimeout(() => {
      this.x = 202;
      this.y = 404;
      record.updateRuns();
      record.updateScore();
    }, 700);

  }

};

//  Records the succesful runs and hits
var Record = function() {
  this.runs = 0;
  this.hits = 0;
  this.score = 0;
};
// Updates how many runs achieved
Record.prototype.updateRuns = function() {
  this.runs += 1;
  document.getElementById('runs').innerHTML = this.runs;
};
// Updates the collisions encounted
Record.prototype.updateHits = function() {
  this.hits += 1;
  document.getElementById('hits').innerHTML = this.hits;
};
// Updates the score as each time the reaches the water
Record.prototype.updateScore = function(score) {
  this.score += 100;
  document.getElementById('points').innerHTML = this.score;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemyLocations = [60, 144, 227];

enemyLocations.forEach(function(location) {
  enemy = new Enemy(0, location, 200);
  allEnemies.push(enemy);
});
// Starting location of the player on the x and y axis.
var player = new Player(202, 404);
var record = new Record();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});