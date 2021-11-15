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
        document.getElementById('dialogboxhead').innerHTML = "";
        document.getElementById('dialogboxbody').innerHTML = dialog;

        document.getElementById('dialogboxfoot').innerHTML = '<form onsubmit="Alert.ok()"action=' + dimGame + '><input type = "submit" class = "btn-hover color-10"value = "ok" / ></form>';

    }
    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}
var dimGame = "";
var Alert = new CustomAlert();


function audio(x) {
    document.getElementById('track').muted = !document.getElementById('track').muted;
    $(x).toggleClass('mute')
}

var gameData = {
    numOfPlayers: 2,
    p1Name: "default_p1",
    p2Name: "default_p2",
    p1CurrentScore: 0,
    p2CurrentScore: 0,
    numOfGames: 0,
    p1GamesWon: 0,
    p2GamesWon: 0,
    dimensionsRows: null,
    dimensionsColumns: null,
    dimensions: null
}

function initGame() {
    this.p1Name = document.getElementById("p1-name").value;
    this.p2Name = document.getElementById("p2-name").value;
    if (document.getElementById("second-size").checked) {
        this.dimensionsRows = 4;
        this.dimensionsColumns = 4;
    } else {
        this.dimensionsRows = 4;
        this.dimensionsColumns = 3;
    }
    this.dimensions = this.dimensionsRows * this.dimensionsColumns;
    this.numOfPlayers = 2;
    this.p1Name = document.getElementById("p1-name").value;
    this.p2Name = document.getElementById("p2-name").value;
    this.p1CurrentScore = 0;
    this.p2CurrentScore = 0;
    this.numOfGames = 0;
    this.p1GamesWon = 0;
    this.p2GamesWon = 0;
    if (this.dimensions == 16) {
        dimGame = "game4x4.html";
    } else {
        dimGame = "game3x4.html";
    }

    let promise = new Promise((resolve, reject) => {
        if (this.dimensions == null) {
            reject("Failed to get dimensions for board!");
        } else {
            resolve("Successfully got dimensions for board!")
        }
    })

    promise.then((message) => {
        Alert.render(message);
    }).catch((message) => {
        Alert.render(message);
    })

    initStorage();
}

function initStorage() {

    var data = {
        "gameData": {
            "numOfPlayers": [],
            "p1Name": [],
            "p2Name": [],
            "p1CurrentScore": [],
            "p2CurrentScore": [],
            "numOfGames": [],
            "p1GamesWon": [],
            "p2GamesWon": [],
            "dimensionsRows": [],
            "dimensionsColumns": [],
            "dimensions": []

        }
    };

    data.gameData["p1Name"].push(this.p1Name)
    data.gameData["p2Name"].push(this.p2Name)
    data.gameData["numOfPlayers"].push(this.numOfPlayers)
    data.gameData["p1CurrentScore"].push(this.p1CurrentScore)
    data.gameData["p2CurrentScore"].push(this.p2CurrentScore)
    data.gameData["numOfGames"].push(this.numOfGames)
    data.gameData["p1GamesWon"].push(this.p1GamesWon)
    data.gameData["p2GamesWon"].push(this.p2GamesWon)
    data.gameData["dimensionsRows"].push(this.dimensionsRows)
    data.gameData["dimensionsColumns"].push(this.dimensionsColumns)
    data.gameData["dimensions"].push(this.dimensions)


    // localStorage.setItem("p1Name", this.p1Name);
    // localStorage.setItem("p2Name", this.p2Name);
    // localStorage.setItem("numOfPlayers", this.numOfPlayers);
    // localStorage.setItem("p1CurrentScore", this.p1CurrentScore);
    // localStorage.setItem("p2CurrentScore", this.p2CurrentScore);
    // localStorage.setItem("numOfGames", this.numOfGames);
    // localStorage.setItem("p1GamesWon", this.p1GamesWon);
    // localStorage.setItem("p2GamesWon", this.p2GamesWon);
    // localStorage.setItem("dimensionsRows", this.dimensionsRows);
    // localStorage.setItem("dimensionsColumns", this.dimensionsColumns);
    // localStorage.setItem("dimensions", this.dimensions);

    localStorage.setItem("data", JSON.stringify(data))
    // console.log(localStorage.getItem("data"))

    // var  p = 3
    // var d = JSON.parse(localStorage.getItem("data"))
    // d.gameData.p1GamesWon.push(p)
    // delete d.gameData.p1GamesWon["0"]
    // localStorage.setItem("data", JSON.stringify(d))


    // console.log(JSON.stringify(d))


    // var numArray = (JSON.parse(localStorage.getItem("data"))).gameData["p1GamesWon"];
    // arrayLen = Object.keys(numArray).length
    // var num = numArray[arrayLen-1]
    // console.log(num);
}