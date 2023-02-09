//1. 数组转字符串
//1.1 toString() 方法
//toString() 在把数组转换成字符串时，首先要将数组的每个元素都转换为字符串。当每个元素都被转换为字符串时，才使用逗号进行分隔，以列表的形式输出这些字符串。

let arr = ['red', 'green', 'blue', 'pink'];
let str = '';
str = arr.toString();
console.log(typeof str, str);

// 1.2 toLocaleString()
// toLocalString() 方法与 toString() 方法用法基本相同，主要区别在于 toLocalString() 方法能够使用用户所在地区特定的分隔符把生成的字符串连接起来，形成一个字符串。

str = arr.toLocaleString();

//1.3 join()
//join() 方法可以把数组转换为字符串，不过它可以指定分隔符。在调用 join() 方法时，可以传递一个参数作为分隔符来连接每个元素。如果省略参数，默认使用逗号作为分隔符，这时与 toString() 方法转换操作效果相同。

str = arr.join()                  // red,green,blue,pink
str = arr.join('');               // redjoinbluepink
str = arr.join('=');             // red=join=blue=pink
console.log(typeof str, str);

//2 数组的遍历
//2.1 for
//最简单的一种循环遍历方法，也是使用频率最高的一种

let len = arr.length;
for (let i = 0; i < len; i++) {
  console.log(i,arr[i]);
}
// 0 apple
// 1 banana
// 2 orange

// 2.2 for…in…
// 这个循环用的人也很多，但是效率最低（输出的 key 是数组索引），如果遍历的是对象，输出的则是对象的属性名
for(let key in arr) {                       //key中是索引
  console.log(key,arr[key]);
}

// 0 apple
// 1 banana
// 2 orange

//2.3 for…of…（ES6）
// 虽然性能要好于 for..in...，但仍然比不上普通的 for 循环 注意：不能循环对象，因为任何数据结构只要部署 Iterator接口，就可以完成遍历操作，有些数据结构原生具备 Iterator 接口，比如Array、Map、Set、**String***等，而 Iterator **接口是部署在数据结构的Symbol.iterator属性上的，而对象Object恰恰是没有Symbol.iterato属性的，所以无法被for..of**遍历

for(let key of arr) {                         // key中是值
  console.log(key);
}

// apple
// banana
// orange

//2.4 forEach
// 除了抛出异常以外，没有办法中止或跳出 forEach() 循环。如果你需要中止或跳出循环，forEach() 方法不是应当使用的工具。返回值为undefined

arr.forEach((item,index,arr) => {
  console.log(item,index);
})

// apple 0
// banana 1
// orange 2

// item：数组中正在处理的当前元素。
// index：数组中正在处理的当前元素的索引。
// array：forEach() 方法正在操作的数组。

//不能使用return ， 不会改变原数组

//2.5 map() 函数
//map函数，遍历数组每个元素，并回调操作，需要返回值，返回值组成新的数组，原数组不变。

let array = [1, 2, 3, 4, 5];
let Array = [];
Array = array.map((item) => {
  return item *= 2
});
console.log(Array);   // [2, 4, 6, 8, 10]

// map((element, index, array) => { /* … */ })  element：元素的值  index：元素的索引  array：被遍历的数组本身
//map 不会改变原数组。返回一个新数组，每个元素都是回调函数的返回值。用map时改变原数组时需要定义一个新数组接收。

//2.6 filter() 函数
// filter() 为数组中的每个元素调用一次 callbackFn 函数，并利用所有使得 callbackFn 返回 true 或等价于 true 的值的元素创建一个新数组。callbackFn 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callbackFn 测试的元素会被跳过，不会被包含在新数组中。
//遍历数组，过滤出符合条件的元素并返回一个新数组，没有符合条件的元素则返回空数组

let numArr = [1, 2, 0, 0, 3, 4, 0, 5, 6, 0, 7, 8, 9];
let length = arr.length;
let newArray = [];
newArray = numArr.filter(item => item != 0)  // 过滤所有不为0的数字
console.log(newArray);   // [1,2,3,4,5,6,7,8,9]

//filter(function(element, index, array) { /* … */ }, thisArg)  element：元素的值  index：元素的索引  array：被遍历的数组本身
//不会改变原数组

