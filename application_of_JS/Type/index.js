//判断类型的方法
// 1、typeof
console.log(typeof 1);    // number
console.log(typeof true);    // boolean
console.log(typeof 'mc');    // string
console.log(typeof Symbol);    // function
console.log(typeof function(){});    // function
console.log(typeof console.log());    // undefined
console.log(typeof []);    // object
console.log(typeof {});    // object
console.log(typeof null);    // object
console.log(typeof undefined);    //  undefined

// 不能将Object、Array和Null区分。

//2、instanceof
console.log(1 instanceof Number);    // false
console.log(true instanceof Boolean);    // false
console.log('mc' instanceof String);    // false
console.log(function(){} instanceof Function);    // true
console.log([] instanceof Array);    // true
console.log({} instanceof Object);    // true

// 能够区分Array、Object和Function，适合用于判断自定义的类实例对象，不能判断Number、Boolean、String。

//自己定义方法，实现instanceof
const myIndtanceof = (left,right) => {
    if(typeof left !== 'object' || left == null) return false;
    let proto = Object.getPrototypeOf(left);
    while (true){
        if (proto === null) return false;
        if(proto === right.prototype) return true;
        proto = Object.getPrototypeOf(proto)
    }
}

//3、Object.prototype.toString.call()
var toString = Onject.prototype.toString;
console.log(toString.call(1));    // [object Number]
console.log(toString.call(true));    // [object Boolean]
console.log(toString.call('mc'));    // [object String]
console.log(toString.call([]));    // [object Array]
console.log(toString.call({}));    // [object Object]
console.log(toString.call(function(){}));    // [object Function]
console.log(toString.call(undefined));    // [object Undefined]
console.log(toString.call(null));    // [object Null]

// 此判断方法组严谨，只是写法繁琐。

