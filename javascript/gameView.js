/**
 * Created by banYing on 2017/10/20 0020.
 */

var level = 1, levelNum = 0, clickSum = 3, clickCur = 0, islevelFourOne = true, isPractice = true,
    level1 = [
        [1, 2, 3, 3, 1, 2, 2, 3, 1],
        [3, 2, 1, 2, 1, 3, 1, 3, 2],
        [1, 3, 2, 2, 1, 3, 3, 2, 1],
        [2, 3, 1, 3, 1, 2, 1, 2, 3]
    ],

    level2 = [
        [1, 2, 4, 3, 3, 4, 2, 1, 2, 1, 3, 4, 4, 3, 1, 2],
        [3, 1, 4, 2, 4, 2, 3, 1, 2, 4, 1, 3, 1, 3, 2, 4],
        [2, 1, 3, 4, 4, 3, 1, 2, 1, 2, 4, 3, 3, 4, 2, 1],
        [4, 2, 3, 1, 3, 1, 4, 2, 1, 3, 2, 4, 2, 4, 1, 3]
    ],

    level3 = [
        [1, 3, 4, 2, 5, 5, 2, 3, 1, 4, 3, 5, 2, 4, 1, 4, 1, 5, 3, 2, 2, 4, 1, 5, 3],
        [5, 4, 1, 2, 3, 2, 1, 4, 3, 5, 4, 3, 2, 5, 1, 3, 2, 5, 1, 4, 1, 5, 3, 4, 2],
        [3, 5, 1, 4, 2, 2, 3, 5, 1, 4, 1, 4, 2, 5, 3, 4, 1, 3, 2, 5, 5, 2, 4, 3, 1],
        [2, 4, 3, 5, 1, 4, 1, 5, 2, 3, 1, 5, 2, 3, 4, 5, 3, 4, 1, 2, 3, 2, 1, 4, 5]
    ]


var autoTime, rightVal = '';


_even()

function _even() {

    $('#setPartBtn').on('click', function () {
        console.log('>>>>>>>>>>>')
        _setPart()
    })

    $('#goscreen2').on('click', function () {

        $('#screen2').show()

    })
    $('#goscreen3').on('click', function () {
        _setPart()
        $('#screen3').show()

    })


    $('#stop').on('click', function () {

        $('#stopBox').show()

        $('#screen3').hide();
        clearInterval(autoTime)
    })
    $('#continue').on('click', function () {

        $('#stopBox').hide()
        $('#screen3').show()

        var $time = $('#timeBox').text()

        _time($time, function () {

            if (levelNum == 4) {
                islevelFourOne = false;
                clickSum = 8
            }
            if (levelNum == 6) {
                level = 3
                clickSum = 10
            }

            if (levelNum == 2) {
                _goTest()
            } else {
                _setPart()
            }


        })

    })

    $('[data-role="out"]').click(function () {

        _out()
    })

}

//_setPart 设置游戏界面
function _setPart() {

    clickCur = 0;

    levelNum = levelNum + 1

    clearInterval(autoTime);

    $('#tip').hide()

    $('#partSure img').attr({'src': 'img/btn5.png', 'onclick': ''})

    $('#partList , #partLine').empty()

    $('#partList').removeClass('').addClass('part' + level);


    var $chooseArr = _chooseArr(level),
        $arr = $chooseArr[0],
        $isHide = $chooseArr[1];

    for (var i = 0; i < $arr.length; i++) {

        if ($isHide[i] == 0) {

            $('#partList').append('<li onclick="_checkLeft(event,' + $arr[i] + ')" ><img src="img/block.png"  data-role="' + $arr[i] + '"></li>')

        } else {

            $('#partList').append('<li><img src="img/num/num' + $arr[i] + '.png" data-role="' + $arr[i] + '"></li>')

        }

    }


    for (var n = 1; n <= level + 2; n++) {

        $('#partLine').append('<img src="img/nums/num' + n + '.png" onclick="_getRight(event,' + n + ')"  data-role="' + n + '">')

    }

    var $time = isPractice ? 300 : 600;

    _time($time, function () {

        if (levelNum == 4) {
            islevelFourOne = false;
            clickSum = 8
        }
        if (levelNum == 6) {
            level = 3
            clickSum = 10
        }

        if (levelNum == 2) {
            _goTest()
        } else {
            _setPart()
        }


    })

    var screenH = $(document).height();

    $('.part1').css({'width': screenH * 0.4, 'height': screenH * 0.4});

    $('.part2').css({'width': screenH * 0.45, 'height': screenH * 0.45});

    $('.part3').css({'width': screenH * 0.5, 'height': screenH * 0.5})


}

function _getRight(e, val) {
    rightVal = val
}

