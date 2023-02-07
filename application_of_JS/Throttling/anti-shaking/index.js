//节流
//一个函数执行后，只有大于设定的执行周期才会执行第二次。
function throttle(fn,delay) {
    //记录上次触发的时间
    var lastTime = 0;
    return function(){
        //记录当前函数触发的时间
        var nowTime = Date.now();
        if(nowTime - lastTime > delay){
            //修改this指向问题
            fn.call(this);
            //同步执行结束时间
            lastTime = nowTime;
        }
    }
}

//防抖
//一个需要频繁出发的函数，在规定时间内，只让最后一次生效，前面的不生效。
function debounce(fn,delay) {
    var timer = null;
    return function(){
        //清除上一次的延时器
        clearTimeout(timer);
        //重新设置新的延时器
        timer = setTimeout(() => {
            //修改this指向问题
            fn.apply(this)
        }, delay);
    }
}