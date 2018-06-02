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
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }

    Game.prototype.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    var game = new Game();
    game.showFurry();
    game.showCoin();

});
