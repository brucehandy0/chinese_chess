
var map = new Map();
map.drawMap();

var Piececanvas = document.getElementById('PieceCanvas');
if(!Piececanvas.getContext){
    alert('浏览器不支持canvas');
    //抛出错误
}

var pcc = Piececanvas.getContext('2d');
//var chessBoardColor = '#1983EA';
//var redFlagColor = 'red';
//var blackFlagColor = 'black';

//class Piece
function Piece(args){
    //this.array = array;
    this.id = args.id;
    this.x = args.x;
    this.y = args.y;
    this.value = args.value;
    this.camp = args.camp;
    //this.isChoosed = false;
    this.drawPieces(this.x,this.y,this.value,this.camp);
}
Piece.prototype = {
    constructor:Piece,

    /**
     * x,y,
     * name,'che','pao','ma','xiang','shi','wang','bing',
     * camp,r(red),b(black)
     */
    drawPieces:function(x,y,value,camp){
        x1 = x*60+30;
        y1 = y*60+30;
        pcc.beginPath();
        pcc.font = 'bold 40px Arial';
        pcc.textBaseline = 'middle';
        pcc.textAlign = 'center';
        if(camp=='r'){
            pcc.fillStyle = redFlagColor;
            pcc.strokeStyle = redFlagColor;
        }else{
            pcc.fillStyle = blackFlagColor;
            pcc.strokeStyle = blackFlagColor;
        }

        switch(value){
            case mapping.che:
                if(camp=='r'){
                    pcc.fillText('俥',x1,y1);
                }else{
                    pcc.fillText('車',x1,y1);
                }
                break;
            case mapping.ma:
                if(camp=='r'){
                    pcc.fillText('傌',x1,y1);
                }else{
                    pcc.fillText('馬',x1,y1);
                }
                break;
            case mapping.pao:
                if(camp=='r'){
                    pcc.fillText('炮',x1,y1);
                }else{
                    pcc.fillText('砲',x1,y1);
                }
                break;
            case mapping.xiang:
                if(camp=='r'){
                    pcc.fillText('相',x1,y1);
                }else{
                    pcc.fillText('象',x1,y1);
                }
                break;
            case mapping.shi:
                if(camp=='r'){
                    pcc.fillText('仕',x1,y1);
                }else{
                    pcc.fillText('士',x1,y1);
                }
                break;
            case mapping.wang:
                if(camp=='r'){
                    pcc.fillText('帥',x1,y1);
                }else{
                    pcc.fillText('将',x1,y1);
                }
                break;
            case mapping.bing:
                if(camp=='r'){
                    pcc.fillText('兵',x1,y1);
                }else{
                    pcc.fillText('卒',x1,y1);
                }
                break;
        }
        map.Array[y][x] = this;

        pcc.arc(x1,y1,30,0,360);
        if(camp=="r"){
            pcc.fillStyle = 'rgba(255, 0, 0, 0.6)'
        }else{
            pcc.fillStyle = 'rgba(0, 0, 0, 0.5)'
        }
        //pcc.shadowBlur=1;
        ////pcc.shadowColor="black";
        //var hue = (0 + 10 * Math.random()) % 360;
        ////pcc.strokeStyle = 'hsl(' + hue + ', 50%, 50%)';
        //pcc.fillStyle = 'rgba(100, 100, 100, 0.5)';
        pcc.fill();
        pcc.stroke();
        pcc.closePath();
        //pcc.shadowBlur = 10;
        ////ctx.lineWidth = 2 + 2 * Math.random();

        //pcc.shadowColor = 'hsl(' + hue + ', 50%, 50%)';
        ////ctx.strokeText(text, x, y)
        //pcc.shadowBlur = 0;

    },
    clearPieces:function(x,y){
        x1 = x*60;
        y1 = y*60;
        map.Array[y][x] = 0;
        //cc.globalCompositeOperation = "source-out";
        pcc.beginPath();
        pcc.clearRect(x1,y1,60,60+1);
        pcc.fill();

    },
    //
    twinkle:function(x,y){
        if(audio.paused){
            audio.src = './resource/music/choosed.mp3'
            audio.play();
        }
        global.isChoosed = true;
        pcc.beginPath();
        x1 = x*60+30;
        y1 = y*60+30;
        pcc.arc(x1,y1,30,0,360);
        pcc.fillStyle = 'rgba(255, 255, 0, 0.6)';
        pcc.fill();
    },
    unTwinkle:function(x,y){
        global.isChoosed = false;

        pcc.fill();
        this.clearPieces(this.x,this.y);
        this.drawPieces(x, y, this.value, this.camp);
    },
    //new pos：{x，y}
    move:function(x2,y2){
        //所有的子，不能下在自己的子的位置
        if(map.Array[y2][x2].camp == this.camp){
            if(audio.paused){
                audio.src = './resource/music/error.mp3';
                audio.play();
            }
            return false;
        }
        //1符合移动规则
        //2若吃子，符合吃子规则，
        //3不合符，有个错误提示音
        switch(this.value){
            //车的规则写的很不爽，可以改改
            case mapping.che:
                if(this.x != x2 && this.y != y2){
                    if(audio.paused){
                        audio.src = './resource/music/error.mp3';
                        audio.play();
                    }
                    return false;
                }
                //横向，自己右侧移动判断，碰到棋子，判断阵营
                if(this.x<x2){
                    for (var i = this.x + 1; i <= x2; i++) {
                        if (map.Array[y2][i] != 0) {

                            if(map.Array[y2][i].camp == this.camp){
                                if(audio.paused){
                                    audio.src = './resource/music/error.mp3';
                                    audio.play();
                                }
                                return false;
                            }
                            //碰到对方棋子，不能跨过去，但是可以吃
                            if(i == x2){
                                //ok
                            }else{
                                if(audio.paused){
                                    audio.src = './resource/music/error.mp3';
                                    audio.play();
                                }
                                return false;
                            }

                        }
                    }
                }
                if(this.x>x2){
                    for (var i = this.x - 1; i >= x2; i--) {
                        if (map.Array[y2][i] != 0) {
                            if(map.Array[y2][i].camp == this.camp){
                                if(audio.paused){
                                    audio.src = './resource/music/error.mp3';
                                    audio.play();
                                }
                                return false;
                            }
                            if(i == x2){
                                //ok
                            }else{
                                if(audio.paused){
                                    audio.src = './resource/music/error.mp3';
                                    audio.play();
                                }
                                return false;
                            }
                        }
                    }
                }
                if(this.y<y2){
                    for (var i = this.y + 1; i <= y2; i++) {
                        if (map.Array[i][x2] != 0) {
                            if(map.Array[i][x2].camp == this.camp){
                                if(audio.paused){
                                    audio.src = './resource/music/error.mp3';
                                    audio.play();
                                }
                                return false;
                            }
                            if(i == y2){
                                //ok
                            }else{
                                if(audio.paused){
                                    audio.src = './resource/music/error.mp3';
                                    audio.play();
                                }
                                return false;
                            }
                        }
                    }
                }
                if(this.y>y2){
                    for (var i = this.y - 1; i >= y2; i--) {
                        if (map.Array[i][x2] != 0) {
                            if(map.Array[i][x2].camp == this.camp){
                                if(audio.paused){
                                    audio.src = './resource/music/error.mp3';
                                    audio.play();
                                }
                                return false;
                            }
                            if(i == y2){
                                //ok
                            }else{
                                if(audio.paused){
                                    audio.src = './resource/music/error.mp3';
                                    audio.play();
                                }
                                return false;
                            }
                        }
                    }
                }


                break;
            case mapping.ma:


                //8个日字
                if(x2 == this.x+1 && y2 ==this.y+2 ){
                    if(map.Array[this.y+1][this.x] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }

                }else if(x2 == this.x+2 && y2 ==this.y+1){
                    if(map.Array[this.y][this.x+1] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                }else if(x2 == this.x+2 && y2 ==this.y-1){
                    if(map.Array[this.y][this.x+1] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                }else if(x2 == this.x+1 && y2 ==this.y-2){
                    if(map.Array[this.y-1][this.x] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                }else if(x2 == this.x-1 && y2 ==this.y-2){
                    if(map.Array[this.y-1][this.x] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                }else if(x2 == this.x-2 && y2 ==this.y-1){
                    if(map.Array[this.y][this.x-1] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                }else if(x2 == this.x-2 && y2 ==this.y+1){
                    if(map.Array[this.y][this.x-1] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                }else if(x2 == this.x-1 && y2 ==this.y+2){
                    if(map.Array[this.y+1][this.x] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                }else{
                    if(audio.paused){
                        audio.src = './resource/music/error.mp3';
                        audio.play();
                    }
                    return false;
                }

                break;
            case mapping.pao:




                var flag = 0;
                //移动
                if(map.Array[y2][x2]  == 0){
                    if(this.x != x2){
                        var num_1 = (this.x-x2)/Math.abs(this.x-x2);
                        for(var i = this.x-num_1;i != x2;i=i-num_1 ){
                            //console.log(i);
                            if (map.Array[y2][i] != 0) {
                                if(audio.paused){
                                    audio.src = './resource/music/error.mp3';
                                    audio.play();
                                }
                                return false;
                            }
                        }
                    }
                    if(this.y != y2){
                        var num_1 = (this.y-y2)/Math.abs(this.y-y2);
                        for(var i = this.y-num_1;i != y2;i=i-num_1 ){
                            if (map.Array[i][x2] != 0) {
                                if(audio.paused){
                                    audio.src = './resource/music/error.mp3';
                                    audio.play();
                                }
                                return false;
                            }
                        }
                    }
                }
                //吃子
                else if(map.Array[y2][x2] != 0 && map.Array[y2][x2].camp !=this.camp){
                    if(this.x != x2){
                        var num_1 = (this.x-x2)/Math.abs(this.x-x2);
                        for(var i = this.x-num_1;i != x2;i=i-num_1 ){
                            if(map.Array[y2][i] != 0){
                                flag++;
                            }
                        }
                        if(flag ==1){
                        }else{
                            if(audio.paused){
                                audio.src = './resource/music/error.mp3';
                                audio.play();
                            }
                            return false;
                        }
                    }

                    if(this.y != y2){
                        var num_1 = (this.y-y2)/Math.abs(this.y-y2);
                        for(var i = this.y-num_1;i != y2;i=i-num_1 ){
                            if (map.Array[i][x2] != 0) {
                                flag++
                            }
                        }
                        if(flag ==1){
                        }else{
                            if(audio.paused){
                                audio.src = './resource/music/error.mp3';
                                audio.play();
                            }
                            return false;
                        }
                    }
                }else{
                    if(audio.paused){
                        audio.src = './resource/music/error.mp3';
                        audio.play();
                    }
                    return false
                }

                break;
            case mapping.xiang:

                //不能过河
                if(this.camp == 'r' && y2<5){
                    if(audio.paused){
                        audio.src = './resource/music/error.mp3';
                        audio.play();
                    }
                    return false
                }
                if(this.camp == 'b' && y2>4){
                    if(audio.paused){
                        audio.src = './resource/music/error.mp3';
                        audio.play();
                    }
                    return false
                }

                //4个田字
                if(x2 == this.x+2 && y2 ==this.y+2 ){
                    if(map.Array[this.y+1][this.x+1] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }

                }else if(x2 == this.x+2 && y2 ==this.y-2){
                    if(map.Array[this.y-1][this.x+1] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                }else if(x2 == this.x-2 && y2 ==this.y+2){
                    if(map.Array[this.y+1][this.x-1] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                }else if(x2 == this.x-2 && y2 ==this.y-2){
                    if(map.Array[this.y-1][this.x-1] != 0){
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                }else{
                    if(audio.paused){
                        audio.src = './resource/music/error.mp3';
                        audio.play();
                    }
                    return false;
                }
                break;
            case mapping.shi:

                if(this.camp == 'r' &&x2>=3&&x2<=5&&y2>=7&&y2<=9){
                    if(x2==this.x+1 && y2 == this.y+1){

                    }else if(x2==this.x+1 && y2 == this.y-1){

                    }else if(x2==this.x-1 && y2 == this.y+1){

                    }else if(x2==this.x-1 && y2 == this.y-1){

                    }else{
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }

                }else if(this.camp == 'b' &&x2>=3&&x2<=5&&y2>=0&&y2<=2){
                    if(x2==this.x+1 && y2 == this.y+1){

                    }else if(x2==this.x+1 && y2 == this.y-1){

                    }else if(x2==this.x-1 && y2 == this.y+1){

                    }else if(x2==this.x-1 && y2 == this.y-1){

                    }else{
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                }else{
                    if(audio.paused){
                        audio.src = './resource/music/error.mp3';
                        audio.play();
                    }
                    return false
                }

                break;
            case mapping.wang:

                if(this.camp == 'r' &&x2>=3&&x2<=5&&y2>=7&&y2<=9){
                    if(x2==this.x+1 && y2 == this.y){

                    }else if(x2==this.x && y2 == this.y+1){

                    }else if(x2==this.x-1 && y2 == this.y){

                    }else if(x2==this.x && y2 == this.y-1){

                    }else{
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }

                }else if(this.camp == 'b' &&x2>=3&&x2<=5&&y2>=0&&y2<=2){
                    if(x2==this.x+1 && y2 == this.y){

                    }else if(x2==this.x && y2 == this.y+1){

                    }else if(x2==this.x-1 && y2 == this.y){

                    }else if(x2==this.x && y2 == this.y-1){

                    }else{
                        if(audio.paused){
                            audio.src = './resource/music/error.mp3';
                            audio.play();
                        }
                        return false
                    }
                    //吃对方老帅规则
                }else if(map.Array[y2][x2].value==7&&map.Array[y2][x2].camp!=this.camp){
                    var num_1 = (this.y-y2)/Math.abs(this.y-y2);
                    for(var i = this.y-num_1;i != y2;i=i-num_1 ){
                        if (map.Array[i][x2] != 0) {
                            if(audio.paused){
                                audio.src = './resource/music/error.mp3';
                                audio.play();
                            }
                            return false;
                        }
                    }
                }else{
                    if(audio.paused){
                        audio.src = './resource/music/error.mp3';
                        audio.play();
                    }
                    return false
                }

                break;
            case mapping.bing:
                if(this.camp == 'r'){
                    if(this.y>4){
                        if(x2 !=this.x || y2 !=this.y-1){
                            if(audio.paused){
                                audio.src = './resource/music/error.mp3';
                                audio.play();
                            }
                            return false
                        }
                        //过河
                    }else{
                        if(x2 == this.x && y2 == this.y-1){
                        }else if(x2 == this.x+1 && y2 == this.y){
                        }else if(x2 == this.x-1 && y2 == this.y){
                        }else{
                            if(audio.paused){
                                audio.src = './resource/music/error.mp3';
                                audio.play();
                            }
                            return false
                        }
                    }
                }
                if(this.camp == 'b'){
                    if(this.y<5){
                        if(x2 !=this.x || y2 !=this.y+1){
                            if(audio.paused){
                                audio.src = './resource/music/error.mp3';
                                audio.play();
                            }
                            return false
                        }
                        //过河
                    }else{
                        if(x2 == this.x && y2 == this.y+1){
                        }else if(x2 == this.x+1 && y2 == this.y){
                        }else if(x2 == this.x-1 && y2 == this.y){
                        }else{
                            if(audio.paused){
                                audio.src = './resource/music/error.mp3';
                                audio.play();
                            }
                            return false
                        }
                    }
                }
                break;
        }

        //运行到这里，说明这步可以走

        //打谱
        var s = util.posXYToS(this.value,this.camp,this.x,this.y,x2,y2);
        global.tableText.push(s);



        var tableDom = document.getElementsByClassName('table')[0];
        tableDom.innerHTML = global.tableText.join('<br>');

        var beforeStep = util.deepCopy(this);

        //被吃掉的子
        var eatedStep = {};
        if(map.Array[y2][x2]  != 0){
            eatedStep = util.deepCopy(map.Array[y2][x2]);
        }

        this.clearPieces(this.x,this.y);
        this.clearPieces(x2,y2);

        this.x = x2;
        this.y = y2;
        this.drawPieces(x2, y2, this.value, this.camp);

        var afterStep = util.deepCopy(this);
        map.steps.push({'before':beforeStep,'after':afterStep,'eated':eatedStep});
        map.Array[y2][x2] = this;

        global.currentCamp = !global.currentCamp;
        global.isChoosed = false;

        Piececanvas.removeEventListener('click',clickFnAgain);

        if(audio.paused){
            audio.src = './resource/music/go.wav';
            audio.play();
        }
        map.isOver();
    },

    isCollided:function(){

    },

}