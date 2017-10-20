/**
 * Created by banYing on 2017/10/20 0020.
 */

var level = 1,
    level1 = [
        [1, 2, 3, 3, 1, 2, 2, 3, 1],
        [3, 2, 1, 2, 1, 3, 1, 3, 2],
        [1, 3, 2, 2, 1, 3, 3, 2, 1],
        [2, 3, 1, 3, 1, 2, 1, 2, 3]
    ],
    isOne = [0, 1, 1, 1, 0, 1, 1, 0, 1],
    level2 = [
        [1, 2, 4, 3, 3, 4, 2, 1, 2, 1, 3, 4, 4, 3, 1, 2],
        [3, 1, 4, 2, 4, 2, 3, 1, 2, 4, 1, 3, 1, 3, 2, 4],
        [2, 1, 3, 4, 4, 3, 1, 2, 1, 2, 4, 3, 3, 4, 2, 1],
        [4, 2, 3, 1, 3, 1, 4, 2, 1, 3, 2, 4, 2, 4, 1, 3]
    ],
    isTwo1 = [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    isTwo2 = [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1],
    level3 = [
        [1, 3, 4, 2, 5, 5, 2, 3, 1, 4, 3, 5, 2, 4, 1, 4, 1, 5, 3, 2, 2, 4, 1, 5, 3],
        [5, 4, 1, 3, 2, 2, 1, 4, 3, 5, 4, 3, 2, 5, 1, 3, 2, 5, 1, 4, 1, 5, 3, 4, 2],
        [3, 5, 1, 4, 2, 2, 3, 5, 1, 4, 1, 4, 2, 5, 3, 4, 1, 3, 2, 5, 5, 2, 4, 3, 1],
        [2, 4, 3, 5, 1, 4, 1, 5, 2, 3, 1, 5, 2, 3, 4, 5, 3, 4, 1, 2, 3, 2, 1, 4, 5]
    ],
    isThree = [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0];

var autoTime;


_setPart()
//_setPart 设置游戏界面
function _setPart() {

    $('#partList , #partLine').empty()

    $('#partList').removeClass('').addClass('part' + level);


    var $chooseArr = _chooseArr(level),
        $arr = $chooseArr[0],
        $isHide = $chooseArr[1]
    console.log("???????", $chooseArr)
    for (var i = 0; i < $arr.length; i++) {

        if ($isHide[i] == 0) {

            $('#partList').append('<li data-role="' + $arr[i] + '"><img src="img/block.png"></li>')

        } else {

            $('#partList').append('<li data-role="' + $arr[i] + '"><img src="img/num/num' + $arr[i] + '.png"></li>')

        }

    }


    var screenH = $(document).height()

    $('.part1').css({'width': screenH * 0.4, 'height': screenH * 0.4});

    $('.part2').css({'width': screenH * 0.45, 'height': screenH * 0.45});

    $('.part3').css({'width': screenH * 0.5, 'height': screenH * 0.5})


}
/**_chooseArr 选择数组
 * i : 等级
 * **/
function _chooseArr(i) {

    var $arr = [];


    if (i == 1) {
        $arr = _getArrayItems(level1, 1).concat([isOne])
    } else if (i == 2) {
        $arr = _getArrayItems(level2, 1).concat([isTwo1])
    } else if (i == 3) {
        $arr = _getArrayItems(level2, 1).concat([isTwo2])
    }
    else if (i == 4) {
        $arr = _getArrayItems(level3, 1).concat([isThree])
    }
    console.log('>>>>>', $arr)
    return $arr

}

function _setHide(i) {

    var aArr = [1, 2, 3], bArr = [1, 2, 3, 4], cArr = [1, 2, 3, 4, 5]

    if (i == 1) {

    } else if (i == 2) {


    } else if (i == 3) {


    }
    else if (i == 4) {


    }

}


//游戏结束
function _over() {

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
 * el：倒计时填充元素
 * fn：回调
 ***/
function _time(i, el, fn) {

    var timeFn = function () {

        i = i - 1

        el.text(i)

        if (i == 0) {

            clearInterval(autoTime)

            fn && fn.call(this)

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