function _checkLeft(e, val) {

    if (!rightVal) {

        var $imgSrc;

        if (isPractice) {
            $(e.target).children('img').attr('src', 'img/block.png')

            $(e.target).removeClass('result1');

            $imgSrc = $(e.target).children('img').attr('src')
        } else {
            $(e.target).attr('src', 'img/block.png')

            $(e.target).parent('li').removeClass('result1')

            $imgSrc = $(e.target).attr('src')

        }

        if (!!$imgSrc) {

            if ($imgSrc.indexOf("block") != -1) {

                console.log('>>>>')

                clickCur = clickCur - 1

                $('#partSure img').attr({'src': 'img/btn5.png', 'id': ''})

            }

        }

        return
    }

    $(e.target).parent('li').css({'pointer-events': "none"})
    if (rightVal == val) {

        if (isPractice) {
            $(e.target).parent('li').addClass('result1')
        }

        console.log('答对了')

        $imgSrc = !!$(e.target).attr('src') ? $(e.target).attr('src') : $(e.target).children('img').attr('src')

        if ($imgSrc.indexOf("block") != -1) {

            clickCur = clickCur + 1;

            $('#partSure img').attr({'src': 'img/btn5.png', 'id': ''})
        }


    } else {


        if (isPractice) {
            $(e.target).parent('li').addClass('result2')
            setTimeout(function () {
                $(e.target).parent('li').removeClass('result2').css({'pointer-events': ""})
                $(e.target).attr('src', 'img/block.png')
            }, 750)
        } else {
            clickCur = clickCur + 1;
        }


        console.log('答错了')
    }
    setTimeout(function () {
        $(e.target).parent('li').css({'pointer-events': ""})
    }, 750)
    $(e.target).attr('src', 'img/nums/num' + rightVal + '.png')
    rightVal = ''
    console.log('clickCur,clickSum', clickCur, clickSum)
    if (clickCur == clickSum) {
        setTimeout(function () {
            if (levelNum < 2) {
                $('#partSure img').attr({'src': 'img/btn5s.png', 'onclick': '_setPart()'})
            } else if (levelNum == 2) {
                $('#partSure img').attr({'src': 'img/btn5s.png', 'onclick': '_goTest()'})
            }
            else if (levelNum < 4 && levelNum > 2) {
                $('#partSure img').attr({'src': 'img/btn5s.png', 'onclick': '_setPart()'})
            } else if (levelNum == 4) {
                islevelFourOne = false;
                clickSum = 8
                $('#partSure img').attr({'src': 'img/btn5s.png', 'onclick': '_setPart()'})
            }
            else if (levelNum < 6 && levelNum > 4) {
                $('#partSure img').attr({'src': 'img/btn5s.png', 'onclick': '_setPart()'})
            } else if (levelNum == 6) {
                level = 3
                clickSum = 10
                $('#partSure img').attr({'src': 'img/btn5s.png', 'onclick': '_setPart()'})
            }
            else if (levelNum < 8 && levelNum > 6) {
                $('#partSure img').attr({'src': 'img/btn5s.png', 'onclick': '_setPart()'})
            } else if (levelNum == 8) {

                $('#partSure img').attr({'src': 'img/btn5s.png', 'onclick': '_over()'})
            }

        }, 0)
    }
}
// 去正式题
function _goTest() {
    $('#screen3').hide()
    $('#screen4').show()

    $('#start').on('click', function () {
        level = 2
        clickSum = 4
        isPractice = false
        _setPart()
        $('#screen3').show()
        $('#screen4').hide()

    })
}

/**_chooseArr 选择数组
 * i : 等级
 * **/
function _chooseArr(i) {

    var $arr = [];
    if (i == 1) {
        $arr = _getArrayItems(level1, 1).concat([_setHide(3, 1)])
    } else if (i == 2) {
        if (islevelFourOne) {
            $arr = _getArrayItems(level2, 1).concat([_setHide(4, 1)])
        } else {
            $arr = _getArrayItems(level2, 1).concat([_setHide(4, 2)])
        }

    }
    else if (i == 3) {
        $arr = _getArrayItems(level3, 1).concat([_setHide(5, 2)])
    }
    return $arr

}

/***
 * _setHide 设置隐藏区块
 * x:目标数
 * y:隐藏个数
 * 例如3选1  x:3 y:1
 * **/
function _setHide(x, y) {
    var $arr = []
    for (var j = 0; j < x; j++) {
        $arr[j] = j;
    }
    // console.log(a)
    var $c = 0, $d = 0, $e = 0;
    var One = []
    for (var j = 0; j < (x * x); j++) {
        One[j] = 1;
    }
    // console.log(One)
    var sum = x * (x - 1) + 1
    for (var i = 0; i < sum; i = i + x) {
        // console.log("i=",i)
        var $b = _getArrayItems($arr, y)
        $d = i + $b[0]
        if (y == 2) {
            $e = i + $b[1]
            One.splice($e, 1, 0)
        }
        //  console.log("b=",b)
        // console.log("d=",d,"e=",e)
        One.splice($d, 1, 0)
    }
    return One
}

//游戏结束
function _over() {

    $('#screen3').hide()
    $('#over').show()
    // $('#score').text(correctNum * 100)

    /* ajax 请求接口路径，返回json 数据
     * timeObj: 游戏时间json
     * score：得分
     * */

    var param = {

        // timeObj: timeObj,
        //
        // score: correctNum * 100

    }

    console.log('当前返回参数', param)

}

//游戏退出
function _out() {

    console.log('游戏退出')

}


/*** 倒计时
 * i：结束时间
 * fn：回调
 ***/
function _time(i, fn) {

    $('#timeBox').text(i)

    var timeFn = function () {

        i = i - 1

        $('#timeBox').text(i)

        if (i < 0) {

            clearInterval(autoTime);

            fn && fn.call(this)

        }
        if (isPractice) {
            if (i <= 120) {
                $('#tip').show()
            }
        } else {

            if (i <= 300) {

                $('#tip').attr('src', 'img/tip2.png').show()

            }
        }


    }

    autoTime = setInterval(timeFn, 1000);

}

/*** 数组随机
 * arr：数组
 * num：随机个数
 ***/
function _getArrayItems(arr, num) {

    var array = [];

    for (var index in arr) {

        array.push(arr[index]);
    }

    var return_array = [];

    for (var i = 0; i < num; i++) {

        if (array.length > 0) {

            var arrIndex = Math.floor(Math.random() * array.length);

            return_array[i] = array[arrIndex];

            array.splice(arrIndex, 1);

        } else {
            break;
        }
    }
    return return_array;
}
