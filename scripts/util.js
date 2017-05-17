var util = {

    /**
     * 这个函数写完后发现没用到..
     * length:60px,
     * x,y,initial position,eg:3,5,x range 0-8，y range 0-9
     * type:v,h,ou(oblique up) / ,od(oblique down) \
     */
    drawline: function (x, y, type) {
        type = type || h;
        var x1, y1;
        cc.moveTo(x * 60 + 30, y * 60 + 30);
        switch (type) {
            case 'h':
                if (x + 1 < 9) {
                    x1 = (x + 1) * 60 + 30;
                    y1 = y * 60 + 30;
                }
                break;
            case 'v':
                if (y + 1 < 10) {
                    x1 = x * 60 + 30;
                    y1 = (y + 1) * 60 + 30;
                }
                break;
            case 'ou':
                if (x + 1 < 9 && y - 1 > 0) {
                    x1 = (x + 1) * 60 + 30;
                    y1 = (y - 1) * 60 + 30;
                }
                break
            case 'od':
                if (x + 1 < 9 && y + 1 < 10) {
                    x1 = (x + 1) * 60 + 30;
                    y1 = (y + 1) * 60 + 30;
                }
                break
        }
        cc.lineTo(x1, y1);
        cc.stroke();
    },

    //红方车二进六,黑方马8进7
    posXYToS: function (value, camp, x1, y1, x2, y2) {
        //检查 前 后
        for (var j = 0; j < 10; j++) {
            if (map.Array[j][x1].value == value && map.Array[j][x1].camp == camp) {

                //马相士
                if (value == 2 || value == 4 || value == 5){
                    if (camp == 'r' && y1 < j) {
                        var name = mapping_r[value];
                        var yy2 = util.arabToChinese(Math.abs(x2 - 9));
                        if (y1 < y2) {
                            return '前'+name  + "退" + yy2;
                        } else {
                            return '前'+name  + "进" + yy2;
                        }
                    }else if(camp == 'r' && y1 > j){
                        var name = mapping_r[value];
                        var yy2 = util.arabToChinese(Math.abs(x2 - 9));
                        if (y1 < y2) {
                            return '后'+name  + "退" + yy2;
                        } else {
                            return '后'+name  + "进" + yy2;
                        }

                    }else if(camp == 'b' && y1 < j){
                        var name = mapping_b[value];
                        var yy2 = x2 + 1;
                        if (y1 < y2) {
                            return '后'+name  + "进" + yy2;
                        } else {
                            return '后'+name  + "退" + yy2;
                        }


                    }else if(camp == 'b' && y1 > j){
                        var name = mapping_b[value];
                        var yy2 = x2 + 1;
                        if (y1 < y2) {
                            return '前'+name  + "进" + yy2;
                        } else {
                            return '前'+name  + "退" + yy2;
                        }
                    }
                    //其余子
                }else{
                    /////

                    //var xx1 = util.arabToChinese(Math.abs(x1 - 9));
                    var xx2 = util.arabToChinese(Math.abs(x2 - 9));
                    //var xx1 = x1 + 1;
                    //var xx2 = x2 + 1;
                    if (camp == 'r' && y1 < j) {
                        var name = mapping_r[value];
                        var xx2 = util.arabToChinese(Math.abs(x2 - 9));
                        var yy2 = util.arabToChinese(Math.abs(y1 - y2));
                        if (y1 < y2) {
                            return '前'+name  + "退" + yy2;
                        }else if(y1 > y2) {
                            return '前'+name  + "进" + yy2;
                        }
                        if(x1 != x2){
                            return '前'+name  + "平" + xx2;
                        }
                    }else if(camp == 'r' && y1 > j){
                        var name = mapping_r[value];
                        var xx2 = util.arabToChinese(Math.abs(x2 - 9));
                        var yy2 = util.arabToChinese(Math.abs(y1 - y2));
                        if (y1 < y2) {
                            return '后'+name  + "退" + yy2;
                        }else if(y1 > y2) {
                            return '后'+name  + "进" + yy2;
                        }
                        if(x1 != x2){
                            return '后'+name  + "平" + xx2;
                        }
                    }else if(camp == 'b' && y1 < j){

                        var name = mapping_b[value];
                        var xx2 = x2+1;
                        var yy2 = Math.abs(y1 - y2);
                        if (y1 < y2) {
                            return '后'+name  + "进" + yy2;
                        }else if(y1 > y2) {
                            return '后'+name  + "退" + yy2;
                        }
                        if(x1 != x2){
                            return '后'+name  + "平" + xx2;
                        }

                    }else if(camp == 'b' && y1 > j){
                        var name = mapping_b[value];
                        var xx2 = x2+1;
                        var yy2 = Math.abs(y1 - y2);
                        if (y1 < y2) {
                            return '前'+name  + "进" + yy2;
                        }else if(y1 > y2) {
                            return '前'+name  + "退" + yy2;
                        }
                        if(x1 != x2){
                            return '前'+name  + "平" + xx2;
                        }
                    }

                }

            }
        }


        if (camp == 'r') {
            var name = mapping_r[value];
            var xx1 = util.arabToChinese(Math.abs(x1 - 9));
            var xx2 = util.arabToChinese(Math.abs(x2 - 9));

            //马相士
            if (value == 2 || value == 4 || value == 5) {
                var yy2 = util.arabToChinese(Math.abs(x2 - 9));
                if (y1 < y2) {
                    return name + xx1 + "退" + yy2;
                } else {
                    return name + xx1 + "进" + yy2;
                }
                //其余子
            } else {
                if (y1 != y2) {
                    var yy2 = util.arabToChinese(Math.abs(y1 - y2));
                    if (y1 < y2) {
                        return name + xx1 + "退" + yy2;
                    } else {
                        return name + xx1 + "进" + yy2;
                    }
                } else if (x1 != x2) {
                    return name + xx1 + "平" + xx2;
                }
            }
        } else {
            var name = mapping_b[value];
            var xx1 = x1 + 1;
            var xx2 = x2 + 1;
            if (value == 2 || value == 4 || value == 5) {
                var yy2 = x2 + 1;
                if (y1 > y2) {
                    return name + xx1 + "退" + yy2;
                } else {
                    return name + xx1 + "进" + yy2;
                }
            } else {
                if (y1 != y2) {
                    var yy2 = Math.abs(y1 - y2);
                    if (y1 > y2) {
                        return name + xx1 + "退" + yy2;
                    } else {
                        return name + xx1 + "进" + yy2;
                    }
                } else if (x1 != x2) {
                    return name + xx1 + "平" + xx2;
                }
            }
        }

    },
    arabToChinese: function (num) {
        switch (num) {
            case 1:
                return "一";
                break;
            case 2:
                return "二";
                break;
            case 3:
                return "三";
                break;
            case 4:
                return "四";
                break;
            case 5:
                return "五";
                break;
            case 6:
                return "六";
                break;
            case 7:
                return "七";
                break;
            case 8:
                return "八";
                break;
            case 9:
                return "九";
                break;
        }
    },
    windowToCanvas: function (canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: (x - bbox.left) * (canvas.width / bbox.width),
            y: (y - bbox.top) * (canvas.height / bbox.height)
        };
    },
    cavaseToMap: function (x, y) {
        return {x: Math.ceil(x / 60) - 1, y: Math.ceil(y / 60) - 1};
    },
    deepCopy: function (parent, c) {
        var c = c || {};
        for (var i in parent) {
            if (!parent.hasOwnProperty(i)) {
                continue;
            }
            if (typeof parent[i] === 'object') {
                c[i] = (parent[i].constructor === Array) ? [] : {};
                deepCopy(parent[i], c[i]);
            } else {
                c[i] = parent[i];
            }
        }
        //
        c.__proto__ = parent.__proto__;
        return c;
    }


}