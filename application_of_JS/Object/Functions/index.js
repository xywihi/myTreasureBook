//1、 Object.create()
// Object.create()⽅法创建⼀个新对象，使⽤第⼀个参数来提供新创建对象的__proto__（以第⼀个参数作为新对象的构造函数的原型对象）；⽅法还有第⼆个可选参数，是添加到新创建对象的属性，写法如下。

const a = object.create( Person.prototype,{
age: {
value: 12,
writable: true,
configurable:true,}
})

//枚举对象属性

const obj = {
    itemA: 'itemA',
    itemB: 'itemB'
}
var newObj = Object.create(obj) 

newObj.newItemA = 'newItemA'
newObj.newItemB = 'newItemB'

//2、 Object.keys()
// 会返回一个包括所有的可枚举的自有属性的名称组成的数组

const result1 = Object.keys(newObj)
console.log(result) // ["newItemB"]

//3、 Object.values()
// 参数：obj被返回可枚举属性值的对象。
// 返回值：一个包含对象自身的所有可枚举属性值的数组。

const obj1 = { foo: 'bar', baz: 42 }
console.log(Object.values(obj1)) // ['bar', 42]
 
const obj2 = { 0: 'a', 1: 'b', 2: 'c' }
console.log(Object.values(obj2)) // ['a', 'b', 'c']

//4、 for...in...

for(i in newObj){
    console.log(i)
}

//5、 Object.assign()
// 参数：target 目标参数，sources源对象 返回值：目标对象
// Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。常用来合并对象。

Object.assign(target, ...sources)
const obj11 = { a: 1, b: 2 }
const obj22 = { b: 4, c: 5 }
const obj33 = Object.assign(obj11, obj22)
const obj44 = Object.assign({}, obj11) // 克隆了obj1对象

// 注意：
// 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。
// Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。
// assign其实是浅拷贝而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。同名属性会替换。


//6、 Object.entries(obj)
// 参数：obj可以返回其可枚举属性的键值对的对象。
// 返回值：给定对象自身可枚举属性的键值对数组。
// Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组。可使用Object.fromEntries()方法，相当于反转了Object.entries()方法返回的数据结构。接下来也会介绍Object.fromEntries()

const obj111 = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj111)); // [ ['foo', 'bar'], ['baz', 42] ]

// array like object 像数组的对象
const obj222 = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(obj222)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

// array like object with random key ordering
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
// 返回值会按照key升序排列
console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

// getFoo is property which isn't enumerable getFoo是不可枚举的属性
const myObj = Object.create({}, { getFoo: { value() { return this.foo; } } });
myObj.foo = 'bar';
console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]  // 只会返回对象可枚举属性键值对组成的数组

// non-object argument will be coerced to an object //ES2015新增 会将非对象参数强转成对象
console.log(Object.entries('foo')); // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

// iterate through key-value gracefully 优雅地遍历键值对
const obj333 = { a: 5, b: 7, c: 9 };
for (const [key, value] of Object.entries(obj333)) {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
}

// Or, using array extras 使用数组的额外功能
Object.entries(obj).forEach(([key, value]) => {
console.log(`${key} ${value}`)}); // "a 5", "b 7", "c 9"

//7、 Object.fromEntries(iterable)
// 参数：iterable类似Array、Map或者其它实现了可迭代协议的可迭代对象。
// 返回值：一个由该迭代对象条目提供对应属性的新对象。
// Object.fromEntries() 方法把键值对列表转换为一个对象。与Object.entries()相反。相当于反转了Object.entries()方法返回的数据结构。

const entries = new Map([
    ['foo', 'bar'],
    ['baz', 42]
  ]);

const obj1111 = Object.fromEntries(entries);

console.log(obj1111);
// Object { foo: "bar", baz: 42 }

// Array 转化为 Object
const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
const obj11111 = Object.fromEntries(arr)
console.log(obj11111)
// { 0: "a", 1: "b", 2: "c" }


//8、 Object.prototype.hasOwnProperty

obj.hasOwnProperty(prop)

// 参数：prop 要检测的属性的String字符串形式表示的名称，或者Symbol。
// 返回值：用来判断某个对象是否含有指定的属性的布尔值Boolean。
// hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
// 注意：只会对自身属性进行判断，继承来的一律返回false。配合for...in使用，可以避免其遍历继承来的属性。

const obj1111111 = new Object();
obj1111111.property1 = 42
Object.prototype.property2 = 111
console.log(obj1111111.hasOwnProperty('property1')) // true
console.log(obj1111111.hasOwnProperty('property2')) // false
console.log(obj1111111.hasOwnProperty('toString')) // false
console.log(obj1111111.hasOwnProperty('hasOwnProperty')) // false

//9、 Object.getOwnPropertyNames()
// Object.getOwnPropertyNames() 返回一个数组，该数组对元素是 obj自身拥有的枚举或不可枚举属性名称字符串。数组中枚举属性的顺序与通过for...in循环Object.keys迭代该对象属性时一致。数组中不可枚举属性的顺序未定义。

obj.getOwnPropertyNames(obj)

// 参数：obj一个对象，其自身的可枚举和不可枚举属性的名称被返回。
// 返回值：在给定对象上找到的自身属性对应的字符串数组。

const arr1 = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr1).sort()) // ["0", "1", "2", "length"]
 
// 类数组对象
const obj11111111 = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj11111111).sort()) // ["0", "1", "2"]
 
// 使用Array.forEach输出属性名和属性值
Object.getOwnPropertyNames(obj11111111).forEach(function(val, idx, array) {
  console.log(val + " -> " + obj11111111[val]);
})
// 0 -> a
// 1 -> b
// 2 -> c
 
// 不可枚举属性
const my_obj = Object.create({}, {
  getFoo: {
    value: function() { return this.foo; },
    enumerable: false
  }
});
my_obj.foo = 1;
 
// 不可枚举属性也会一并输出 
console.log(Object.getOwnPropertyNames(my_obj).sort())
// ["foo", "getFoo"]