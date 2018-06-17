let score = [];
let user = {name: '', count: 0};

//localStorage.clear();

function setLocalStorage() {
    if (localStorage.getItem('score') !== null) {
        score = JSON.parse(localStorage.getItem('score'));
    }
    else {
        localStorage.setItem('score', JSON.stringify(score));
    }
}

function registration() {
    user.name = document.getElementById('fname').value;
    if (user.name != '') {
        document.getElementById('win').style.visibility = 'hidden';
        windowTask();
    }
}

function startGame() {
    document.getElementById('score').style.visibility = 'hidden';
    document.getElementById('choice').style.visibility = 'hidden';
    document.getElementById('win').style.visibility = 'visible';
    taskTimer.stopTimer();
    taskTimer.setValue(15);
    user.count = 0;
}

function addScore(item) {

    function compareCount(a, b) {
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
    }

    if (score.length == 5) {
        score.forEach(function (t, number, arr) {
                if (item.count > t.count) {
                    arr.splice(number, 1, item);
                    return;
                }
            }
        )
    }
    else {
        score.push(item);
    }
    if (score.length > 1) {
        score.sort(compareCount);
    }
    localStorage.setItem('score', JSON.stringify(score));
}


let nameMonster = document.getElementById('name');
nameMonster.innerHTML = massPrill[randMassPrill] + ' ' + massType[randMassType] + ' ' + massName[randmassName];
let timerID = 0;


let taskTimer = new Timer(15);

function windowTask() {
    setLocalStorage();
    createMonster();

    let elements = setForm();
    let countSeconds = 0;

    function attempt(value) {
        if (value) {
            body.lifeM.setHp(body.lifeM.getHp() - 50);
        }
        else {
            body.lifeU.setHp(body.lifeU.getHp() - 50);
        }
    }

    function showScore() {
        let tr = document.getElementById('score');
        score.forEach(function (item, index, arr) {
                tr.children[0].children[0].children[2 + index].children[1].innerHTML = item.name;
                tr.children[0].children[0].children[2 + index].children[2].innerHTML = item.count;
            }
        )
        document.getElementById('score').style.visibility = 'visible';
    }

    function checkHealth() {
        if (!body.lifeM.dead()) {
            setForm();
        } else {
            user.count += 1;
            windowTask();
        }

        if (!body.lifeU.dead()) {
            setForm();
        } else {
            addScore(user);
            showScore();
        }
    }

    function checkTimer() {
        if (taskTimer.value() == '0') {
            clearInterval(timerID);
            setForm('div');
            elements.newDiv.innerHTML = "Время закончилось! Переход хода к монстру";
            countSeconds += 15;
            attempt(false);
            setTimeout(checkHealth, 2000);
        }
    }

    function buttonClick(value, result) {
        taskTimer.stopTimer();
        elements.vvod.style.visibility = 'hidden';
        elements.button.style.visibility = 'hidden';
        elements.img.style.visibility = 'hidden';
        if (value == result) {
            countSeconds += 15 - taskTimer.value();
            elements.newDiv.innerHTML = "Верно!";
            attempt(true);
        } else {
            elements.newDiv.innerHTML = "Не верно! Переход хода к монстру";
            countSeconds += 15;
            attempt(false);
        }
        clearInterval(timerID);
        setTimeout(checkHealth, 2000);
    }

    arifmetic.onclick = function () {
        arifmeticTask();
    }

    audio.onclick = function () {
        audioTask();
    }

    translate.onclick = function () {
        translateTask();
    }


    function arifmeticTask() {
        setForm('arifmetic');
        let massSign = ['+', '-', '*'];
        taskTimer.startTimer();
        timerID = setInterval(checkTimer, 100); // переработать

        let ran1 = Math.floor(Math.random() * (100 - 1 + 1)) + 100;
        let ran2 = Math.floor(Math.random() * (100 - 1 + 1)) + 100;
        let sum = "" + ran1 + ' ' + massSign[Math.floor(Math.random() * massSign.length)] + ' ' + ran2;

        elements.newDiv.innerHTML = sum + " = ";
        elements.newDiv.style.display = 'inline';
        let result = eval(sum);

        elements.button.onclick = function () {
            buttonClick(elements.vvod.value, +result);
        }
    }


    function translateTask() {
        let word = new taskWords();

        taskTimer.startTimer();
        setInterval(checkTimer, 100);

        setForm('translate');

        elements.newDiv.innerHTML = "Перевод " + word.getWord() + " ";
        elements.newDiv.style.display = 'inline';

        elements.button.onclick = function () {
            buttonClick(word.checkWord(vvod.value), true);
        }
    }


    function audioTask() {
        setForm('audio');
        let mass = ['economic', 'inspiration', 'vocabulary', 'design', 'redundancy', 'run', 'probability'];
        let massRandom = 0;
        taskTimer.startTimer();
        setInterval(checkTimer, 100);

        elements.img.onclick = function () {
            massRandom = Math.floor(Math.random() * mass.length);
            speechSynthesis.speak(new SpeechSynthesisUtterance(mass[massRandom]));
        }

        elements.button.onclick = function () {
            buttonClick(mass[massRandom], elements.vvod.value);
        }
    }
}


function setForm(form) {
    let elements = {};
    elements.task = document.getElementById('content-task');
    elements.vvod = document.getElementById('vvod');
    elements.newDiv = document.getElementById('span-text');
    elements.button = document.getElementById('button-result');
    elements.img = document.getElementById('div-image');
    elements.modalTask = document.getElementById('task');
    elements.modalChoice = document.getElementById('choice');
    elements.newDiv.innerHTML = "";
    elements.vvod.value = '';

    for (let key in elements) {
        elements[key].style.visibility = 'hidden';
    }

    switch (form) {
        case 'arifmetic':
        case 'translate':
            elements.modalTask.style.visibility = 'visible';
            elements.newDiv.style.visibility = 'visible';
            elements.vvod.style.visibility = 'visible';
            elements.button.style.visibility = 'visible';
            break;

        case 'audio':
            elements.modalTask.style.visibility = 'visible';
            elements.newDiv.style.visibility = 'visible';
            elements.vvod.style.visibility = 'visible';
            elements.button.style.visibility = 'visible';

            elements.img.style.visibility = 'visible';
            break;
        case 'div':
            elements.modalTask.style.visibility = 'visible';
            elements.newDiv.style.visibility = 'visible';
            break;

        default:
            elements.modalChoice.style.visibility = 'visible';
            break;
    }

    return elements;
}

startGame();
