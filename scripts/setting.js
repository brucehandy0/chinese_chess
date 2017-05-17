
//no Component-based
//no modules ,all of them are global variable

var audio  = document.getElementById('audio');

//this is model
var data = {
    che_r1: {id:"che_r1",x:0,y:9,value:1,camp:"r"},
    che_r2: {id:"che_r2",x:8,y:9,value:1,camp:"r"},
    che_b1: {id:"che_b1",x:0,y:0,value:1,camp:"b"},
    che_b2: {id:"che_b2",x:8,y:0,value:1,camp:"b"},

    ma_r1: {id:"ma_r1",x:1,y:9,value:2,camp:"r"},
    ma_r2: {id:"ma_r2",x:7,y:9,value:2,camp:"r"},
    ma_b1: {id:"ma_b1",x:1,y:0,value:2,camp:"b"},
    ma_b2: {id:"ma_b2",x:7,y:0,value:2,camp:"b"},

    pao_r1: {id:"pao_r1",x:1,y:7,value:3,camp:"r"},
    pao_r2: {id:"pao_r2",x:7,y:7,value:3,camp:"r"},
    pao_b1: {id:"pao_b1",x:1,y:2,value:3,camp:"b"},
    pao_b2: {id:"pao_b2",x:7,y:2,value:3,camp:"b"},

    xiang_r1: {id:"xiang_r1",x:2,y:9,value:4,camp:"r"},
    xiang_r2: {id:"xiang_r2",x:6,y:9,value:4,camp:"r"},
    xiang_b1: {id:"xiang_b1",x:2,y:0,value:4,camp:"b"},
    xiang_b2: {id:"xiang_b2",x:6,y:0,value:4,camp:"b"},

    shi_r1: {id:"shi_r1",x:3,y:9,value:5,camp:"r"},
    shi_r2: {id:"shi_r2",x:5,y:9,value:5,camp:"r"},
    shi_b1: {id:"shi_b1",x:3,y:0,value:5,camp:"b"},
    shi_b2: {id:"shi_b2",x:5,y:0,value:5,camp:"b"},

    bing_r1: {id:"bing_r1",x:0,y:6,value:6,camp:"r"},
    bing_r2: {id:"bing_r2",x:2,y:6,value:6,camp:"r"},
    bing_r3: {id:"bing_r3",x:4,y:6,value:6,camp:"r"},
    bing_r4: {id:"bing_r4",x:6,y:6,value:6,camp:"r"},
    bing_r5: {id:"bing_r5",x:8,y:6,value:6,camp:"r"},

    bing_b1: {id:"bing_b1",x:0,y:3,value:6,camp:"b"},
    bing_b2: {id:"bing_b2",x:2,y:3,value:6,camp:"b"},
    bing_b3: {id:"bing_b3",x:4,y:3,value:6,camp:"b"},
    bing_b4: {id:"bing_b4",x:6,y:3,value:6,camp:"b"},
    bing_b5: {id:"bing_b5",x:8,y:3,value:6,camp:"b"},

    wang_r1: {id:"wang_r1",x:4,y:9,value:7,camp:"r"},
    wang_b1: {id:"wang_b1",x:4,y:0,value:7,camp:"b"},
};

var mapping = {
    che:1,
    ma:2,
    pao:3,
    xiang:4,
    shi:5,
    bing:6,
    wang:7,
}
var mapping_r = {
    1:'俥',
    2:'傌',
    3:'炮',
    4:'相',
    5:'仕',
    6:'兵',
    7:'帥'
}
var mapping_b = {
    1:'車',
    2:'馬',
    3:'砲',
    4:'象',
    5:'士',
    6:'卒',
    7:'将'
}
var global = {
    isChoosed:false,
    currentCamp:true,//true is red ,false is black
    currentCampMapping:{
        'r':true,
        'b':false
    },
    tableText:[],
};

