
var Mapcanvas = document.getElementById('MapCanvas');
if(!Mapcanvas.getContext){
    alert('no support canvas');

}

var cc = Mapcanvas.getContext('2d');
var chessBoardColor = '#1983EA';
var redFlagColor = 'red';
var blackFlagColor = 'black';

// class map
var Map = function(){
    var Array = [];
    for(var y = 0;y<10;y++){
        Array[y] = [];
        for(var x = 0;x<9;x++){
            Array[y][x] = 0;
        }
    };
    //存储棋子的相关信息
    this.Array = Array;
    //每一步都存储起来,
    //this.redstep = [{before:1,ater:2}];
    this.steps = [];

    //console.log(  this.Array );
};

Map.prototype = {
    constructor:Map,



    /**
     * x,y位置，type，类型,type的值为r（right），l（left），a（all）
     */
    drawCross:function(x,y,type){
        x = x*60+30;
        y = y*60+30;
        cc.beginPath();
        cc.strokeStyle = chessBoardColor;
        switch(type){
            case 'r':
                cc.moveTo(x+6,y-24);
                cc.lineTo(x+6,y-6);
                cc.lineTo(x+24,y-6);

                cc.moveTo(x+6,y+24);
                cc.lineTo(x+6,y+6);
                cc.lineTo(x+24,y+6);

                break;
            case 'l':
                cc.moveTo(x-6,y-24);
                cc.lineTo(x-6,y-6);
                cc.lineTo(x-24,y-6);

                cc.moveTo(x-6,y+24);
                cc.lineTo(x-6,y+6);
                cc.lineTo(x-24,y+6);
                break;
            case 'a':
                cc.moveTo(x-6,y-24);
                cc.lineTo(x-6,y-6);
                cc.lineTo(x-24,y-6);

                cc.moveTo(x-6,y+24);
                cc.lineTo(x-6,y+6);
                cc.lineTo(x-24,y+6);

                cc.moveTo(x+6,y-24);
                cc.lineTo(x+6,y-6);
                cc.lineTo(x+24,y-6);

                cc.moveTo(x+6,y+24);
                cc.lineTo(x+6,y+6);
                cc.lineTo(x+24,y+6);
                break
        }
        cc.stroke();
    },
    drawMap:function(){
        //----线
        for (var i = 0; i < 10; i++) {
            cc.beginPath();
            cc.strokeStyle = chessBoardColor;
            cc.moveTo(30, 30 + i * 60);
            cc.lineTo(510, 30 + i * 60);
            cc.stroke();
        }
        //||线
        for (var i = 0; i < 9; i++) {
            cc.beginPath();
            cc.strokeStyle = chessBoardColor;
            if (i == 0 || i == 8) {
                cc.moveTo(30 + i * 60, 30);
                cc.lineTo(30 + i * 60, 570);
            } else {
                cc.moveTo(30 + i * 60, 30);
                cc.lineTo(30 + i * 60, 270);

                cc.moveTo(30 + i * 60, 330);
                cc.lineTo(30 + i * 60, 570);
            }

            cc.stroke();
        }
        //\\//线，这样画，颜色为什么不一样
        cc.beginPath();
        cc.strokeStyle = chessBoardColor;
        cc.moveTo(210, 30);
        cc.lineTo(330, 150);
        cc.stroke();

        cc.beginPath();
        cc.strokeStyle = chessBoardColor;
        cc.moveTo(210, 150);
        cc.lineTo(330, 30);
        cc.stroke();

        cc.beginPath();
        cc.strokeStyle = chessBoardColor;
        cc.moveTo(210, 450);
        cc.lineTo(330, 570);
        cc.stroke();

        cc.beginPath();
        cc.strokeStyle = chessBoardColor;
        cc.moveTo(210, 570);
        cc.lineTo(330, 450);
        cc.stroke();

        //楚河汉界，这里的｛｝没有特别意义
        {
            cc.font = 'bold 40px Arial';
            cc.textBaseline = 'middle'
            cc.fillStyle = chessBoardColor;
            cc.textAlign = 'center';
            cc.fillText('汉界', 150, 300);
            //
            cc.translate(390, 300);
            cc.rotate(Math.PI);

            cc.fillText('楚河', 0, 0);
            cc.rotate(Math.PI);
            cc.translate(-390, -300);
        }

        //画十字
        this.drawCross(1,2,'a');
        this.drawCross(7,2,'a');
        this.drawCross(1,7,'a');
        this.drawCross(7,7,'a');

        this.drawCross(2,3,'a');
        this.drawCross(2,6,'a');

        this.drawCross(4,3,'a');
        this.drawCross(4,6,'a');

        this.drawCross(6,3,'a');
        this.drawCross(6,6,'a');

        this.drawCross(0,3,'r');
        this.drawCross(0,6,'r');

        this.drawCross(8,3,'l');
        this.drawCross(8,6,'l');

    },
    isOver:function(){
        var red = false;
        var black = false;
        for(var y=0;y<10;y++){
            for(var x=0;x<9;x++){
                if(this.Array[y][x].value == 7 && this.Array[y][x].camp =="r"){
                    red = true;
                }
                if(this.Array[y][x].value == 7 && this.Array[y][x].camp =="b"){
                    black = true;
                }

            }
        }

        if(red && !black){
            alert('red win');
            playAgain();
        }
        if(!red && black){
            alert('black win');
            playAgain();
        }

    }


}



