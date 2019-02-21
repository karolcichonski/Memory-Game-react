class Card{
    constructor(number){
        this.divNum=number;
        this.divId="#card"+number;
        this.photoId="#fig"+number;
        this.coverId="#cover"+number;
        this.photoNum=0;
    }

    showCard(){
        $(this.coverId).fadeOut(500);
    }

    coverCard(){
        $(this.coverId).fadeIn(500);
     }

    blancCard(){
        $(this.divId).css("opacity","1");
        $(this.coverId).css("opacity","0");
        $(this.photoId).fadeOut(500);
    }

    changePhoto(photonum){
        $(this.photoId).html("<img src='img/photo" + photonum + ".png' alt='photo" + photonum + "'>");
        this.photoNum = photonum;
    }
}

const divTable = [];
let best;

function StartNewGame() {
    best=getBestScore();
    if (best != 0) $("#bestScore").html("Best score: " + best);
    let tmpDiv;
    let photoNum;
    photoTable = randomValTable();
    for (let i=0; i<12; i++){
        tmpDiv = new Card(i);
        divTable.push(tmpDiv);
        $(divTable[i].coverId).click(function () { revealCard(i); });
    }

    for (let i = 0; i < 12; i++) {
        photoNum = Math.floor(i / 2)+1;
        divTable[photoTable[i]].changePhoto(photoNum);
    }
     console.log(divTable);
}

function randomValTable() {
    let OutputTable = [];
    let tmpVal;

    while (OutputTable.length < 12) {
        tmpVal = Math.round((Math.random()) * 11);
        if (OutputTable.indexOf(tmpVal) == -1) {
            OutputTable.push(tmpVal)
        }
    }
    return OutputTable;
}

let oneVisible = false;
let turnCounter = 0;
let visibleNr;
let lock = false;
let pairsLeft = 6;

function revealCard(nr) {
    let opacityValue = $(divTable[nr].coverId).css("opacity");
    if (opacityValue > 0 && lock == false) {
        lock = true;
        divTable[nr].showCard();
        if (oneVisible == false) {
            oneVisible = true;
            visiblePhotoNr = divTable[nr].photoNum;
            visibleDivNr = divTable[nr].divNum;
            lock = false;
        } else {
            if (visiblePhotoNr==divTable[nr].photoNum){
                setTimeout(function () {
                    divTable[nr].blancCard();
                    divTable[visibleDivNr].blancCard();
                    setTimeout(function () {
                        pairsLeft--;
                        lock = false;
                        if (pairsLeft == 0) {
                            winFunc();
                        }
                    }, 500);
                }, 1000);
            }else{
                setTimeout(function(){
                    divTable[visibleDivNr].coverCard();
                    divTable[nr].coverCard();
                    setTimeout(function () {
                        lock = false;
                    }, 500);
                }, 1000);
                
                
            }
            turnCounter++;
            $("#score").html("Number od turns: " + turnCounter)
            oneVisible = false;
        }
    }
    return null;
}

function winFunc(){
    $('#container').fadeOut(1000);
    $('#score').fadeOut(1000);
    let winMess = getWinMessage();
    
    setTimeout(function(){
        $('#winDiv').fadeIn(1000);
        $('#winText').html(winMess);
    }, 1000); 
}

function getBestScore(){
    let cook = document.cookie;
    let cookies = document.cookie.split(/; */);
    let cookieName=[];
    let cookieVal=[];
    if (cookies.length > 0) {
        for (let i = 0; i < cookies.length; i++){
            cookieName[i] = cookies[i].split("=")[0];
            cookieVal[i] = cookies[i].split("=")[1];
            if (cookieName[i] == "best") return cookieVal[i];
        }
    } 
    return 0;
}

function getWinMessage(){
    if (best == 0) {
        document.cookie = "best=" + turnCounter;
        best = turnCounter;
        return "Congratulations! You win in " + turnCounter + " turns.";
    } else if (best > turnCounter) {
        document.cookie = "best=" + turnCounter;
        best = turnCounter;
        return "Congratulations new record! You win in " + turnCounter + " turns.";
    } else {
        return "You win in " + turnCounter + " turns. <br/> Best score is " + best;
    }
}