// 2.7 some（ES6）
// 遍历数组中是否有符合条件的元素，返回值为Boolean值。这个它只要找到**一个符合条件的，就返回 true，否则返回false**
// 如果用一个空数组进行测试，在任何情况下它返回的都是false。

let arr1 = [
  { id: 001, name: 'ling', done: false },
  { id: 002, name: 'ling', done: false },
  { id: 003, name: 'ling', done: true },
];
let Array1 = arr1.some(item => item.done);

console.log(Array1);  // true

//some(function(element, index, array) { /* … */ }, thisArg) element：元素的值 index：元素的索引 array：被遍历的数组本身
//不会改变原数组

//2.8 every (ES6)
//遍历数组中是否有符合条件的元素，返回值为Boolean值。全部都符合条件，则返回**true，否则返回false**
// 若收到一个空数组，此方法在任何情况下都会返回 true。

let arr11 = [
  { id: 001, name: 'ling', done: false },
  { id: 002, name: 'ling', done: false },
  { id: 003, name: 'ling', done: true },
];
let Array11 = arr11.every(item => item.done);

console.log(Array11);  // false

//不会改变原数组

//2.9 find (ES6)
//遍历数组，返回符合条件的第一个元素，如果没有符合条件的元素则返回 undefined

let arr111 = [1, 2, 3, 4, 5]; 
let element = arr111.find(item => item == 3);
console.log(element);

//不会改变原数组

//2.10 findIndex
//findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。

arr = [1, 2, 3, 4, 5]; 
element = arr.find(item => item == 3);
console.log(element);

//不会改变原数组

//3 数组的增删改查
//3.1 增 (源码分析)
//3.1.1 从尾部增加

// arr[arr.length]

//         0  1  2  3  4  5
arr = [1, 2, 3, 4, 5];
// 如何往数组的末尾添加数据  我们可以利用数组的长度
// 因为数组的下标是从0开始的 我们获取的长度 永远都是下一个元素 
arr[arr.length] = 6;
console.log(arr);

// 3.1.2 从头部添加
//

arr = [1, 2, 3, 4, 5];
len = arr.length;
for (let i = len - 1; i >= 0; i--) {
  arr[i + 1] = arr[i];
}
arr[0] = 6;
console.log(arr);   // [6,1,2,3,4,5]

//3.1.4 push() 方法

//3.1.5 unshift() 方法

// 3.2 删
// 3.2.1 从尾部删除
// 修改数组长度从而删除尾部的元素
arr = [1,2,3,4,5];
arr.length--;
console.log(arr);

// 3.2.2 从头部删除
// 让后边的元素依次覆盖前面的元素，使元素整体前移一个长度，再length-- 即可

arr = [1,2,3,4,5];
len = arr.length;
for (let i = 0; i < len - 1; i++) {
  arr[i] = arr[i + 1];
}
arr.length--;
console.log(arr);    // [2,3,4,5]

//3.2.3 从中间删除
//修改一下 i 的起始值即可

arr = [1,2,3,4,5];
num = prompt('请输入要删除第几项');
len = arr.length;
for (let i = num; i < len - 1; i++) {
  arr[i] = arr[i + 1];
}
arr.length--;
console.log(arr);

// 3.2.4 shift() 方法
// shift() 方法从数组中删除**第一个元素**，并返回该元素的值。此方法更改数组的长度。

arr = [1, 2, 3, 4, 5];
let a = arr.shift();  //  a = 1
console.log(arr, a);  // [2,3,4,5]  1



// 3.2.5 pop() 方法
// pop() 方法从数组中删除**最后一个元素**，并返回该元素的值。此方法会更改数组的长度。

arr = [1, 2, 3, 4, 5];
a = arr.pop();    //  a = 5
console.log(arr, a);  // [1,2,3,4]  5

// 3.2.6 slice()
// slice() 方法返回一个新的数组对象，这一对象是一个由 start 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

arr = [1,2,3,4,5];
// let array = arr.slice(2,4);  // array = [3,4]
array = arr.slice(1,-1);   // array = [2,3,4]
console.log(array, arr);

//slice(start, end) start: 起始位置，如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取。数值超出原数组的索引范围，则会返回空数组。
// end： 终止位置，如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。如果 end 被省略或者大于数组长度，则会一直提取到原数组末尾。

// 3.3 改

