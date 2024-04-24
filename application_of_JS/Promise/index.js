//什么是宏任务？
//宏任务是js中的一种任务，它是由js引擎进行调度和执行的，每个宏任务都包含一个或多个微任务。

//宏任务有哪些？
//常见的宏任务有：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js环境)

//微任务有哪些？
//常见的微任务有：Promise.then()、MutaionObserver、process.nextTick(Node.js环境)

//宏任务和微任务的执行顺序？
//在执行宏任务时，会先执行该宏任务中的所有微任务，然后再执行下一个宏任务。

//宏任务的定义
// console.log(1);

// setTimeout(function() {
//     console.log(2);
// })

// new Promise(function executor(resolve) {
//     console.log(3);
//     resolve();
// })
// .then(function() {
//     console.log(4);
// })


// console.log(5);

//宏任务：1 3 5 4 2

//1.Promise是一个构造函数
//2.Promise接受一个参数，该参数是一个函数，并且该函数接受两个参数：resolve和reject
//3.Promise实例有一个then方法，该方法接受两个参数：onFulfilled和onRejected，这两个参数也是函数
//4.Promise实例的状态由pending变为fulfilled，或者由pending变为rejected
//5.Promise实例的then方法返回一个新的Promise实例


// Promise 的 status:
// 1.'pending'
// 2.'fulfilled'
//    --在'pending'状态下，可以通过'resolve'方法将状态改为'fulfilled'，拥有一个'value'
// 3.'rejected'
//    --在'pending'状态下，可以通过'reject'方法将状态改为'rejected'，拥有一个'reason'

//then函数：
//1.then函数接受两个参数：onFulfilled和onRejected，这两个参数都是可选的，但必须是函数类型，否则应该被忽略
//2.onFulfilled和onRejected的特性
//    --在'pending'状态下，这两个参数不会被执行
//    --在'fulfilled'状态下，这两个参数会接收到'value'  
//    --在'rejected'状态下，这两个参数会接收到'reason'

//手写Promise
function MyPromise(executor) {
    this.status = 'pending';
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
        setTimeout(() => {
            if (this.status === 'pending') {
                this.status = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn(this.value));
                console.log('+++++++',this.onFulfilledCallbacks.length,this.status);
            }
        })
    }
    
    const reject = (reason) => {
        setTimeout(() => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn(this.reason));
            }
        })
    }
    
    try {
        executor(resolve, reject);
    }
    catch (error) {
        reject(error);
    }

}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    console.log('---------',this.status);
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };
    
    if (this.status === 'fulfilled') {

        onFulfilled(this.value);
    }
    
    if (this.status === 'rejected') {
        onRejected(this.reason);
    }

    if (this.status === 'pending') {
        console.log('---------111',this.onFulfilledCallbacks);
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
        console.log('---------222',this.onFulfilledCallbacks);
    }
    
}


module.exports = {
    MyPromise
}


//数组中的reduce方法包含的参数有哪些？
//1.callback
//2.initialValue

let proArr = (num)=> Array(num).fill(undefined).map((item,index)=>{
                            return new Promise((resolve,reject)=>{
                                setTimeout(() => {
                                    resolve(index);
                                }, Math.random() * 1000);
                            })
})

// proArr(5).forEach((item,index)=>{
//     item.then(res=>{
//         console.log(res)
//     })
// })

//按顺序执行
// proArr(5).reduce((p1,p2)=>{
//     return p1.then(res=>{
//         ~res && console.log(res) 
//         //位运算符号有哪些？
//         //1.~ 取反  先+1，再取反
//         //2.& 按位与 都为1时为1，出现0时为0
//         //3.| 按位或 只要出现1，都是1
//         //4.^ 按位异或 相同为0，不同为1
//         //5.<< 左移 '11'向左移1位，变为'110'
//         //6.>> 右移
//         //7.>>> 无符号右移
//         return p2;
//     })
// },Promise.resolve(-1)).then(res=>{
//     console.log(res)  //打印最后一个返回值
// })

//控制并发量
const proArrPip = (proArr,length) => {
    if(length>proArr.length){
        Promise.all(proArr).then(res=>{
            console.log(res)
        })
    }else{
        let smallProArr = Array.from(proArr).splice(0,length);
        let otherProArr = Array.from(proArr).splice(length);
        if(otherProArr.length)
        Promise.all(smallProArr).then(res=>{
            console.log(res)
            proArrPip(otherProArr,length)
        })
    }
}
proArrPip(proArr(30),5)

// promise中的abort(取消/停止)
const wrap = function(promise){
    let _reject;
    const obj = Promise.race(promise,new Promise((resolve,reject)=>{
            _reject = reject;
        })
    )
    
    obj.abort = function(){
        _reject('abort')
    }
    return obj;
}



function promiseStream(prom,time){
    let oldTime = Date.now();
    return function(){
        
        BBB:for(let i=0;;i++){
            
            let newTime = Date.now();
            if(newTime-oldTime>time){
                console.log(Date.now()-oldTime)
                oldTime=newTime;
                new Promise((resolve,reject)=>{
                    resolve(prom)
                }).then(res=>{
                    console.log(res)
                })
                break BBB;
            }
        }
        
    }
}
promiseStream("1",2000)()

//什么是IIFE？
//IIFE(Immediately Invoked Function Expression)是一种立即执行的函数表达式，它的作用是创建一个独立的作用域，避免变量污染全局作用域。

//IIFE的实现方式？
//1.使用自执行函数
//2.使用闭包

//IIFE的优点？
//1.避免变量污染全局作用域
//2.创建独立的作用域，避免变量冲突

//IIFE的缺点？
//1.无法被重复调用

//IIFE的应用场景？
//1.避免变量污染全局作用域
//2.创建独立的作用域，避免变量冲突

//什么是CJS？
//CJS(CommonJS)是一种模块化规范，它定义了模块的导入和导出规则，以及模块的加载和执行机制。
// CJS具体内容
const iifeModule = (function(){
    const name = 'iifeModule';
    
    function sayHello(){
        console.log(`Hello, ${name}!`);
    }
    
    return {
        sayHello
    }
})
let count = 0;
const increase = () => count++;
module.exports= {
    count,
    increase

};
// module.exports = iifeModule;

//什么是ESM？
//ESM(ECMAScript Module)是一种模块化规范，它定义了模块的导入和导出规则，以及模块的加载和执行机制。


//什么是ADM？
//ADM(Asynchronous Module Definition)是一种模块化规范，它定义了模块的导入和导出规则，以及模块的加载和执行机制。
// ADM具体内容
define('amdModule',[
    'dependency1',
    'dependency2'
], function(require, factory) {
    'use strict';
    let count = 0;
    const increase = () => count++;
    const reset = () => count = 0;
});

require(['amdModule'], function(amdModule) {
    'use strict';
    amdModule.increase();
    console.log(amdModule.count);
})

//UMD是什么？
//UMD(Universal Module Definition)是一种模块化规范，它定义了模块的导入和导出规则，以及模块的加载和执行机制。
// UMD实现原理
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['b'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('b'));
    } else {
        // Browser globals
        root.returnExports = factory(root.b);
    }
})

let obj={
    a:1
}
function test(ob){
    ob.a=2;
    console.log(obj.a)
}
test(obj)