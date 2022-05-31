function fn2(min, max) {
    return min + parseInt(Math.random() * (max - min + 1));
}//求两个随机数中间的随机数

//冒泡排序
function mp(arr) {
    for (j = 1; j < arr.length; j++) {
        for (i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                var temp;
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    return arr
}
//数组排序方法
//     sort(function(a,b){
//     return a-b;//代表升序  b-a 代表降序
//   })
//已知一个数组 把数组里面重复的数据去掉留一个 形成一个新的数组
function Removal(arr) {
    var newsarr = [];
    arr.forEach(function (item) {//表示遍历数组
        if (newsarr.indexOf(item) === -1) {//检查新的数组里面有没有旧的数据，如果为true 代表新的数组里面没有
            newsarr.push(item)//把这个数据添加到新的数组里面去
        }
    })
    return newsarr;
}
// 把当前时间格式化成 YYYY-MM-DD HH:mm:ss
function format(date) {
    // var date=new Date()
    var year = date.getFullYear(); // 获取年
    var month = date.getMonth() + 1;// 0-11 => 1-12
    month = month < 10 ? '0' + month : month

    var day = date.getDate(); // 日期
    day = day < 10 ? '0' + day : day

    var hours = date.getHours(); //小时
    hours = hours < 10 ? '0' + hours : hours;

    var minutes = date.getMinutes(); // 分钟
    minutes = minutes < 10 ? "0" + minutes : minutes

    var seconds = date.getSeconds(); // 秒
    seconds = seconds < 10 ? '0' + seconds : seconds

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

// 返回页面滚动的水平和垂直距离
function getScroll() {
    if (window.pageYOffset) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else {
        return {
            top: document.body.scrollTop + document.documentElement.scrollTop,
            left: document.body.scrollLeft + document.documentElement.scrollLeft
        }
    }
}
// 获取一个随机的16进制的颜色
function getColor() {
    var str = "#"
    for (var i = 1; i <= 6; i++) {
        var num = fn2(0, 15)
        // 转换成十六进制的字符串
        var char = num.toString(16);
        str = str + char;
    }
    return str;
}
// 随机产生一个6位数的验证码
function YZM() {
    var str = '';
    for (i = 1; i <= 6; i++) {
        var code = fn2(48, 122);
        if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122) {
            var chat = String.fromCharCode(code); //返回一个字符串 把编码转换成数字和字母
            str = str + chat
        } else {
            i--  // 如果没有就减一 上面再加一重新执行一遍
        }
    }
    return str
}
/* 
    返回指定dom对象的指定的属性
    第一个参数：要传入一个dom元素
    第二个参数：你要获取的样式名
    返回值：就是样式值，是一个字符串
*/
function getStyle(dom, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(dom, null)[attr]
    } else {
        return dom.currentStyle[attr]
    }
}
// 我想要封装一个运动函数 -- 不兼容ie678
// 我只要传入实参
// 要运动的dom元素
// 要运动的属性
// 要运动到的位置
// 运动完成以后要执行的函数 -- 可选的参数
// 函数就可以帮我实现
// 指定的dom元素
// 要运动的属性
// 要运动到的位置
// 运动完成要做的事情
// 要运动就要有定时器
// 一个dom元素原则上只能有一个定时器控制
// 也就是说一个dom元素不能同时有多个定时器控制
// 把定时器的编号记录到这个dom元素上
// 首先 用计时器 就先清除定时器
function move(dom, attr, target, fn) { //输入参数 元素，属性名，目标，内调函数
    clearInterval(dom.timer); //用计时器时先停止计时器
    dom.timer = setInterval(function () {
        if (attr == 'opacity') { //透明度比较特殊需要单独判断
            var current = parseInt(getStyle(dom, attr) * 100);
        } else {
            var current = parseInt(getStyle(dom, attr))
        }
        var speed = (target - current) / 10; //初始状态
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        var next = current + speed; //下一次状态
        if (next == target) {
            clearInterval(dom.timer);
            if (fn) {
                fn()
            }
        }
        if (attr == 'opacity') {
            dom.style[attr] = next / 100;
        } else {
            dom.style[attr] = next + "px"
        }
    }, 30)
}
//      dom:要缓动的节点
//     obj:要缓动的属性和目标值，对象格式
//     fn:选填,运动结束以后要执行的函数
function animate(dom, obj, fn) {
    // 要用定时器，先清定时器
    clearInterval(dom.timer)
    // 每30ms运动一个位置
    dom.timer = setInterval(() => {
        var flag = 1;
        for (var attr in obj) {
            var target = obj[attr];
            // 获取元素当前样式值
            if (attr == 'opacity') {
                var current = parseInt(getStyle(dom, attr) * 100)
            } else {
                var current = parseInt(getStyle(dom, attr))
            }
            // 设置速度
            var speed = (target - current) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // 计算下一个位置
            var next = current + speed;
            // 判断是否到达目标
            if (next != target) {
                flag = 0;
            }
            if (attr == 'opacity') {
                dom.style[attr] = next / 100
            } else {
                dom.style[attr] = next + "px"
            }
        }
        if (flag == 1) {
            clearInterval(dom.timer);
            if (fn) {
                fn()
            }
        }

    }, 30)
}
// 返回去除收尾空格的字符串
function trim(string){
    return string.replace(/(^\s+)|(\s+$)/g,'')
}
/* 
    封装cookie操作
        + 我们自己把cookie的增删改查封装起来
    封装一个setCookie 方法用来设置
    封装一个getCookie 方法用来获取
*/
function setCookie(key, value, expires) {
    // 接受三个参数
    // key 就是你要设置的cookie的属性名
    // value 就是你要设置的cookie的属性值
    // expires 就是你要设置的cookie的过期时间，单位用 秒
    // expires 可以不传递，不传递的时候默认使用session
    // 1 判断你有没有出阿迪expires
    // 如果传递了就是一个数字，没有传递就是undefined
    if (expires) {
        let time = new Date();
        time.setTime(time.getTime() - 8 * 60 * 60 * 1000 + expires * 1000)
        document.cookie = `${key}=${value};expires=${time}`;
    } else {
        document.cookie = `${key}=${value}`;
    }
}
function getCookie(key) {
    let str = '';
    let temp = document.cookie.split("; ");
    // console.log(temp);// ['a=100', 'b=200', 'c=300']
    // 数组可以循环遍历
    for (let i = 0; i < temp.length; i++) {
        let t = temp[i].split('=');
        if (t[0] === key) {
            str = t[1];
        }
    }
    return str;
}
// 二次封装pGetSend方法
function pGetSend(url){
    return new Promise(function(resolve){
        let xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.onload = function(){
            resolve(xhr.responseText)
        }
        xhr.send()
    });
}

function pPostSend(url,params){
    return new Promise(function(resolve){
        let xhr = new XMLHttpRequest();
        xhr.open('POST',url);
        xhr.onload = function(){
            resolve(xhr.responseText)
        }
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
        xhr.send(params)
    })
}