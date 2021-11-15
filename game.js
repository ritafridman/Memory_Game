const cards = document.querySelectorAll('.memory-card');

let didFlipCard = false;
let firstCard, secondCard;
let lockBoard = false;
let p1Turn = true;
let p2Turn = false;
let p1Points = 0;
let p2Points = 0;
let p1GamesWon = 0;
let p2GamesWon = 0;
let numOfCardMatching3on4 = 0;
let numOfCardMatching4on4 = 0;
let dimensionsChosen = 0;
let gameOver = false;


function audio(x) {
    document.getElementById('track').muted = !document.getElementById('track').muted;
    $(x).toggleClass('mute');
}

function CustomAlert() {
    this.render = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH + "px";
        dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        if (this.dimensionsChosen == 16) {
            dimGame = "game4x4.html";
        } else {
            dimGame = "game3x4.html";
        }
        document.getElementById('dialogboxhead').innerHTML = "";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<form onsubmit="Alert.ok()"></form>';
    }
    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}
var dimGame = "";
var Alert = new CustomAlert();


function flipCard() {
    if (lockBoard)
        return;
    if (this === firstCard)
        return;
    this.classList.add('flip');
    if (!didFlipCard) {
        didFlipCard = true;
        firstCard = this;
    } else {
        didFlipCard = false;
        secondCard = this;
        checkMatch();
    }

    checkEndGame();
}

function checkMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        if (p1Turn) {
            //p1Points = localStorage.getItem("p1CurrentScore");
            var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p1CurrentScore"];
            arrayLen = Object.keys(numArray).length
            p1Points = numArray[arrayLen - 1]

            p1Points++;

            //localStorage.setItem("p1CurrentScore", p1Points);

            var d = JSON.parse(localStorage.getItem("data"))
            d.gameData.p1CurrentScore.push(p1Points)
            localStorage.setItem("data", JSON.stringify(d))


        } else {
            //p2Points = localStorage.getItem("p2CurrentScore");

            var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p2CurrentScore"];
            arrayLen = Object.keys(numArray).length
            p2Points = numArray[arrayLen - 1]

            p2Points++;;
            //localStorage.setItem("p2CurrentScore", p2Points);

            var d = JSON.parse(localStorage.getItem("data"))
            d.gameData.p2CurrentScore.push(p2Points)
            localStorage.setItem("data", JSON.stringify(d))
        }
        numOfCardMatching3on4++;
        numOfCardMatching4on4++;
        console.log(numOfCardMatching3on4);
        disableCards();
        updateScore();
    } else {
        unflipCards();
    }
    changeTurn();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1200);
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

(function initGameElements() {
    document.getElementById("p1-name").innerHTML = (JSON.parse(localStorage.getItem("data"))).gameData["p1Name"];

    document.getElementById("p2-name").innerHTML = (JSON.parse(localStorage.getItem("data"))).gameData["p2Name"];

    //document.getElementById("p1-score").innerHTML = (JSON.parse(localStorage.getItem("data"))).gameData["p1CurrentScore"];

    var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p1CurrentScore"];
    arrayLen = Object.keys(numArray).length
    document.getElementById("p1-score").innerHTML = numArray[arrayLen - 1]

    //document.getElementById("p2-score").innerHTML = (JSON.parse(localStorage.getItem("data"))).gameData["p2CurrentScore"];

    var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p2CurrentScore"];
    arrayLen = Object.keys(numArray).length
    document.getElementById("p2-score").innerHTML = numArray[arrayLen - 1]

    //document.getElementById("p1-games-won").innerHTML = localStorage.getItem("p1GamesWon");

    var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p1GamesWon"];
    arrayLen = Object.keys(numArray).length
    document.getElementById("p1-games-won").innerHTML = numArray[arrayLen - 1]

    //document.getElementById("p2-games-won").innerHTML = localStorage.getItem("p2GamesWon");

    var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p2GamesWon"];
    arrayLen = Object.keys(numArray).length
    document.getElementById("p2-games-won").innerHTML = numArray[arrayLen - 1]

    if (p1Turn) {
        document.getElementById("current-player").innerHTML = "Player 1";
    } else {
        document.getElementById("current-player").innerHTML = "Player 2";
    }

    this.dimensionsChosen = (JSON.parse(localStorage.getItem("data"))).gameData["dimensions"];
    numOfCardMatching3on4 = 0;
    numOfCardMatching4on4 = 0;
})();

