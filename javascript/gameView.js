/**
 * Created by banYing on 2017/10/20 0020.
 */

var level1 = [
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
        [5, 4, 1, 3, 2, 2, 1, 4, 3, 5, 4, 3, 2, 5, 1, 3, 2, 5, 1, 4, 1, 5, 3, 4, 2],
        [3, 5, 1, 4, 2, 2, 3, 5, 1, 4, 1, 4, 2, 5, 3, 4, 1, 3, 2, 5, 5, 2, 4, 3, 1],
        [2, 4, 3, 5, 1, 4, 1, 5, 2, 3, 1, 5, 2, 3, 4, 5, 3, 4, 1, 2, 3, 2, 1, 4, 5]
    ];

var autoTime;
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
