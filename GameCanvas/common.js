function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function clearDiv(div) {
    while (div.children[0]) {
        div.removeChild(div.children[0]);
    }
}

let massPrill = ['Ужасный', 'Гадкий', 'Злобный', 'Страшный', 'Сопливый'];
let massType = ['орк', 'гном', 'гоблин', 'динозавр', 'микки'];
let massName = ['Валера', 'Макс', 'Дима', 'Анатолий', 'Антонио'];

let randMassPrill = Math.floor(Math.random() * massPrill.length);
let randMassType = Math.floor(Math.random() * massType.length);
let randmassName = Math.floor(Math.random() * massName.length);


//таймер
let intervalID = 0;

function Timer(sec) {
    let second = document.getElementById('second').innerHTML;
    let defaultSec = sec;
    let timerID = 0;

    second = defaultSec;


    function getTime() {
        function fixTimer(value) {
            let str = String(value);
            let result = (value < 10 && str.length === 1) ? "0" + value : value;
            return result;
        }

        if (second > 0) {
            second--;
        }

        document.getElementById('second').innerHTML = fixTimer(second);
        if (second == 0) {
            clearInterval(timerID);


            /// код блокировки
        }
    }

    this.startTimer = function () {
        second = defaultSec;
        timerID = setInterval(getTime, 1000);
    }

    this.stopTimer = function () {
        clearInterval(timerID);
    }

    this.value = function () {
        return second;
    }

    this.setValue = function(value){
        second = value;
    }
}



