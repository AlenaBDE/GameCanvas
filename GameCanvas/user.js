function User(canvas, hp) {
    this.hp = hp;
    this.getHp = function () {
        return this.hp;
    }
    this.setHp = function (p) {
        this.hp = (p < 0) ? 0 : p;
        canvas.clearRect(100, 19, 201, 11);
        canvas.beginPath();
        canvas.strokeStyle = "blue";
        canvas.strokeRect(19, 19, 201, 11);
        canvas.stroke();
        canvas.fillStyle = "red";
        canvas.fillRect(20, 20, this.hp * 2, 10);
        canvas.fill();
    }
    this.dead = function () {
        return !(this.hp > 0);
    }
}

