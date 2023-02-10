Function.prototype.call=function(context=window,...args){
    if(typeof this !== 'function'){
        throw new TypeError('Type Error')
    }
    const fn = Symbol('fn');
    context[fn]=this;
    const res = context[fn](...args);
    delete context[fn];
    return res;
}

function fn(){
    console.log('你好！',this.a)
    // console.log('你好！',this())
}
function fn2(){
    console.log('我是原始的函数',this)
    return 111
}

let orgObj={
    a:100,
}
orgObj['fn']=fn
orgObj.fn()
// fn.call(orgObj)