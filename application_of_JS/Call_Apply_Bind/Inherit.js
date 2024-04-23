// 继承
// 实现继承主要由两个部分
// 1.使用父类的构造函数方法和原型函数
// 2.让对象的原型指向父类

//ES5中：原型继承、构造函数继承、组合继承、组合寄生继承
//ES6中：class继承

// 原型继承
function Parent() {
    this.name = "father";
}

Parent.prototype.getName = function() {
    return this.name;
}

function Child() {}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

//隐含的问题
//1.如果有属性是引用类型，一旦某个实例修改了这个属性，其他实例的属性也会被修改
//2.创建child的时候，是不能传参数的

// 构造函数继承
function Parent(actions, name) {
    this.actions = actions;
    this.name = name;
}

function Child(id) {
    Parent.call(this, Array.prototype.slice.call(arguments, 1));
    this.id = id;
}

//隐含的问题
//1.属性或方法想被继承的话，只能在构造函数中定义
//2.如果方法在构造函数中定义了，每次都会创建一个新的方法，这样就浪费了内存

// 组合继承
function Parent(action,name) {
    this.actions = action;
    this.name = name;
}

Parent.prototype.getName = function() {
    return this.name;
}

function Child(id) {
    Parent.call(this, Array.prototype.slice.call(arguments, 1));
    this.id = id;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

// 组合寄生继承
function Parent(action,name) {
    this.actions = action;
    this.name = name;
}

Parent.prototype.getName = function() {
    return this.name;
}

function Child(id) {
    Parent.call(this, Array.prototype.slice.call(arguments, 1));
    this.id = id;
}   

// Child.prototype = Object.create(Parent.prototype);  //如果没有Object.create方法，可以使用inherit函数

Child.prototype=inherit(Parent.prototype);
Child.prototype.constructor = Child;

function inherit(parent) {
    if(parent === null) throw TypeError();
    if(Object.create){
        return Object.create(parent);
    }
    var t = typeof parent;
    if(t !== "object" && t !== "function") throw TypeError();
    function F() {}
    F.prototype = parent;
    return new F();
}

//组合寄生继承和class继承的区别
 //1.class会继承静态属性
 //2.class子类中，必须在constructor中调用super()方法，因为子类中没有自己的this对象，而是继承父类的this对象，然后对其进行加工。


 let obj1=Object({});
 let obj2=Object.create({});
 let obj3={};
 console.log(obj1,obj1.__proto__.__proto__);
 console.log(obj2.__proto__.__proto__===Object.prototype);
 console.log(obj3.__proto__===Object.prototype);

 function Clice(){
    this.test="getter"
 }

 console.log(Clice,Clice.prototype,Clice.__proto__.__proto__.__proto__)

 //函数中有prototype属性，而对象中没有？
 //1.函数是Function的实例，所以函数有__proto__属性，指向Function.prototype
 //2.函数的__proto__属性指向Function.prototype，而Function.prototype的__proto__属性指向Object.prototype
 //3.Object.prototype的__proto__属性指向null
    
 //Object.create(null)创建的对象没有原型，即没有__proto__属性
 //Object.create(Object.prototype)创建的对象有原型，即有__proto__属性


  //构造函数中的this是什么？
 //1.在构造函数中，this指向的是一个对象，这个对象是构造函数的实例

 //什么是构造函数？
 //1.构造函数是用来创建对象的函数，通过new关键字来调用
 //2.构造函数的prototype属性指向的是一个对象，这个对象是构造函数的实例

 function Food(color,kind){
    this.color=color;
    this.kind=kind;
 }

 console.log(Food.prototype.__proto__===Object.prototype);
 console.log(Food.__proto__===Function.prototype);
 Food.prototype.colorKind=function(){
     return this.color+" "+this.kind;
 }

 function Fruit(name){
    console.log("++++++++",this)   //{}
     Food.apply(this,Array.prototype.slice.call(arguments,1))
     console.log("-------",this)  //{color: 'red', kind: 'fruit'}
     this.name=name;
 }

 Fruit.prototype = Object.create(Food.prototype)
 Fruit.prototype.constructor = Fruit;

 let apple=new Fruit("apple","red","fruit");
 console.log(apple.colorKind());

