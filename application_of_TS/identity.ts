// 泛型

// 泛型函数
// 作用是为了是函数能被重用，入参和返回的参数由函数使用时决定。
function identity<T>(arg:T):T{
    return arg
}

// 其它方式定义
let myIdentity: <T>(arg: T) => T = identity;
let myIdentity2: {<T>(arg: T): T} = identity;

let outPut = identity<string>("myString")
outPut = identity('myString')

function fn (num: number) : number{
    return num
}

// 泛型接口

interface GenericIdentityFn {
    <T>(arg: T): T;
}
// 把泛型参数当作整个接口的一个参数
interface GenericIdentityFn2<T> {
    (arg: T): T;
}

let myIdentity3: GenericIdentityFn = identity;

// 泛型类

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

// 泛型约束 extends关键字

interface Lengthwise {
    length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
loggingIdentity({length: 10, value: 3});


// 在泛型里使用类类型
// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。比如，

function create<T>(c: {new(): T; }): T {
    return new c();
}