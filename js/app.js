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
        this.showFurry();
    }

    Game.prototype.startGame = function() {
        var self = this;
        this.idSetInterval = setInterval(function() {
            // console.log("wooohoo");
            self.moveFurry();
        }, 250);
    }

    var game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();

});