arr = [1,2,3,4,5];
arr[5] = 6;
console.log(arr);       // [1,2,3,4,5,6]

// 3.3.1 splice() 可以增删改
// splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。此方法会改变原数组。
// 返回值：由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

// 只写一个起始值 
arr = [1,2,3,4,5];
array = arr.splice(2);
console.log(array);         // [3,4,5]

// 写两个值   
arr = [1,2,3,4,5];
array = arr.splice(2,2);
console.log(array);         // [3,4]

// 三个值
arr = [1,2,3,4,5];
array = arr.splice(2,2,6,6);
console.log(array,arr);         // [3,4]  [1,2,6,6,5]

// splice(start, deleteCount, item1, item2, itemN)
// start 指定修改的开始位置（从 0 计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位；如果负数的绝对值大于数组的长度，则表示开始位置为第 0 位。
// deleteCount 整数，表示要移除的数组元素的个数。省略或者数值大于start之后的元素的总数就会删除开始位置之后的全部元素。
// item 要添加进数组的元素，从start 位置开始。如果不指定，则 splice() 将只删除数组元素。

// 3.4 查

arr = [1,2,3,4,5];
console.log(arr[0]);    // 1

//3.4.1 indexOf()
// indexOf(searchElement, fromIndex)    searchElement  要查找的元素
// fromIndex: 开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回 -1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即 -1 表示从最后一个元素开始查找，-2 表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于 0，则整个数组都将会被查询。其默认值为 0。

arr = [1,2,3,4,5,6,1,2,5];
console.log(arr.indexOf(1));       // 0
console.log(arr.indexOf(1, 1));    // 6

//返回首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1

// 4 数组的方法
// 4.1 concat()
// concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

arr1 = [1,2,3,4,5];
let arr2 = [5,6,7,8,9];
let arr3 = arr1.concat(arr2);
console.log(arr3);                 // [1,2,3,4,5,6,7,8,9]

//合并多个数组用逗号分隔

arr1 = [1, 2, 3];
arr2 = [4, 5, 6];
arr3 = [7, 8, 9];
arr = arr1.concat(arr2, arr3);
console.log(arr);                  // [1,2,3,4,5,6,7,8,9]

// 5 数组去重
// 5.1 利用新数组来实现去重
// 5.1.1

let arr = [1,1,2,2,3,3,4,4,5,5];
array = [];
for (let i = 0; i < arr.length; i++) {
  let flag = true;
  for (let j = 0; j < array.length; j++) {
    if (arr[i] == array[j]) {
      flag = false;
      break;
    }
  }
  if (flag) {
    array[array.length] = arr[i];
  }
}
console.log(array);

// 5.1.2 indexOf

arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
array = [];
for (let i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) == -1) {
      array[array.length] = arr[i];
  }
}
console.log(array);

// 5.1.3 for in

arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
array = [];
for (let key in arr) {
if (key == arr.indexOf(arr[key])) {
  array[array.length] = arr[key];
}
}
console.log(array);

// 5.1.4 forEach

arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
array = [];
arr.forEach((item,index) => arr.indexOf(item) == index ? array[array.length] = item : '')
console.log(array);

// 5.1.5 filter

arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
array = [];
array = arr.filter((item,index) => arr.indexOf(item) == index)
console.log(array);

// 5.1.6 includes

arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
array = [];
arr.forEach((item,index) => array.includes(item) ? '' : array[array.length] = item)
console.log(array);

// 5.1.7 Set

arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
array = [...new Set(arr)];
console.log(array);

// 5.2 不使用新数组实现去重
// 5.2.1 前

arr = [1,1,2,2,3,3,4,4,5,5];
for (let i = 0; i < arr.length; i++) {
  for(let j = 0; j < i; j++) {
    if (arr[i] == arr[j]) {
      for (let z = i; z < arr.length -2; z++) {
        arr[z] = arr[z + 1];
      }
      arr.length--;
      i--;
    }
  }
}
console.log(arr);

//5.2.2 后

arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] == arr[j]) {
      for (let z = i; z < arr.length - 2; z++) {
        arr[z] = arr[z + 1];
      }
      arr.length--;
      i--;
    }
  }
}
console.log(arr);

// 5.2.3 splice

arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] == arr[j]) {
      arr.splice(i, 1);
    }
  }
}
console.log(arr);
