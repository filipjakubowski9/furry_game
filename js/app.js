document.addEventListener('DOMContentLoaded', function() {

    function Furry() {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
    }

    function Coin() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }

    function Game() {
        this.board = document.querySelectorAll('#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
    }

    Game.prototype.index = function(x, y) {
        return x + (y * 10);
    }

    Game.prototype.showFurry = function() {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }

    Game.prototype.hideVisibleFurry = function() {
        var clone = document.querySelector('.furry');
        if (clone) {
            clone.classList.remove('furry');
        }
    }

    Game.prototype.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    Game.prototype.moveFurry = function() {
        if(this.furry.direction === 'right') {
            this.furry.x = this.furry.x + 1;
        }
        if(this.furry.direction === 'left') {
            this.furry.x = this.furry.x - 1;
        }
        if(this.furry.direction === 'down') {
            this.furry.y = this.furry.y + 1;
        }
        if(this.furry.direction === 'up') {
            this.furry.y = this.furry.y - 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    }

    Game.prototype.turnFurry = function(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    }

    Game.prototype.checkCoinCollision = function() {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.score++;
            document.querySelector('#score strong').innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }

    Game.prototype.gameOver = function() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            this.over();
        }
    }

    Game.prototype.over = function() {
        var over = document.querySelector('#over');
        over.style.display = 'block';
        over.innerHTML = 'GAME OVER <br> <strong> SCORE: ' + this.score;
    }

    Game.prototype.startGame = function() {
        var self = this;
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 250);
    }

    var game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();

    document.addEventListener('keydown', function(event){
        game.turnFurry(event);
    });

});
