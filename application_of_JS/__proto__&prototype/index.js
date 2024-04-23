// 1. __proto__是每个对象都有的一个属性，而prototype是函数才会有的属性。
// 2. __proto__指向的是当前对象的原型对象，而prototype指向的，是以当前函数作为构造函数构造出来的对象的原型对象。

// Array,Object,String,Nember,Date,RegEx,Function都是构造函数，有prototype，Symbol不是构造函数，也有prototype

Array.__proto__  == Function.prototype     //true

String.__proto__ == Function.prototype     //true

RegExp.__proto__== Function.prototype     //true

Date.__proto__  == Function.prototype     //true

// ƒ () { [native code] } 是什么?
// native code 的意思是它是程序自带的，是二进制编译的无法显示出来代码, native code是本地代码, 这里我们就简单的解释一下即可!


function Fn(){}
console.log(Fn.prototype)  
// {
// constructor: ƒ fn()
// arguments: null
// caller: null
// length: 0
// name: "fn"
// prototype: {constructor: ƒ}
// [[FunctionLocation]]: VM50303:1
// [[Prototype]]: ƒ ()
// }

console.log(Fn.__proto__)  // ƒ () { [native code] }

Fn.prototype={
    name:'Tom',
    age:8
}
let test = new Fn();
console.log(test.__proto__) // {name: 'Tom', age: 8}
console.log(test.prototype) // undefined

let arr = new Array();
console.log(arr.__proto__ === Array.prototype) // true