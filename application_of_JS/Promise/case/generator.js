//generator为ES6引入的新语法，可以当作一个Iterator来用，进行一些遍历操作，也可在内部保存状态，成为一个状态机。

const { rejects } = require("assert");

function * count() {
    yield 1
    yield 2
    yield 3
}
var c = count();
console.log(c.next()) //{value:1,done:false}
console.log(c.next()) //{value:2,done:false}
console.log(c.next()) //{value:3,done:true}
console.log(c.next()) //{value:undefined,done:true}

//由于Generator也存在Symbol.iterator接口，所以它也可以被for循环调用

function * count2(){
    yield 1
    yield 2
    return 3
}
var c2=count2();
for (i of c2) console.log(i) //1,2

function asyncFn() {
    return new Promise((resolve,rejects)=>{
        setTimeout(() => {
            resolve('---数据加载成功---')
        }, 2000);
    })
}
function * generatorFn() {
    const start = yield '开始了...'
    console.log(start)
    const data = yield asyncFn()
    console.log(data)
    const end = yield '结束了！'
    console.log(end)
}
const g=generatorFn();
let firstStep=g.next().value;
g.next(firstStep).value.then(d=>{
    let end = g.next(d).value;
    g.next(end);
});
console.log(isNaN('aa'))
console.log(Number.isNaN('aa'))
console.log(typeof NaN)