function changeTurn() {
    if (p1Turn) {
        document.getElementById("current-player").innerHTML = "Player 2";
        p1Turn = false;
        p2Turn = true;
    } else {
        document.getElementById("current-player").innerHTML = "Player 1";
        p2Turn = false;
        p1Turn = true;
    }
}

function updateScore() {
    //document.getElementById("p1-score").innerHTML = localStorage.getItem("p1CurrentScore");

    var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p1CurrentScore"];
    arrayLen = Object.keys(numArray).length
    document.getElementById("p1-score").innerHTML = numArray[arrayLen - 1]

    //document.getElementById("p2-score").innerHTML = localStorage.getItem("p2CurrentScore");

    var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p2CurrentScore"];
    arrayLen = Object.keys(numArray).length
    document.getElementById("p2-score").innerHTML = numArray[arrayLen - 1]

    //document.getElementById("p1-games-won").innerHTML = localStorage.getItem("p1GamesWon");

    var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p1GamesWon"];
    arrayLen = Object.keys(numArray).length
    document.getElementById("p1-games-won").innerHTML = numArray[arrayLen - 1]

    //document.getElementById("p2-games-won").innerHTML = localStorage.getItem("p2GamesWon");

    var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p2GamesWon"];
    arrayLen = Object.keys(numArray).length
    document.getElementById("p2-games-won").innerHTML = numArray[arrayLen - 1]
}

function checkEndGame() {
    if (this.dimensionsChosen == 12 && numOfCardMatching3on4 == 6) {
        this.gameOver = true;
        determineWinner();
    } else if (this.dimensionsChosen == 16 && numOfCardMatching4on4 == 8) {
        this.gameOver = true;
        determineWinner();
    }
}

function determineWinner() {
    if (p1Points > p2Points) {
        Alert.render(document.getElementById("p1-name").innerHTML + " WON !");


        var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p1GamesWon"];
        arrayLen = Object.keys(numArray).length
        p1GamesWon = numArray[arrayLen - 1]

        p1GamesWon++;

        //localStorage.setItem("p1GamesWon", p1GamesWon);

        var d = JSON.parse(localStorage.getItem("data"))
        d.gameData.p1GamesWon.push(p1GamesWon)
        localStorage.setItem("data", JSON.stringify(d))

    } else if (p2Points > p1Points) {
        Alert.render(document.getElementById("p2-name").innerHTML + " WON !");


        var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p2GamesWon"];
        arrayLen = Object.keys(numArray).length
        p2GamesWon = numArray[arrayLen - 1]

        p2GamesWon++;

        //localStorage.setItem("p2GamesWon", p2GamesWon);

        var d = JSON.parse(localStorage.getItem("data"))
        d.gameData.p2GamesWon.push(p2GamesWon)
        localStorage.setItem("data", JSON.stringify(d))
    } else {
        Alert.render("It's a Tie !");


    }
    setTimeout(() => {
        window.location.reload(true);
    }, 1500);
    updateScore();
    resetBoard();
}

function resetBoard() {
    p1Points = 0;
    //localStorage.setItem("p1CurrentScore", p1Points);

    var d = JSON.parse(localStorage.getItem("data"))
    d.gameData.p1CurrentScore.push(p1Points)
    localStorage.setItem("data", JSON.stringify(d))

    p2Points = 0;
    //localStorage.setItem("p2CurrentScore", p2Points);

    var d = JSON.parse(localStorage.getItem("data"))
    d.gameData.p2CurrentScore.push(p2Points)
    localStorage.setItem("data", JSON.stringify(d))

    setTimeout(() => {
        window.location.reload(false);
    }, 1500);
}
cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();