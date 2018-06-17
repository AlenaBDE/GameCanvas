var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var image = new Image();
image.src = 'images/monsters.png';


function Health(canvas, aX, hp) {
    this.hp = hp;
    this.x = aX;
    this.getHp = function () {
        return this.hp;
    }
    this.setHp = function (p) {
        this.hp = (p < 0) ? 0 : p;
        canvas.clearRect(this.x+19, 19, 201, 11);
        canvas.beginPath();
        canvas.strokeStyle = "blue";
        canvas.strokeRect(this.x+19, 19, 201, 11);
        canvas.stroke();
        canvas.fillStyle = "red";
        canvas.fillRect(this.x+20, 20, this.hp * 2, 10);
        canvas.fill();
    }
    this.dead = function () {
        return !(this.hp > 0);
    }
}

function CreateBody(canvas, aX) {
    this.x = aX || 50;
    this.lifeM = new Health(canvas, 0, 100);
    this.lifeU = new Health(canvas, 750, 100);


    this.drawBody = function () {
        let width = 152;
        let height = 160;
        let currentFrame = getRandomInt(0, 4);

        canvas.drawImage(image, 240 * currentFrame, 0, width, height, this.x, 50, width, height);

        width = 72;
        height = 120;
        currentFrame = getRandomInt(0, 4);
        canvas.drawImage(image, 240 * currentFrame + 40, 160, width, height, this.x + 40, 210, width, height);

        width = 130;
        height = 150;
        currentFrame = getRandomInt(0, 4);
        canvas.drawImage(image, 240 * currentFrame + 20, 315, width, height, this.x + 20, 320, width, height);

        width = 39;
        height = 150;
        currentFrame = getRandomInt(0, 4);
        canvas.drawImage(image, 240 * currentFrame, 160, width, height, this.x + 4, 200, width, height);
        canvas.drawImage(image, 240 * currentFrame + 112, 160, width, height, this.x + 108, 200, width, height);
    }

    function newBody(f) {
        canvas.clearRect(xxx - 10, 31, 250, 550);
        f();
    }

    this.setX = function (x) {
        this.x = (x > 100) ? 0 : x;
        newBody(this.drawBody());
    }

    this.getX = function () {
        return this.x;
    }
}

let body = new CreateBody(ctx, 40);


function createMonster() {
    body.drawBody();
    body.lifeM.setHp(100);
    body.lifeU.setHp(100);
};