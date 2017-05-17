

var che_r1 = new Piece(data.che_r1);
var che_r2 = new Piece(data.che_r2);
var che_b1 = new Piece(data.che_b1);
var che_b2 = new Piece(data.che_b2);

var ma_r1 = new Piece(data.ma_r1);
var ma_r2 = new Piece(data.ma_r2);
var ma_b1 = new Piece(data.ma_b1);
var ma_b2 = new Piece(data.ma_b2);

var pao_r1 = new Piece(data.pao_r1);
var pao_r2 = new Piece(data.pao_r2);
var pao_b1 = new Piece(data.pao_b1);
var pao_b2 = new Piece(data.pao_b2);

var xiang_r1 = new Piece(data.xiang_r1);
var xiang_r2 = new Piece(data.xiang_r2);
var xiang_b1 = new Piece(data.xiang_b1);
var xiang_b2 = new Piece(data.xiang_b2);

var shi_r1 = new Piece(data.shi_r1);
var shi_r2 = new Piece(data.shi_r2);
var shi_b1 = new Piece(data.shi_b1);
var shi_b2 = new Piece(data.shi_b2);

var bing_r1 = new Piece(data.bing_r1);
var bing_r2 = new Piece(data.bing_r2);
var bing_r3 = new Piece(data.bing_r3);
var bing_r4 = new Piece(data.bing_r4);
var bing_r5 = new Piece(data.bing_r5);

var bing_b1 = new Piece(data.bing_b1);
var bing_b2 = new Piece(data.bing_b2);
var bing_b3 = new Piece(data.bing_b3);
var bing_b4 = new Piece(data.bing_b4);
var bing_b5 = new Piece(data.bing_b5);

var wang_r1 =  new Piece(data.wang_r1);
var wang_b1 =  new Piece(data.wang_b1);

var choosedPiece;
Piececanvas.addEventListener("click",clickFn,false);


function clickFn(e){
    var canvasPos = util.windowToCanvas(Mapcanvas,e.clientX, e.clientY);
    var mapPos = util.cavaseToMap(canvasPos.x, canvasPos.y);

    if(map.Array[mapPos.y][mapPos.x] != 0){
        if(global.currentCampMapping[map.Array[mapPos.y][mapPos.x].camp] != global.currentCamp) {
            //console.log(audio.paused);
            //if(audio.paused){
            //    audio.src = './resource/music/error.mp3';
            //    audio.play();
            //}
            return
        }
        if(!global.isChoosed){
            choosedPiece = map.Array[mapPos.y][mapPos.x];
            choosedPiece.twinkle(choosedPiece.x, choosedPiece.y);
        }else{
            choosedPiece.unTwinkle(choosedPiece.x, choosedPiece.y);
        }

        //console.log('1');
        Piececanvas.addEventListener("click",clickFnAgain
        )

    }
}
function clickFnAgain(e){
    //console.log('2');

    var canvasPos2 = util.windowToCanvas(Mapcanvas,e.clientX, e.clientY);
    var mapPos2 = util.cavaseToMap(canvasPos2.x, canvasPos2.y);

    if(map.Array[mapPos2.y][mapPos2.x] != choosedPiece){

        choosedPiece.move(mapPos2.x,mapPos2.y);
    }
}


//悔棋只能，一步一步的，因为没有player类。。。
function returnStep(){
    if(map.steps.length == 0){
        console.log('there is no previous step');
        return
    }
    var step = map.steps.pop();

    Piece.prototype.drawPieces.apply(step.before,[step.before.x,step.before.y,step.before.value,step.before.camp]);
    Piece.prototype.clearPieces(step.after.x,step.after.y);
    global.currentCamp = !global.currentCamp;

    if(JSON.stringify(step.eated) != "{}"){
        Piece.prototype.drawPieces.apply(step.eated,[step.eated.x,step.eated.y,step.eated.value,step.eated.camp]);
    }

    global.tableText.pop();
    var tableDom = document.getElementsByClassName('table')[0];
    tableDom.innerHTML = global.tableText.join('<br>');
    //global.isChoosed = false;
}


function playAgain(){
    history.go(0);
}
function giveUP(){
     if(global.currentCamp){
        alert('black win');
    }else{
        alert('red win');
    }
    playAgain();
}
