//常见浅拷贝
// object.assign({},obj)
// Array.prototype.slice()
// Array.prototyp.concat()

//深拷贝
//开辟一个新的栈，两个对象的属性完全相同，但是对应两个不同的地址，修改一个对象属性，不会改变另一个对象的属性。
//常见深拷贝方法
//_.cloneDeep()
//jQuery.extend()
// JSON.stringify()

//_clone.Deep()
const _= require('lodash')
const obj1={
    a:1,
    b:{f:{g:6}},
    c:[1,2,3]
}
const obj2=_.cloneDeep(obj1);
console.log(obj1.b.f=== obj2.b.f);   //false

//jQuery.extend()
const $ = require('jquery');
const obj11 = {
    a: 1,
    b: {f:{g:1}},
    c:[1,2,3]
}
const obj22 = $.extend(true, {}, obj11);
console.log(obj11.b.f === obj22.b.f) //false

//JSON.stringify()
const obj3=JSON.parse(JSON.stringify(obj11));
//这种存在弊端，会忽略undefined、symbol和函数

//自写递归函数
function deepClone(obj,hash=new WeakMap) {
    if (obj === null) return obj; //如果是Null或者是undefined就不进行拷贝操作
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    //可能是对象或者普通的值 如果是函数的话是不需要深拷贝
    if (typeof obj !== 'object') return obj;
    //是对象的话就进行深拷贝
    if (hash.get(obj)) return hash.get(obj);
    let cloneObj = new obj.constructor();
    //找到的是所属类型原型上的constructor，二原型上的constructor指向的是当前类本身
    hash.set(obj. cloneObj);
    for (let key in obj){
        if(obj.hashOwnProperty(key)){
            //实现一个递归拷贝
            cloneObj[key]=deepClone(obj[key],hash);
            
        }
    }
    return cloneObj;
}