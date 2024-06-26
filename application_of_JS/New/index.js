//1、是什么？
//在JS中，new操作符用于创建一个给定结构函数的实例对象
function Person(name,age) {
    this.name=name;
    this.age=age;
}
Person.prototype.sayName=function(){
    console.log(this.name);
}
const person1=new Person('Tome',26);
console.log(person1)
person1.sayName();

//如果在构造函数中加上返回值，且为原始值
function Test(name) {
    this.name=name;
    return 1;
}
const t=new Test('Bob')
console.log(t)
//如果在构造函数中加上返回值，且为一个对象
function Test2(name){
    this.name=name;
    console.log(this)
    return {age:27}
}
const T=new Test2('Jack');
console.log(T) //{age:27}
console.log(T.name) //undefined,此时以返回值为准

//2、做了什么
// ·创建一个新的对象obj
// ·将对象的原型指向构造函数的prototype
// ·将构造函数的this指向新对象obj，该对象实现了这个构造函数的方法
// ·根据一些特定情况，返回对象
    // ·如果构造函数没有返回值，或者返回值是原始值，则返回创建的obj
    // ·如果构造函数返回的是一个对象，则返回该对象
    

//3、手写new操作符
function myNew(Func,...args) {
    if(typeof Func !== 'function'){
        throw new Error('myNew function must accept a function')
    }
    //1、创建一个对象
    const obj=Object.create(Func.prototype) ;
    //1、新对象原型指向构造函数原型对象
    obj.__proto__=Func.prototype;
    //3、将构造函数的this指向新对象
    let result=Func.apply(obj,args)
    //4、根据返回值判断
    return result && result instanceof Object ? result : obj
}

function PersonTest(name,age) {
    this.name=name;
    this.age=age;
}
PersonTest.prototype.sayName=function(){
    console.log(this.name);
}
let p = myNew(PersonTest,'huihui',231);
console.log(p)
p.sayName()


